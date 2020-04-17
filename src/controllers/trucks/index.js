const express = require('express');
const router = express.Router();
import Truck from '../../models/trucks';

router.post('/', (req, res) => {
  const {createBy, assignTo, type, status} = req.body;

  const truck = {
    creation_date: Date.now(),
    created_by: createBy || 'unassigned',
    assigned_to: assignTo || 'unassigned',
    status: status || 'unassigned',
    type: type || 'unassigned',
  };

  return Truck.find({created_by: createBy, assigned_to: assignTo, type: type, status: status}, async function (err, doc) {
    if (doc.length > 0) {
      return res.send('document exist');
    } else {
      try {
        const promiseResult = await Truck.create(truck);
        return res.send({create: 'true', result: promiseResult});
      } catch (e) {
        return res.send({create: 'false', reason: e});
      }
    }
  });
});

router.get('/', function (req, res) {
  const {creator, assigner, id} = req.query;
  console.log(req.sessionID);

  if (id === '' && creator === '' && assigner === '') {
    return Truck.find({}, (err, data) => {
      if (err) {
        return res.status(404).send(err);
      }
      return res.send(data);
    });
  }

  if (creator !== '') {
    return Truck.find({created_by: creator}, function (err, doc) {
      if (err) {
        return res.status(404).send(err);
      }
      console.log("this is doc", doc, "type", Array.isArray(doc));
      return res.send(doc);
    });
  }
  return res.status(404).send({});

  // if (assigner !== '') {
  //   Truck.find({assigned_to: assigner}, function (err, doc) {
  //     errorHandler(err, next);
  //     return res.send(doc.map(item => {
  //       const {_id, created_by, assigned_to, type, status, creation_date} = item;
  //       return ({_id, created_by, assigned_to, type, status, creation_date});
  //     }))
  //   });
  // }

//   if (id !== '') {
//     Truck.findById({_id: id}, function (err, data) {
//       errorHandler(err, next);
//       const {_id: id, created_by, assigned_to, type, status, creation_date} = data;
//       return res.send({_id: id, created_by, assigned_to, type, status, creation_date});
//     });
//   }
});

router.put('/', function (req, res) {
  const {id, updateCreator, updateAssigner} = req.body;
  console.log(id, updateCreator, updateAssigner);
  let newData = {
    created_by: updateCreator,
    assigned_to: updateAssigner,
  };
  Truck.findByIdAndUpdate(id, newData, {new: true}, function (err, doc) {
    if (err) return res.status(500);
    return res.status(200).send(doc);
  });
  res.status(200);
});

router.delete('/', async (req, res) => {
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
