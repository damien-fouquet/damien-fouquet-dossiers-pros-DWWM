import { Hono } from "hono";
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { register, getData, deleteCategory } from "../controllers/categories.controller.js";
const categoriesRouter = new Hono()

categoriesRouter.post(
  "/register", zValidator('json',
    z.object({
      categoryType: z.string().min(2),
    })
  ),
  register
);

categoriesRouter.get(
  "/get-data/:categoryId",
  getData
);

categoriesRouter.delete(
  "/delete", zValidator('json',
    z.object({
      categoryId: z.number().positive(),
    })
  ),
  deleteCategory
);

export default categoriesRouter;