import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

const config = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: resolve(__dirname, "src", "database", "database.db")
    },
    pool: {
      afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb)
    },
    migrations: {
      directory: resolve(__dirname, "src", "database", "knex", "migrations")
    },
    useNullAsDefault: true
  }
};

export default config;
