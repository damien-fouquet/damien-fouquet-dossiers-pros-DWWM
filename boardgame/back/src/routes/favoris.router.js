import { Hono } from "hono";
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { register, getData, deleteFavori } from "../controllers/favoris.controller.js";
const favorisRouter = new Hono()

favorisRouter.post(
  "/register", zValidator('json',
    z.object({
      userId: z.number().positive(),
      gameId: z.number().positive(),
    })
  ),
  register
);

favorisRouter.get(
  "/get-data/:userId",
  getData
);

favorisRouter.delete(
  "/delete", zValidator('json',
    z.object({
      userId: z.number().positive(),
      gameId: z.number().positive(),
    })
  ),
  deleteFavori
);

export default favorisRouter;