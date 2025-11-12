import db from '../config/database.js';


async function createGame(data) {
  const query = `
    INSERT INTO games (name, editor, description, technical_sheet, rules_video_link, rules_description)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const values = [data.name, data.editor, data.description, data.technical_sheet, data.rules_video_link, data.rules_description];
  const result = await db.prepare(query).run(values);
  return await result.lastInsertRowid;
}

async function register(data) {
  const gameId = await createGame(data);

  return gameId;
}

async function getData(gameId) {
  const query = `SELECT * FROM games WHERE id = ?`;
  const result = await db.prepare(query).get(gameId);
  console.log(result);
  return result;
}

async function update(data) {
  const query = `
    UPDATE games 
    SET name = ?, editor = ?, description = ?, technical_sheet = ?, rules_video_link = ?, rules_description = ?
    WHERE id = ?
  `;

  await db.prepare(query).run([data.name, data.editor, data.description, data.technical_sheet, data.rules_video_link, data.rules_description, parseInt(data.gameId)]);
}

async function deleteGame(gameId) {
  // console.log("gameId:", gameId)
  const query = 'DELETE FROM games WHERE id = ?';
  const result = db.prepare(query).run(gameId);
  return result.changes > 0; // returns true if a game was deleted, false if no game was found
}

async function updateGame(gameId, data) {
  const setClauses = [];
  const values = [];

  Object.entries(data).forEach(([key, value]) => {
    setClauses.push(`${key} = ?`);
    values.push(value);
  });
  values.push(gameId);

  const query = `
    UPDATE games 
    SET ${setClauses.join(', ')}
    WHERE id = ?
  `;

  await db.prepare(query).run(values);
  return await db.prepare('SELECT * FROM games WHERE id = ?').get(gameId);
}

export default {
  createGame,
  register,
  getData,
  update,
  deleteGame,
  updateGame
};
