const pg = require('pg');

const pool = new pg.Pool({
  user: 'allen',
  host: 'localhost',
  database: 'sdc-reviews',
  password: 'allenbui',
  port: 5432,
});

// connect to db
pool.connect()
  .then(() => console.log('connected to postgreSQL!'));

// create tables if not exist
const createTable = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      product(
        id INTEGER,
        name VARCHAR(128) NOT NULL
      )`;

  pool
    .query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((e) => {
      console.log(e);
      pool.end();
    });
};

const insertRecords = (id, productName) => {
  const queryText = `INSERT INTO product VALUES (${id}, '${productName}')`;
  pool
    .query(queryText)
    .catch(e => console.log(e.stack));
};

module.exports = {
  createTable,
  insertRecords,
}