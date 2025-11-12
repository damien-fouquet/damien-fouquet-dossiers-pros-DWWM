import { sign, verify } from 'hono/jwt';
import db from '../config/database.js';
import { sendPasswordResetEmail, sendVerificationEmail } from '../utils/email.js';
import { decodeToken, generateToken } from '../utils/jwt.js';
import { comparePassword, hashPassword } from '../utils/password.js';
import env from '../config/env.js';


async function createUser(data) {
  // On insère toutes les données à partir du JSON
  const query = `
    INSERT INTO users (firstname, lastname, address, postcode, town, phone, email, password, role)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [data.firstname, data.lastname, data.address, data.postcode, data.town, data.phone, data.email, data.password, data.role];
  const result = await db.prepare(query).run(values);
  return await db.prepare('SELECT * FROM users WHERE id = ?').get(result.lastInsertRowid);
}

async function register(data) {
  // const existingUser = await findUserByEmail(data.email);

  // if (existingUser) {
  //   throw new Error("User already exists");
  // }

  const hashedPassword = await hashPassword(data.password);
  data.password = hashedPassword;
  const user = await createUser(data);

  // // Send verification email
  // sendVerificationEmail(user.email);

  return user;
}

async function getData(userId) {
  const query = `SELECT * FROM users WHERE id = ?`;
  const result = await db.prepare(query).get(userId);
  console.log(result);
  return result;
}

async function update(data) {
  const query = `
    UPDATE users 
    SET address = ?, postcode = ?, town = ?, phone = ?, email = ?, password = ?
    WHERE id = ?
  `;

  await db.prepare(query).run([data.address, data.postcode, data.town, data.phone, data.email, data.password, data.userId]);
}

async function deleteUser(userId) {
  console.log("userId:", userId)
  const query = 'UPDATE users SET active = 0 WHERE id = ?';
  const result = db.prepare(query).run(userId);
  return result.changes > 0; // returns true if a user was deleted, false if no user was found
}

async function login(email, password) {
  console.log("email : ", email)
  console.log("password : ", password)
  const user = await findUserByEmail(email);
  if (!user || !(await comparePassword(password, user.password))) {
    throw new Error("Invalid credentials");
  }
  if (!user.active) throw new Error("user-not-active");

  return user;
}

async function forgotPassword(email) {
  const user = await findUserByEmail(email);
  if (!user) {
    return true;
  }

  const resetToken = await sign(
    {
      id: user.id,
      email: user.email,
      type: "password-reset",
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    },
    env.JWT_SECRET
  );

  // Store the reset token in the database
  await updateUser(user.id, {
    reset_token: resetToken
  });

  // Send password reset email
  await sendPasswordResetEmail(user.email, resetToken);

  return true;
}

async function resetPassword(token, newPassword) {
  // Verify token
  const decoded = await verify(token, env.JWT_SECRET);
  if (!decoded) {
    throw new Error("Invalid or expired reset token");
  }

  // Find user with valid reset token
  const user = await findUserByEmail(decoded.email);
  if (!user || user.reset_token !== token) {
    throw new Error("Invalid or expired reset token");
  }

  // Hash new password
  const hashedPassword = await hashPassword(newPassword);

  // Update user password and clear reset token
  await updateUser(user.id, {
    password: hashedPassword,
    reset_token: null
  });

  return true;
}

async function verifyEmail(token) {
  try {
    const decodedToken = await decodeToken(token);
    console.log("decodedToken:", decodedToken);
    if (decodedToken == null) throw new Error("token couldn't be decoded");

    const user = await findUserByEmail(decodedToken.email);
    if (!user) throw new Error("User not found");

    const updatedUser = await updateUser(user.id, { verified: 1 });
    console.log("updatedUser:", updatedUser);
    return true;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function sendEmailVerification(email) {
  const existingUser = await findUserByEmail(email);

  if (!existingUser) {
    throw new Error("User does not exist");
  }

  await sendVerificationEmail(email);
}

async function findUserByEmail(email) {
  const query = 'SELECT * FROM users WHERE email = ?';
  const result = await db.prepare(query).get(email);
  return result;
}


export default {
  createUser,
  register,
  getData,
  update,
  deleteUser,
  login,
  forgotPassword,
  resetPassword,
  verifyEmail,
  sendEmailVerification,
  findUserByEmail
};
