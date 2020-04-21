const express = require('express');
const router = express.Router();
import Load from "../../models/loads";

router.post('/', function (req, res) {
  const {created_by, status, state, dimensions: {width, height, length}, logs: {message, date}, payload} = req.body;
  console.log(created_by, status, state, width, height, length, message, date, payload);

  const load = {
    created_by: created_by || 'unassigned',
    status: status || 'unassigned',
    state: state || 'unassigned',
    dimensions: {
      width: width,
      height: height,
      length: length,
    },
    logs: {
      message: message || 'unassigned',
      date: Date.now(),
    },
    payload: payload,
  };

  return Load.create(load, function (err, data) {
    if (err) {
      res.status(404).send(`error create DB ${err}`)
    } else {
      const {created_by, status, state, dimensions: {width, height, length}, logs: {message, date}, payload, _id} = data;

      res.send({
        created_by, status, state, dimensions: {width, height, length}, logs: {message, date}, payload, id: _id
      })
    }
  })
});

router.get('/', (req, res, next) => {

});

router.put('/', (req, res, next) => {

});

router.delete('/', (req, res, next) => {

});

export {router as LoadsController};