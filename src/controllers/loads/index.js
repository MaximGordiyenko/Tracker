const express = require('express');
const router = express.Router();
import Load from "../../models/loads";

router.post('/', function (req, res) {
  const {createBy, state, status, width, height, length, message, payload} = req.body;
  console.log(createBy, state, status, width, height, length, message, payload);

  const load = {
    created_by: createBy || 'unassigned',
    state: state || 'unassigned',
    status: status || 'unassigned',
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

  return Load.find({created_by: createBy}, function (err, doc) {
    if (doc.length > 0) {
      return res.status(409).send(`Conflict: the ${doc.length} document exist in DB`);
    }
    return Load.create(load, function (err, doc) {
      if (err) {
        return res.status(404).send(`error create DB ${err}`);
      }
      return res.status(200).send(doc);
    });
  });
});

router.get('/', function (req, res) {
  const {id, creator, state} = req.query;
  console.log("find by:", id, creator, state);

  if (id === '' && creator === '' && state === '') {
    return Load.find({}, function (err, doc) {
      if (err) {
        return res.status(404).send(err);
      }
      return res.status(200).send(doc);
    })
  }

  if (id !== '' && creator === undefined && state === undefined) {
    return Load.findById({_id: id}, function (err, doc) {
      if (!doc || err) {
        return res.status(404).send({message: `Document with _id: ${id} doesn't found `, err: err});
      }
      return res.status(200).send(doc);
    })
  }

  if (creator !== '') {
    return Load.find({created_by: creator}, function (err, doc) {
      if (0 === doc.length || err) return res.status(404).send({
        message: `Document with user: ${creator} doesn't found `,
        err: err
      });
      return res.status(200).send(doc);
    });
  }

  if (state !== '') {
    return Load.find({state: state}, function (err, doc) {
      if (0 === doc.length || err) return res.status(404).send({
        message: `Document with state: ${state} doesn't found `,
        err: err
      });
      return res.status(200).send(doc);
    });
  }
});

router.put('/', function (req, res) {
  const {id, updateCreator, updateState} = req.body
  console.log("update:", id, updateCreator, updateState);

  let updateLoad = {
    created_by: updateCreator,
    state: updateState,
  };
  return Load.findByIdAndUpdate(id, updateLoad, {new: true}, function (err, doc) {
    if (!doc || err) {
      return res.status(404).send(err)
    }
    return res.status(200).send(doc)
  })
});

router.delete('/', function (req, res) {
  const {id} = req.body;
  console.log("delete id:", id);
  return Load.findOneAndDelete({_id: id}, function (err, doc) {
    if (!doc || err || !id) {
      return res.status(404).send({message: `The ${doc} wasn't found`, error: err});
    }
    return res.status(200).send(doc);
  })
});

export {router as LoadsController};