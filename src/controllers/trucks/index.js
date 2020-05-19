const express = require('express');
const router = express.Router();
import Truck from '../../models/trucks';

router.post('/', async (req, res) => {
  const {createBy, assignTo, status, type} = req.body;

  const truck = {
    creation_date: Date.now(),
    created_by: createBy || 'unassigned',
    assigned_to: assignTo || 'unassigned',
    status: status || 'unassigned',
    type: type || 'unassigned',
  };
  if (createBy !== '' && assignTo !== '' && status !== '' && type !== '') {
    try {
      const findTruck = await Truck.find({created_by: createBy, assigned_to: assignTo, type: type});
      if (findTruck.length > 0) return res.status(409).send(`Conflict: the ${findTruck.length} document exist in DB`);
      const createTruck = await Truck.create(truck);
      return res.status(200).send(createTruck);
    } catch (e) {
      res.status(500).send(e);
    }
  }else{
    return res.send(`Insert valid field`);
  }

});

router.get('/', async (req, res) => {
  const {id, creator, assigner} = req.query;
  console.log(req.sessionID);

  if (id === '' && creator === '' && assigner === '' || id === undefined && creator === undefined && assigner === undefined) {
    try {
      const findAllTrucks = await Truck.find({});
      return res.status(200).send({message: `Was found ${findAllTrucks.length} trucks in DB`, Trucks: findAllTrucks});
    } catch (e) {
      res.status(500).send(e);
    }
  }

  if (id !== '' || creator === undefined && assigner === undefined) {
    try {
      const findByID = await Truck.findById({_id: id});
      if (!findByID) return res.status(404).send({message: `Document with _id: ${id} doesn't found `});
      return res.status(200).send(findByID)
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  if (creator !== '' || id === undefined && assigner === undefined) {
    try {
      const findCreator = await Truck.find({created_by: creator});
      if (0 === findCreator.length) return res.status(404).send({message: `Document with user: ${creator} doesn't found `});
      return res.status(200).send(findCreator);
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  if (assigner !== '' || id === undefined && creator === undefined) {
    try {
      const findAssingner = await Truck.find({assigned_to: assigner});
      if (0 === findAssingner.length) return res.status(404).send({message: `Document with user: ${assigner} doesn't found `});
      return res.status(200).send(findAssingner);
    } catch (error) {
      return res.status(500).send(error);
    }
  }
});

router.put('/', async (req, res) => {
  const {id, updateCreator, updateAssigner} = req.body;

  let newData = {
    created_by: updateCreator,
    assigned_to: updateAssigner,
  };

  try {
    const updateTruck = await Truck.findByIdAndUpdate(id, newData, {new: true});
    if (!updateTruck) return res.status(500).send({message: `Document with: ${updateCreator} or ${updateAssigner} doesn't found `});
    return res.status(200).send(updateTruck);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.delete('/', async (req, res) => {
  const {id} = req.body;
  try {
    const deleteByID = await Truck.findOneAndDelete({_id: id});
    if (!deleteByID) return res.status(500).send({message: `Truck: ${deleteByID} was not found`});
      return res.status(200).send({message: `Document with id: ${id} was deleted`, Truck: deleteByID});
  } catch (error) {
    return res.status(500).send(error);
  }
});

export {router as TrucksController};
