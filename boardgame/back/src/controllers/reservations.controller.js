
import reservationsService from '../services/reservations.service.js'

async function register(c) {
  try {
    const data = c.req.valid('json')
    await reservationsService.register(data)
    
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
    const reservationId = c.req.param('reservationId')
    const data = await reservationsService.getData(reservationId)
    
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
    await reservationsService.update(data)
    
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

async function validate(c) {
  try {
    const { reservationId } = c.req.valid('json')
    await reservationsService.validate(reservationId)
    
    return c.json({
      message: 'Validate successful.'
    }, 201)
  } catch (error) {
    console.error(error)
    
    return c.json({
      error: 'Validate failed'
    }, 400)
  }
}

async function refuse(c) {
  try {
    const { reservationId } = c.req.valid('json')
    await reservationsService.refuse(reservationId)
    
    return c.json({
      message: 'Refuse successful.'
    }, 201)
  } catch (error) {
    console.error(error)
    
    return c.json({
      error: 'Refuse failed'
    }, 400)
  }
}

async function deliver(c) {
  try {
    const { reservationId } = c.req.valid('json')
    await reservationsService.deliver(reservationId)
    
    return c.json({
      message: 'Deliver successful.'
    }, 201)
  } catch (error) {
    console.error(error)
    
    return c.json({
      error: 'Deliver failed'
    }, 400)
  }
}

async function deleteReservation(c) {
  try {
    const { reservationId } = c.req.valid('json')
    await reservationsService.deleteReservation(reservationId)
    
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

export { register, getData, update, validate, refuse, deliver, deleteReservation }

