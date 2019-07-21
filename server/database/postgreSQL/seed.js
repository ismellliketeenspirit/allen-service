// const db = require('./app.js');

const faker = require('faker');
const pgp = require('pg-promise')();
const connection = {
  user: 'allen',
  host: 'localhost',
  database: 'sdc-reviews',
  password: 'allenbui',
  port: 5432,
};
const db = pgp(connection);
const start = new Date().getTime();

// create data
const generateData = (numberOfDataPoints) => {
  const data = [];
  for (let i = 0; i < numberOfDataPoints; i++) {
    data.push({ id: i, name: faker.lorem.sentence() });
  }
  return pgp.helpers.insert(data, ['id', 'name'], 'product');
};

// load data
db.tx(async (t) => {
  for (let i = 0; i < 1000; i++) {
    await t.none(generateData(10000));
    console.log(`Batch ${i + 1} of 1000 Completed`);
  }
})
  .then(() =>
    console.log('[Complete]: 10,000,000 records inserted successfully'),
  )
  .catch((e) => console.log(e))
  .finally(() => {
    const end = new Date().getTime();
    console.log(
      `[Execution Time]: ${Math.round((end - start) / 1000, 2)} seconds`,
    );
    pgp.end();
  });
