import db from '../config/database.js';


async function createFavori(data) {
  const query = `
    INSERT INTO favoris (user_id, game_id)
    VALUES (?, ?)
  `;
  const values = [data.userId, data.gameId];
  const result = await db.prepare(query).run(values);
  return await db.prepare('SELECT * FROM favoris WHERE id = ?').get(result.lastInsertRowid);
}

async function findFavori(userId, gameId) {
  const query = 'SELECT * FROM favoris WHERE user_id = ? AND game_id = ?';
  const result = await db.prepare(query).get([userId, gameId]);
  console.log(result);
  return result;
}

async function register(data) {
  const existingFavori = await findFavori(data.userId, data.gameId);

  if (existingFavori) {
    const favori = await deleteFavori(data.userId, data.gameId);
    return favori;
  } else {
    const favori = await createFavori(data);
    return favori;
  }
}

async function getData(userId) {
  const query = `SELECT game_id FROM favoris WHERE user_id = ?`;
  const result = await db.prepare(query).all(userId);
  console.log(result);
  return result;
}

async function deleteFavori(userId, gameId) {
  // console.log("userId:", userId)
  const query = 'DELETE FROM favoris WHERE user_id = ? AND game_id = ?';
  const result = db.prepare(query).run([userId, gameId]);
  return result.changes > 0; // returns true if a favori was deleted, false if no favori was found
}


export default {
  createFavori,
  findFavori,
  register,
  getData,
  deleteFavori
};
