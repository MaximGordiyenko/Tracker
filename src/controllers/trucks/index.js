const express = require('express');
const router = express.Router();
import Truck from '../../models/trucks';


const errorHandler = (err, next) => {
  if (err) {
    console.log('default error handle', err);

    return next(err);
  }
};

router.post('/', (req, res, next) => {
  const {createBy, assignTo, type, status} = req.body;
  console.log("post:", createBy, assignTo, type, status);

  const truck = {
    creation_date: Date.now(),
    created_by: createBy || 'unassigned',
    assigned_to: assignTo || 'unassigned',
    status: status || 'unassigned',
    type: type || 'unassigned',
  };
  // FIXME : no validation for fields assigned_to, status, type, created_by
  Truck.create(truck, function (error, data) {
    if (error) {
      return res.status(400);
    }
    const {created_by, assigned_to, type, status, _id, creation_date} = data;

    return res.send({created_by, assigned_to, type, status, id: _id, creation_date});
  });
});

router.get('/', function (req, res, next) {
  const {created_by = null, assigned_to = null, type = null, status = null, _id = null, creation_date = null} = req.query;
  console.log("get by req.query is:", req.query);
  console.log(req.sessionID);
  ///
  if (created_by === null && assigned_to === null && type === null && status === null && _id === null && creation_date === null) {
    // get all if no params
    return Truck.find({}, (err, data) => {
      errorHandler(err, next);

      return res.send(data.map(item => {
          // eslint-disable-next-line no-undef
          const {created_by, assigned_to, type, status, _id, creation_date} = item;

          return ({created_by, assigned_to, type, status, id: _id, creation_date});
        })
      );
    });
  }
  if (_id !== null) {
    // get by id if
    return Truck.findById(_id, function (err, data) {
      errorHandler(err, next);
      const {created_by, assigned_to, type, status, _id, creation_date} = data;

      return res.send({created_by, assigned_to, type, status, id: _id, creation_date});
    });
  } else {
    // get by param if params are present
    return Truck.find({created_by, assigned_to, type, status, creation_date}, function (err, data) {
      errorHandler(err, next);
      const {created_by, assigned_to, type, status, _id, creation_date} = data;

      return res.send({created_by, assigned_to, type, status, id: _id, creation_date});
    });
  }
});

router.put('/', (req, res, next) => {
  const {_id} = req.body;
});

router.delete('/', async (req, res, next) => {
  const {_id} = req.body;
  console.log("delete:", _id);
  try {
    // eslint-disable-next-line no-unused-vars
    let itemToDelete = await Truck.findOneAndDelete({_id});
    if (itemToDelete === null) {
      return res.send({_id, deleted: 'false', reason: 'item not found'});
    }

    return res.send({_id, deleted: 'true'});
  } catch (error) {
    return res.send({_id, deleted: 'false', reason: error});
  }
});

export {router as TrucksController};
