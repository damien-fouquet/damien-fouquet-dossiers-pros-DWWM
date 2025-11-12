import { Hono } from "hono";
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { register, getData, update, deleteGame } from "../controllers/games.controller.js";
const gamesRouter = new Hono()

gamesRouter.post(
  "/register", zValidator('json',
    z.object({
      name: z.string().min(2),
      editor: z.string().min(2),
      description: z.string(),
      tecnhicalSheet: z.string(),
      rulesVideoLink: z.string(),
      rulesDescription: z.string().min(2),
      quantity: z.number().positive(),
    })
  ),
  register
);

gamesRouter.get(
  "/get-data/:gameId",
  getData
);

gamesRouter.put(
  "/update", zValidator('json',
    z.object({
      // gameId: z.number().positive(),
      gameId: z.string(),
      name: z.string().min(2),
      editor: z.string().min(2),
      description: z.string(),
      tecnhicalSheet: z.string(),
      rulesVideoLink: z.string(),
      rulesDescription: z.string().min(2),
      quantity: z.number().positive(),
    })
  ),
  update
);

gamesRouter.delete(
  "/delete", zValidator('json',
    z.object({
      gameId: z.number().positive(),
    })
  ),
  deleteGame
);

export default gamesRouter;