const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const app = express();
const db = require('../server/database/postgreSQL/schema.js');
const cors = require('cors');

const PORT = process.env.PORT || 3000;

// USE middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());
// SERVER static files
app.use(express.static(path.join(__dirname + '/../client/dist')));

//allows to serve react files whenever the url Route is changed in the client side.
app.use(
  '/products/:id',
  express.static(path.join(__dirname + '/../client/dist')),
);

// CREATE
// app.post('/products/questions', (req, res) => {
//   db.createProduct();
//   res.send(data);
// });

// READ
app.get('/questions/product/:productId', (req, res) => {

  db.getProductQuestions(req.params.productId, (data) => {
    res.send(data);
  });
});

// UPDATE
// app.put('/ask/vote/question/:question_id', (req, res) => {
//   const question_Id = req.params.question_id;
//   db.updateQuestionVote(question_Id, req.body, (data) => {
//     res.send(data);
//   });
// });

// DELETE
// app.delete('/products/questions/:productId', (req, res) => {
//   db.deleteProduct(req.params.productId);
//   res.send(`record number ${req.params.productId} deleted`);
// });

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
