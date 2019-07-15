# Product Questions and Answers

> This service will provide questions and answers when a product is selected. Questions can be ranked.

## Related Projects

  - https://github.com/the-purple-team/bruce-service
  - https://github.com/the-purple-team/maddie-front-end-capstone
  - https://github.com/the-purple-team/bradyService

<!-- ## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development) -->




## GET all questions per product
### endpoint
```sh
/products/:productId
```

### Successful API response containing :productId data:
```sh
{
  "product": 1,
  "questions": [
    {
      "question_id": 1,
      "question": "Nulla suscipit ligula in lacus. Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla?",
      "answers": [
        { "user": "Ermanno", "answer": "Integer ac leo. Pellentesque ultrices mattis odio.", "createdAt": "2018-12-08 00:23:14" },
        { "user": "Izabel", "answer": "In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.", "createdAt": "2019-02-22 13:30:05" }, { "user": "Etti", "answer": "Aenean auctor gravida sem.", "createdAt": "2018-08-05 17:23:39" },
        { "user": "Jessee", "answer": "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa.", "createdAt": "2018-08-24 20:30:21" }],
      "votes": 0
    }
  ]
}
```

## POST vote on a question (add or subtract)
  ### endpoint:
```sh
/ask/vote/question/:question_id
```
 ### Successful API response contains the question object that was voted on:
```sh
{
    "answers": [
        {
            "_id": "5cef652a3d45e906f96a6736",
            "user": "Lenard",
            "answer": "Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros.",
            "createdAt": "2018-07-20T22:52:42.000Z"
        },
        {
            "_id": "5cef652a3d45e906f96a6735",
            "user": "Rowe",
            "answer": "Aenean fermentum. Donec ut mauris eget massa tempor convallis.",
            "createdAt": "2018-08-27T19:32:17.000Z"
        }
    ],
    "_id": "5cef652a3d45e906f96a6734",
    "question_id": 1,
    "question": "Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci?",
    "votes": 0
}
```

## Requirements

- Node >=6.13.0
- Mongo

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
```
### Seeding Database
```sh
npm run seedfeed
```

### Run server
```sh
npm run start-dev
```
Using npm run start-dev requires that you have nodemon installed. You may install nodemon globaly by using
```sh
npm install -g nodemon
```

Nodemon can also be installed locally as a dev dependency:
```sh
npn install --save--dev nodemon
```

## API Endpoints

Get all products with their questions, answers, and votes
```sh
GET /products/questions/:productId
```

Creates a new product
```sh
POST /products/questions
```

Updates count of votes given a particular product id
```sh
PUT /products/questions/votes/:question_id
```

Deletes product along with their questions, answers, and votes
```sh
DELETE /products/questions/:productId
```
