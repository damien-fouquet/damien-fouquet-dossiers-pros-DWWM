import db from '../config/database.js';


async function createReservation(data) {
  const query = `
    INSERT INTO reservations (quantity, status, reservation_date, delivery_date, user_id, game_id)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const values = [parseInt(data.quantity), "en attente", data.reservationDate, data.deliveryDate, data.userId, data.gameId];
  const result = await db.prepare(query).run(values);
  return await db.prepare('SELECT * FROM reservations WHERE id = ?').get(result.lastInsertRowid);
}

async function register(data) {
  const reservation = await createReservation(data);

  return reservation;
}

async function getData(reservationId) {
  const query = `SELECT * FROM reservations WHERE id = ?`;
  const result = await db.prepare(query).get(reservationId);
  console.log(result);
  return result;
}

async function update(data) {
  const query = `
    UPDATE reservations 
    SET delivery_date = ?
    WHERE id = ?
  `;

  await db.prepare(query).run([data.deliveryDate, data.reservationId]);
}

async function validate(reservationId) {
  const query = `
    UPDATE reservations 
    SET status = ?
    WHERE id = ?
  `;

  await db.prepare(query).run(["En livraison", reservationId]);
}

async function refuse(reservationId) {
  const query = `
    UPDATE reservations 
    SET status = ?
    WHERE id = ?
  `;

  await db.prepare(query).run(["annulé", reservationId]);
}

async function deliver(reservationId) {
  const query = `
    UPDATE reservations 
    SET status = ?
    WHERE id = ?
  `;

  await db.prepare(query).run(["livré", reservationId]);
}

async function deleteReservation(reservationId) {
  // console.log("reservationId:", reservationId)
  const query = 'DELETE FROM reservations WHERE id = ?';
  const result = db.prepare(query).run(reservationId);
  return result.changes > 0; // returns true if a reservation was deleted, false if no reservation was found
}


export default {
  createReservation,
  register,
  getData,
  update,
  validate,
  refuse,
  deliver,
  deleteReservation
};
