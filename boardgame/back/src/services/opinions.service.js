import db from '../config/database.js';


async function createOpinion(data) {
  const query = `
    INSERT INTO opinions (opinion, user_id, game_id)
    VALUES (?, ?, ?)
  `;
  const values = [data.opinion, data.userId, data.gameId];
  const result = await db.prepare(query).run(values);
  return await db.prepare('SELECT * FROM opinions WHERE id = ?').get(result.lastInsertRowid);
}

async function getData(opinionId) {
  const query = `SELECT * FROM opinions WHERE id = ?`;
  const result = await db.prepare(query).get(opinionId);
  console.log(result);
  return result;
}

async function findOpinionByGame(gameId) {
  const query = 'SELECT * FROM opinions WHERE game_id = ?';
  const result = await db.prepare(query).get(gameId);
  return result;
}

async function update(data) {
  const query = `
    UPDATE opinions 
    SET opinion = ?
    WHERE id = ?
  `;

  await db.prepare(query).run([data.opinion, data.opinionId]);
}

async function deleteOpinion(opinionId) {
  // console.log("opinionId:", opinionId)
  const query = 'DELETE FROM opinions WHERE id = ?';
  const result = db.prepare(query).run(opinionId);
  return result.changes > 0; // returns true if an opinion was deleted, false if no opinion was found
}


export default {
  createOpinion,
  getData,
  findOpinionByGame,
  update,
  deleteOpinion
};
