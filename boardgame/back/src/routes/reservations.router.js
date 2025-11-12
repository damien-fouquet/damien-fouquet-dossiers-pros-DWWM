import { Hono } from "hono";
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { register, getData, update, validate, refuse, deliver, deleteReservation } from "../controllers/reservations.controller.js";
const reservationsRouter = new Hono()

reservationsRouter.post(
  "/register", zValidator('json',
    z.object({
      quantity: z.number().positive(),
      status: z.enum(["en cours", "en livraison", "livré", "annulé"]),
      // status: z.string(),
      reservationDate: z.string().time(),
      deliveryDate: z.string().time(),
      userId: z.number().positive(),
      gameId: z.number().positive(),
    })
  ),
  register
);

reservationsRouter.get(
  "/get-data/:reservationId",
  getData
);

reservationsRouter.put(
  "/update", zValidator('json',
    z.object({
      reservationId: z.number().positive(),
      quantity: z.number().positive(),
      status: z.enum(["en attente", "en livraison", "livré", "annulé"]),
      // status: z.string(),
      reservationDate: z.string().time(),
      deliveryDate: z.string().time(),
      userId: z.number().positive(),
      gameId: z.number().positive(),
    })
  ),
  update
);

reservationsRouter.put(
  "/validate", zValidator('json',
    z.object({
      reservationId: z.number().positive(),
    })
  ),
  validate
);

reservationsRouter.put(
  "/refuse", zValidator('json',
    z.object({
      reservationId: z.number().positive(),
    })
  ),
  refuse
);

reservationsRouter.put(
  "/deliver", zValidator('json',
    z.object({
      reservationId: z.number().positive(),
    })
  ),
  deliver
);

reservationsRouter.delete(
  "/delete", zValidator('json',
    z.object({
      reservationId: z.number().positive(),
    })
  ),
  deleteReservation
);

export default reservationsRouter;