const fs = require('fs');
const faker = require('faker');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: 'testTwo.csv',
  header: [
    { id: 'id' },
    { id: 'name' },
  ]
});

// console.log(faker.random.uuid());

function generateData(numberOfRecords) {
  const data = [];
  for (let i = 0; i < numberOfRecords; i++) {
    data.push({
      id: faker.random.uuid(),
      name: faker.lorem.words(3),
    })
  }
  return data;
}

csvWriter
  .writeRecords(generateData(5))
  .then(() => console.log('csv file written successfully'));
