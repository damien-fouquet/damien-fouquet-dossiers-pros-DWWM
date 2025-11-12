import Database from 'libsql';

const db = new Database('mydb.db');

// import { createClient } from '@libsql/client';
// import dotenv from 'dotenv';

// dotenv.config();

// const db = createClient({
//     url: process.env.DATABASE_URL,
//     authToken: process.env.DATABASE_AUTH_TOKEN,
// });

// async function testConnection() {
//     try {
//         await db.execute('SELECT 1');
//         console.log('✅ Connexion à la base de données réussie');
//     } catch (error) {
//         console.error('❌ Erreur de connexion à la base de données:', error);
//     }
// }

// testConnection();

// Création des tables

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    address TEXT NOT NULL,
    postcode TEXT NOT NULL,
    town TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS games (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    editor TEXT NOT NULL,
    description TEXT,
    technical_sheet TEXT,
    rules_video_link TEXT,
    rules_description TEXT NOT NULL
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category TEXT NOT NULL
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS favorites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    game_id INTEGER NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(game_id) REFERENCES games(id)
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS opinions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    opinion TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    game_id INTEGER NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(game_id) REFERENCES games(id)
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS reservations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    quantity INTEGER NOT NULL,
    status INTEGER NOT NULL,
    reservation_date REAL NOT NULL,
    delivery_date REAL NOT NULL
    user_id INTEGER NOT NULL,
    game_id INTEGER NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(game_id) REFERENCES games(id)
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS game_category (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    game_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    FOREIGN KEY(game_id) REFERENCES games(id),
    FOREIGN KEY(category_id) REFERENCES categories(id)
  );
`);

// db.exec(`
//   CREATE TABLE IF NOT EXISTS images (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     organism_id INTEGER NOT NULL,
//     image TEXT NOT NULL,
//     FOREIGN KEY(organism_id) REFERENCES organisms(id)
//   );
// `);

export default db;