const faker = require('faker');
const db = require('./app.js');


const start = new Date().getTime();


for (let i = 0; i < 1000000; i++) {
  db.insertRecords(i, faker.lorem.words(5));
}

const end = new Date().getTime();
console.log(`[Execution Time]: ${end - start} milliseconds`);