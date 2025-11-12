import db from '../config/database.js';


async function createCategory(data) {
  const query = `
    INSERT INTO categories (category)
    VALUES (?)
  `;
  const values = [data.category];
  const result = await db.prepare(query).run(values);
  return await db.prepare('SELECT * FROM categories WHERE id = ?').get(result.lastInsertRowid);
}

async function register(data) {
  const existingCategory = await findCategory(data.category);

  if (existingCategory) {
    throw new Error("Category already exists");
  }

  const category = await createCategory(data);

  return category;
}

async function getData(categoryId) {
  const query = `SELECT * FROM categories WHERE id = ?`;
  const result = await db.prepare(query).get(categoryId);
  console.log(result.category);
  return result;
}

async function deleteCategory(categoryId) {
  // console.log("categoryId:", categoryId)
  const query = 'DELETE FROM categories WHERE id = ?';
  const result = db.prepare(query).run(categoryId);
  return result.changes > 0; // returns true if a user was deleted, false if no user was found
}

async function findCategory(category) {
  const query = 'SELECT * FROM categories WHERE category = ?';
  const result = await db.prepare(query).get(category);
  return result;
}


export default {
  createCategory,
  register,
  getData,
  deleteCategory,
  findCategory
};
