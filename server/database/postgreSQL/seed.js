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
const startTimer = new Date().getTime();

// create data
const generateData = (numberOfDataPoints) => {
  const data = [];
  for (let i = 0; i < numberOfDataPoints; i++) {
    const idCount = Math.floor(Math.random() * 1000000);
    data.push({
      id: idCount,
      question: faker.lorem.words(5),
      answer: faker.lorem.sentence(),
      created_date: faker.date.past(2),
      username: faker.internet.userName(),
      votes: Math.floor(Math.random() * 1000),
    });
  }
  return pgp.helpers.insert(data, ['id', 'question', 'answer', 'created_date', 'username', 'votes'], 'product');
};

// load data
db.tx(async (t) => {
  for (let i = 0; i < 100; i++) {
    await t.none(generateData(100000));
    console.log(`Batch ${i + 1} of 100 Completed`);
  }
})
  .then(() =>
    console.log('[Complete]: 10,000,000 records inserted successfully'),
  )
  .catch((e) => console.log(e))
  .finally(() => {
    const endTimer = new Date().getTime();
    console.log(
      `[Execution Time]: ${Math.round((endTimer - startTimer) / 1000, 2)} seconds`,
    );
    pgp.end();
  });
