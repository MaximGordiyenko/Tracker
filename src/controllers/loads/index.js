const express = require('express');
const router = express.Router();
import Load from "../../models/loads";

router.post('/', (req, res, next) => {
  const {created_by, status, state, dimensions, logs, payload} = req.body;
  console.log(created_by, status, state, dimensions, logs, payload);

  const load = {
    created_by: created_by || 'unassigned',
    status: status || 'unassigned',
    state: state || 'unassigned',
    dimensions: {
      width: type || 'unassigned',
      height: type || 'unassigned',
      length: type || 'unassigned',
    },
    logs: {
      message: type || 'unassigned',
      data: Date.now(),
    },
    payload: payload || 'unassigned',
  };

  Load.create(load, function (err, data) {
    if (err) {
      res.status(404).send(`error create DB ${err}`)
    }else {
      const {created_by, status, state, dimensions, logs, payload, _id} = data;
      res.send({created_by, status, state, dimensions, logs, payload, id: _id})
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
