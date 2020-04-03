import mongoose from 'mongoose';

const TrucksSchema = new mongoose.Schema({
  trucks: {
    creation_date: Date,
    created_by: userId,
    assigned_to: userId,
    status: String,
    type: String,
  }
});

const Trucks = mongoose.model('Trucks', TrucksSchema);
export default Trucks;