const cassandra = require('cassandra-driver');
const faker = require('faker');
const login = new cassandra.auth.PlainTextAuthProvider(
  'cassandra',
  'cassandra',
);
const client = new cassandra.Client({
  contactPoints: ['127.0.0.1'],
  authProvider: login,
  keyspace: 'sdc',
  localDataCenter: 'datacenter1',
});

// const generateData = (numberOfDataPoints) => {
//   const data = [];
//   for (let i = 0; i < numberOfDataPoints; i++) {
//     idCount++;
//     data.push({ id: idCount, name: faker.lorem.sentence() });
//   }
//   return pgp.helpers.insert(data, ['id', 'name'], 'product');
// };

client
  .execute(query)
  .then((data) => {
    console.log(data.rows);
  })
  .then(() => {
    client.shutdown();
  });
