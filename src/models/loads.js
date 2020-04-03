import mongoose from 'mongoose';

const LoadsSchema = new mongoose.Schema({
    loads: {
        created_by: userID,
        status: String,
        state: String,
        dimensions: {width: Number, height: Number, length: Number},
        logs: [{message, Date}],
        payload: Number
    }
});

const Loads = mongoose.model('Loads', LoadsSchema);
export default Loads;