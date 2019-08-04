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
        id INTEGER NOT NULL,
        question VARCHAR(512) NOT NULL,
        answer VARCHAR(512) NOT NULL,
        created_date DATE NOT NULL,
        username VARCHAR(32) NOT NULL,
        votes INTEGER DEFAULT 0
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