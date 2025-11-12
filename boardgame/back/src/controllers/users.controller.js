
import usersService from '../services/users.service.js'

async function register(c) {
  try {
    const data = c.req.valid('json')
    await usersService.register(data)
    
    return c.json({
      message: 'Registration successful. Please check your email for verification.'
    }, 201)
  } catch (error) {
    console.error(error)

    return c.json({
      error: 'Registration failed'
    }, 400)
  }
}

async function getData(c) {
  try {
    const userId = c.req.param('userId')
    const data = await usersService.getData(userId)

    return c.json({
      message: 'Data recovered',
      data
    }, 201)
  } catch (error) {
    console.error(error)

    return c.json({
      error: 'Recovered failed'
    }, 400)
  }
}

async function update(c) {
  try {
    const data = c.req.valid('json')
    await usersService.update(data)

    return c.json({
      message: 'Update successful.'
    }, 201)
  } catch (error) {
    console.error(error)

    return c.json({
      error: 'Update failed'
    }, 400)
  }
}

async function deleteUser(c) {
  try {
    const { userId } = c.req.valid('json')
    await usersService.deleteUser(userId)

    return c.json({
      message: 'Delete successful.'
    }, 201)
  } catch (error) {
    console.error(error)

    return c.json({
      error: 'Delete failed'
    }, 400)
  }
}

async function login(c) {
  try {
    console.log("test")
    const { email, password } = c.req.valid('json')
    const token = await usersService.login(email, password)

    return c.json({
      message: 'Login successful',
      token
    })
  } catch (error) {
    console.log("error:", error.message)

    return c.json({
      error: error.message }, 401)
  }
}


async function forgotPassword(c) {
  try {
    const { email } = c.req.valid('json')
    await usersService.forgotPassword(email)

    return c.json({
      message: 'Password reset instructions sent to your email'
    })
  } catch (error) {
    console.error(error)

    return c.json({
      error: 'Password reset request failed'
    }, 400)
  }
}

async function resetPassword(c) {
  try {
    const { token, password } = c.req.valid('json')
    await usersService.resetPassword(token, password)

    return c.json({
      message: 'Password successfully reset'
    })
  } catch (error) {
    console.error("error:", error)

    return c.json({
      error: 'Password reset failed'
    }, 400)
  }
}

async function verifyUserEmail(c) {

  try {
    const token = c.req.param('token')
    console.log("token:", token)
    await usersService.verifyEmail(token)

    return c.json({
      message: 'Email verified successfully'
    })
  } catch (error) {
    console.log("error:", error)

    return c.json({
      error: 'Email verification failed'
    }, 400)
  }
}

async function sendVerification(c) {
  try {
    const { email } = c.req.valid('json')
    await usersService.sendEmailVerification(email)

    return c.json({
      message: 'Veification Email Sent'
    })
  } catch (error) {
    console.error(error)

    return c.json({
      error: 'Verification email couldnt be sent'
    }, 400)
  }
}


export { register, getData, update, deleteUser, login, forgotPassword, resetPassword, verifyUserEmail, sendVerification }
