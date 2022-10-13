import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {

  development: {
    client: 'mysql',
    connection: {
      database: 'monita',
      user: 'monita',
      password: 'monita'
    },
    migrations: {
      directory: __dirname + '/database/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: __dirname + '/database/seeds'
    },
    useNullAsDefault: true,
  },

  production: {
    client: 'mysql',
    connection: {
      database: 'monita',
      user: 'monita',
      password: 'monita'
    },
    migrations: {
      directory: __dirname + '/database/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: __dirname + '/database/seeds'
    },
    useNullAsDefault: true,
  }

};
