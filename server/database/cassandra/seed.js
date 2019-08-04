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
const query = 'SELECT * FROM sdc.product';

client
  .execute(query)
  .then((data) => {
    console.log(data.rows);
  })
  .then(() => {
    client.shutdown();
  });
