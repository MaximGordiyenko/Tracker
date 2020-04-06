const express = require('express');
const router = express.Router();
import Truck from '../../models/trucks';

router.post('/truck', (req, res, next) => {
  const {createBy, assignTo, type, status} = req.body;

  let checkStatus = status === undefined ? false : status;
  console.log(createBy, assignTo, type, checkStatus);

  if (createBy && assignTo && type && checkStatus) {
    const trucks = {
      creation_date: new Date().toLocaleDateString(),
      created_by: createBy,
      assigned_to: assignTo,
      status: checkStatus,
      type: type,
    };

    Truck.create(trucks, function (error, truck) {
      if (error) {
        return res.status(400).send("mongoDB cannot create such truck")
      } else {
        return res.status(200).send(truck);
      }
    });
  }
});

router.get('/truck', function (req, res, next) {
  let name1 = req.query.name;
  console.log(name1);
  // Truck.find({}, function (err, docs) {
  //   if (err) {
  //     res.status(404).send(err);
  //   } else {
  //     res.json(docs);
  //   }
  // })
});

router.put('/truck', (req, res, next) => {

});

router.delete('/truck', (req, res, next) => {

});

export {router as TrucksController};
