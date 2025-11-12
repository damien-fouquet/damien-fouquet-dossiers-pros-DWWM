import { Hono } from "hono";
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { register, getData, update, deleteOpinion } from "../controllers/opinions.controller.js";
const opinionsRouter = new Hono()

opinionsRouter.post(
  "/register", zValidator('json',
    z.object({
      opinion: z.string().min(2),
      userId: z.number().positive(),
      gameId: z.number().positive(),
    })
  ),
  register
);

opinionsRouter.get(
  "/get-data/:opinionId",
  getData
);

opinionsRouter.put(
  "/update", zValidator('json',
    z.object({
      opinionId: z.number().positive(),
      opinion: z.string().min(2),
    })
  ),
  update
);

opinionsRouter.delete(
  "/delete", zValidator('json',
    z.object({
      opinionId: z.number().positive(),
    })
  ),
  deleteOpinion
);

export default opinionsRouter;