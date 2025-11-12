import { Hono } from "hono";
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { register, getData, deleteGameCategory } from "../controllers/game.category.controller.js";
const gameCategoryRouter = new Hono()

gameCategoryRouter.post(
  "/register", zValidator('json',
    z.object({
      restaurantId: z.number().positive(),
      categoryId: z.number().positive(),
    })
  ),
  register
);

gameCategoryRouter.get(
  "/get-data/:associationId",
  getData
);

gameCategoryRouter.delete(
  "/delete", zValidator('json',
    z.object({
      restaurantId: z.number().positive(),
      categoryId: z.number().positive(),
    })
  ),
  deleteGameCategory
);

export default gameCategoryRouter;