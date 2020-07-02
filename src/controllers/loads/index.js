const express = require('express');
const router = express.Router();
const Load = require ("../../models/loads");

router.post('/', async (req, res) => {
  const {createBy, state, status, width, height, length, message, payload} = req.body;

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

  try {
    const findLoad = await Load.find({created_by: createBy});
    if (findLoad.length > 0) return res.status(409).send(`Conflict: the ${findLoad.length} document exist in DB`);
    const createLoads = await Load.create(load);
    return res.status(200).send({message: `Document with creator: ${createBy} was added to DB`, DB: createLoads})
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get('/', async (req, res) => {
  const {id, creator, state} = req.query;

  if (id === '' && creator === '' && state === '' || id === undefined && creator === undefined && state === undefined) {
    try {
      const findAllLoads = await Load.find({});
      return res.status(200).send({message: `${findAllLoads.length} loads was found in DB`, Loads: findAllLoads});
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  if (id !== '' || creator === undefined && state === undefined) {
    try {
      const findByID = await Load.find({_id: id});
      if (!findByID) return res.status(404).send({message: `Document with _id: ${id} doesn't found `});
      return res.status(200).send({
        message: `Was found ${findByID.length} loads with id: ${id}`,
        Load: findByID
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  if (creator !== '' || id === undefined && state === undefined) {
    try {
      const findCreator = await Load.find({created_by: creator});
      if (0 === findCreator.length) return res.status(404).send({
        message: `Document with user: ${creator} doesn't found `
      });
      return res.status(200).send({message: `${findCreator.length} loads was found`, Load: findCreator});
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  if (state !== '' || id === undefined && creator === undefined) {
    try {
      const findState = await Load.find({state: state});
      if (0 === findState.length) return res.status(404).send({
        message: `Loads with state: ${state} doesn't found `
      });
      return res.status(200).send({message: `${findState.length} loads was found`, Load: findState});
    } catch (error) {
      return res.status(500).send(error);
    }
  }
});

router.get('/aggregate', async (req, res) => {
  const {width, height, length} = req.query;
  console.log(width, height, length);
  try {
    const aggregateDemantion = await Load.aggregate([
      {
        "$group": {
          _id: "$_id",
          width: {"$addToSet": "$dimensions.width"},
          height: {"$addToSet": "$dimensions.height"},
          length: {"$addToSet": "$dimensions.length"}
        }
      }
    ]);
    return res.status(200).send(aggregateDemantion);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.put('/', async (req, res) => {
  const {id, updateCreator, updateState} = req.body

  let updateLoad = {
    created_by: updateCreator,
    state: updateState,
  };

  try {
    const updateOneLoad = await Load.findByIdAndUpdate(id, updateLoad, {new: true});
    if (!updateOneLoad) return res.status(500).send({message: `Document with: ${updateCreator} or ${updateState} doesn't found `});
    return res.status(200).send(updateOneLoad);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.delete('/', async (req, res) => {
  const {id} = req.body;
  try {
    const deleteLoad = await Load.findOneAndDelete({_id: id});
    if (!deleteLoad) return res.status(404).send({message: `The ${deleteLoad} wasn't found `});
    return res.status(200).send({message: `The ${deleteLoad.length} loads was found`, Load: deleteLoad});
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;