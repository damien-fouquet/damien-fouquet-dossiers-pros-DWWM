import gamesService from '../services/games.service.js'

async function register(c) {
  try {
    const data = c.req.valid('json')
    const gameId = await gamesService.register(data)
    
    return c.json({
      message: 'Registration successful. Please check your email for verification.',
      gameId
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
    const data = await gamesService.getData(gameId)
    
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
    await gamesService.update(data)
    
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

async function deleteGame(c) {
  try {
    const { gameId } = c.req.valid('json')
    await gamesService.deleteGame(gameId)
    
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

export { register, getData, update, deleteGame }

