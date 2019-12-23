import { Question } from './data';
import moment from 'moment';

const questions: Question[] = [
  {
    _id: '123' + Math.random(),
    title: 'Why is the sky blue?',
    text: 'All day I am wondering ever since I\'ve been a kid. I haven\'t heard the real story of it. Can someone help me out here?',
    answers: [{
      _id: '123' + Math.random(),
      text: '',
      created: moment(+ new Date() - 1000 * 3600 * 24 * 10 * Math.random()).format(),
    }],
    createdBy: 'Johnny Macaroni',
    created: moment(+ new Date() - 1000 * 3600 * 24 * 10 * Math.random()).format(),

  }, {
    _id: '123' + Math.random(),
    title: 'Why is the sky blue?',
    text: 'All day I am wondering ever since I\'ve been a kid. I haven\'t heard the real story of it. Can someone help me out here?',
    answers: [],
    createdBy: 'Johnny Macaroni',
    created: moment(+ new Date() - 1000 * 3600 * 24 * 10 * Math.random()).format(),

  }, {
    _id: '123' + Math.random(),
    title: 'Why is the sky green?',
    text: 'All day I am wondering ever since I\'ve been a kid. I haven\'t heard the real story of it. Can someone help me out here?',
    answers: [],
    createdBy: 'Johnny Macaroni',
    created: moment(+ new Date() - 1000 * 3600 * 24 * 10 * Math.random()).format(),

  }, {
    _id: '123' + Math.random(),
    title: 'Why is the sky blue?',
    text: 'All day I am wondering ever since I\'ve been a kid. I haven\'t heard the real story of it. Can someone help me out here?',
    answers: [],
    createdBy: 'Johnny Macaroni',
    created: moment(+ new Date() - 1000 * 3600 * 24 * 10 * Math.random()).format(),

  }
].sort((a, b) => a.created > b.created ? 1 : (a.created < b.created ? -1 : 0));

export default {
  'GET /mock/api/collection/Question': (req, res) => {
    return res.json({
      "content": questions,
      "first": true,
      "last": true,
      "number": 0,
      "numberOfElements": 10,
      "pageable": {
        "offset": 0,
        "pageNumber": 0,
        "pageSize": 10,
        "paged": true,
        "sort": {
          "sorted": true,
          "unsorted": false
        },
        "unpaged": false
      },
      "size": 10,
      "sort": {
        "sorted": true,
        "unsorted": false
      },
      "totalElements": 1,
      "totalPages": 1
    });
  },
  'POST /mock/api/collection/Question': (req, res) => {
    questions.unshift({
      _id: '123' + Math.random(),
      createdBy: 'Anna Banana',
      created: moment(+ new Date()).format(),
      ...req.body
    });
    res.json({status: 200, message: "Success"});
  },
}
