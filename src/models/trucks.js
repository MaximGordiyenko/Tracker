import mongoose from 'mongoose';

const TruckSchema = new mongoose.Schema({
  creation_date: {
    type: Date
  },
  created_by: {
    type: String,
    required: true,
    trim: true
  },
  assigned_to: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    trim: true
  },
});

const Truck = mongoose.model('Truck', TruckSchema);
module.exports = Truck;