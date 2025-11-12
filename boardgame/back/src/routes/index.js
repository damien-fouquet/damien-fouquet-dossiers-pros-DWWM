import { Hono } from 'hono'
import { bearerAuth } from 'hono/bearer-auth'
import { verify } from 'hono/jwt'
import { authGuard } from '../middlewares/authguard.js'
import authRouter from './auth.router.js'
import opinionsRouter from './opinions.router.js'
import gameCategoryRouter from './game.category.router.js'
import favorisRouter from './favoris.router.js'
import categoriesRouter from './categories.router.js'
import gamesRouter from './games.router.js'
import reservationsRouter from './reservations.router.js'
import usersRouter from './users.router.js'
import authService from '../services/auth.service.js'
import env from '../config/env.js'
const app = new Hono()


app.get('/', (c) => c.text('Hello from Hono!'))
app.route('/api/auth', authRouter)
app.route('/api/opinions', opinionsRouter)
app.route('/api/game_category', gameCategoryRouter)
app.route('/api/favoris', favorisRouter)
app.route('/api/categories', categoriesRouter)
app.route('/api/games', gamesRouter)
app.route('/api/reservations', reservationsRouter)
app.route('/api/users', usersRouter)
app.get(
  '/authenticated',
  authGuard(),
  (c) => {
    const user = c.get('user')
    return c.text('Authenticated route, hi ' + user.email)
  }
)
export default app