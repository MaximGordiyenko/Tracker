const express = require('express');
const router = express.Router();
import Truck from '../../models/trucks';

router.post('/', function (req, res) {
  const {createBy, assignTo, type, status} = req.body;

  const truck = {
    creation_date: Date.now(),
    created_by: createBy || 'unassigned',
    assigned_to: assignTo || 'unassigned',
    status: status || 'unassigned',
    type: type || 'unassigned',
  };

  return Truck.find({created_by: createBy, assigned_to: assignTo, type: type, status: status}, function (err, doc) {
    if (doc.length > 0) {
      return res.status(409).send(`Conflict: the ${doc.length} document exist in DB`);
    }
    return Truck.create(truck, function (err, doc) {
      if (err) {
        return res.send(err);
      }
      return res.send(doc);
    })
  });
});

router.get('/', function (req, res) {
  const {creator, assigner, id} = req.query;
  console.log(req.sessionID);

  if (id === '' && creator === '' && assigner === '') {
    return Truck.find({}, function (err, data) {
      if (err) {
        return res.status(404).send(err);
      }
      return res.status(200).send(data);
    });
  }

  if (creator !== '') {
    return Truck.find({created_by: creator}, function (err, doc) {
      if (err) {
        return res.status(404).send(err);
      }
      return res.status(200).send(doc);
    });
  }

  if (assigner !== '') {
    return Truck.find({assigned_to: assigner}, function (err, doc) {
      if (err) {
        return res.status(404).send(err);
      }
      return res.status(200).send(doc)
    });
  }

  if (id !== '') {
    return Truck.findById({_id: id}, function (err, doc) {
      if (err) {
        return res.status(404).send(err);
      }
      return res.status(200).send(doc)
    });
  }
});

router.put('/', function (req, res) {
  const {id, updateCreator, updateAssigner} = req.body;

  let newData = {
    created_by: updateCreator,
    assigned_to: updateAssigner,
  };

  return Truck.findByIdAndUpdate(id, newData, {new: true}, function (err, doc) {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(200).send(doc);
  });
});

router.delete('/', function (req, res) {
  const {id} = req.body;
  return Truck.findOneAndDelete({_id: id}, function (err, doc) {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(200).send(doc);
  })
});

export {router as TrucksController};
