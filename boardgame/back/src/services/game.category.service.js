import db from '../config/database.js';


async function createGameCategory(data) {
  const query = `
    INSERT INTO game_category (category_id, game_id)
    VALUES (?, ?)
  `;
  const values = [data.categoryId, data.gameId];
  const result = await db.prepare(query).run(values);
  return await db.prepare('SELECT * FROM game_category WHERE id = ?').get(result.lastInsertRowid);
}

async function findGameCategory(categoryId, gameId) {
  const query = 'SELECT * FROM game_category WHERE category_id = ? AND game_id = ?';
  const result = await db.prepare(query).get([categoryId, gameId]);
  // console.log(result);
  return result;
}

async function register(data) {
  const existingGameCategory = await findGameCategory(data.categoryId, data.gameId);

  if (existingGameCategory) {
    const GameCategory = await deleteGameCategory(data.categoryId, data.gameId);
    return GameCategory;
  } else {
    const GameCategory = await createGameCategory(data);
    return GameCategory;
  }
}

async function getData(gameId) {
  const query = `SELECT category_id FROM game_category WHERE game_id = ?`;
  const result = await db.prepare(query).all(gameId);
  console.log(result);
  return result;
}

async function deleteGameCategory(gameId, categoryId) {
  // console.log("categoryId:", categoryId)
  const query = 'DELETE FROM game_category WHERE category_id = ? AND game_id = ?';
  const result = db.prepare(query).run([categoryId, gameId]);
  return result.changes > 0; // returns true if a GameCategory was deleted, false if no GameCategory was found
}

async function deleteGame(gameId) {
  // console.log("gameId:", gameId)
  const query = 'DELETE FROM game_category WHERE game_id = ?';
  const result = db.prepare(query).run([gameId]);
  return result.changes > 0; // returns true if a Game was deleted, false if no Game was found
}


export default {
  createGameCategory,
  findGameCategory,
  register,
  getData,
  deleteGameCategory,
  deleteGame
};
