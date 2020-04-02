import mongoose from 'mongoose';

const TrucksSchema = new mongoose.Schema({
    trucks : {
        creation_date: Date,
        created_by: userID,
        assigned_to: userID,
        status: String,
        type: String,
    }
});

const Truck = mongoose.model('Truck', TrucksSchema);
export default Truck;