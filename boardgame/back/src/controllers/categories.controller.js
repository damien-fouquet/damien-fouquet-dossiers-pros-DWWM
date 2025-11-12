
import categoriesService from '../services/categories.service.js'

async function register(c) {
  try {
    const data = c.req.valid('json')
    await categoriesService.register(data)
    
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
    const categoryId = c.req.param('categoryId')
    const data = await categoriesService.getData(categoryId)
    
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

async function deleteCategory(c) {
  try {
    const { categoryId } = c.req.valid('json')
    await categoriesService.deleteCategory(categoryId)
    
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

export { register, getData, deleteCategory }

