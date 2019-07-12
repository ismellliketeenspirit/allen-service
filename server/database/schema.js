const mongoose = require("mongoose");

// working with env variables
require('dotenv').config()

// mongoose.connect(process.env.MONGOURI, {
//   useNewUrlParser: true
// });


mongoose.connect('mongodb://localhost:27017/QuestionAndAnswers'
  , {
  useNewUrlParser: true
});

const Schema = mongoose.Schema;

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log("connected to mongoDB"));

const questionNAnswersSchema = mongoose.Schema({
  product: Number,
  questions: [
    {
      question_id: Number,
      question: String,
      answers: [
        {
          user: String,
          answer: String,
          createdAt: Date
        }
      ],
      votes: Number
    }
  ]
});

// to use schema, it must be converted to a Model
const questions = mongoose.model("questions", questionNAnswersSchema);

const getProductQuestions = (id, callback) => {

  questions.find({ product: id }).exec((err, data) => {
    if (err) {
      callback(err);
    }
    // console.log(data[0]);
    data[0].questions.sort((a, b) => {
      return b.votes - a.votes;
    });
    callback(data[0]);
  });
};

const updateQuestionVote = (question_Id, body, callback) => {
  const _id = body.product;
  const vote = body.vote;
  // find productID
  questions.findById(_id, (err, doc) => {
    // iterate through the questions and find question_id
    if (err) {
      callback(err);
    }
    doc.questions.forEach(question => {
      if (question.question_id === Number(question_Id)) {
        question.votes = question.votes + Number(vote);
        // callback(question);
        doc.save();
        callback(question);
      }
    });
  });
};

module.exports = {
  db,
  questions,
  getProductQuestions,
  updateQuestionVote
};
