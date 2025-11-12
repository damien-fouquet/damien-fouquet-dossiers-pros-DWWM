import { Hono } from "hono";
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { register, getData, update, deleteUser, login, forgotPassword, resetPassword, verifyUserEmail, sendVerification } from "../controllers/users.controller.js";
const usersRouter = new Hono()

usersRouter.post(
  "/register", zValidator('json',
    z.object({
      firstname: z.string().min(2),
      lastname: z.string().min(2),
      address: z.string().min(2),
      postcode: z.string().length(5),
      town: z.string().min(2),
      phone: z.string().length(10),
      email: z.string().email("Invalid email"),
      password: z.string().min(8),
      role: z.enum(["admin", "editeur", "client"]),
    })
  ),
  register
);

usersRouter.get(
  "/get-data/:userId",
  getData
);

usersRouter.put(
  "/update", zValidator('json',
    z.object({
      userId: z.number().positive(),
      address: z.string().min(2),
      postcode: z.string().length(5),
      town: z.string().min(2),
      phone: z.string().length(10),
      email: z.string().email("Invalid email"),
      password: z.string().min(8),
    })
  ),
  update
);

usersRouter.delete(
  "/delete", zValidator('json',
    z.object({
      userId: z.number().positive(),
    })
  ),
  deleteUser
);

usersRouter.post(
  "/login",
  zValidator('json',
    z.object({
      email: z.string().email("Invalid email"),
      password: z.string().min(8),
    })
  ),
  login
);

usersRouter.post(
  "/forgot-password",
  zValidator('json',
    z.object({
      email: z.string().email("Invalid email"),
    })
  ),
  forgotPassword
);

usersRouter.post(
  "/reset-password",
  zValidator('json',
    z.object({
      token: z.string(),
      password: z.string().min(8),
    })
  ),
  resetPassword
);

usersRouter.get(
  "/verify/:token",
  verifyUserEmail
);

usersRouter.post(
  "/send-verification",
  zValidator('json',
    z.object({
      email: z.string().email("Invalid email"),
    })
  ),
  sendVerification
);


export default usersRouter;