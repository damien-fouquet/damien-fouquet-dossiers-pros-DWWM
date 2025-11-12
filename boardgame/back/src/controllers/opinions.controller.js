
import opinionsService from '../services/opinions.service.js'

async function register(c) {
  try {
    const data = c.req.valid('json')
    await opinionsService.register(data)
    
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
    const data = await opinionsService.getData(userId)
    
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
    await opinionsService.update(data)

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

async function deleteOpinion(c) {
  try {
    const { userId, gameId } = c.req.valid('json')
    await opinionsService.deleteOpinion(userId, gameId)
    
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

export { register, getData, update, deleteOpinion }

