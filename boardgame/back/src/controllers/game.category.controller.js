import gameCategoryService from '../services/game.category.service.js'

async function register(c) {
  try {
    const data = c.req.valid('json')
    await gameCategoryService.register(data)
    
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
    const gameId = c.req.param('gameId')
    const data = await gameCategoryService.getData(gameId)
    
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

async function deleteGameCategory(c) {
  try {
    const { gameId, categoryId } = c.req.valid('json')
    await gameCategoryService.deleteGameCategory(gameId, categoryId)
    
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

export { register, getData, deleteGameCategory }
