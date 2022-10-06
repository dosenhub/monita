import knex from 'knex';
import knexfile from '../knexfile.js';

const myKnex = knex(knexfile.development);

export default myKnex;