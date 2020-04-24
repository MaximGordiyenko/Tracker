import mongoose from 'mongoose';

const LoadSchema = new mongoose.Schema({
  created_by: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    required: true,
    trim: true
  },
  state: {
    type: String,
    required: true,
    trim: true
  },
  dimensions: {
    width: {
      type: Number
    },
    height: {
      type: Number
    },
    length: {
      type: Number
    }
  },
  logs: {
    message: {
      type: String,
      trim: true
    },
    date: {
      type: Date
    }
  },
  payload: {
    type: Number
  }
});

const Load = mongoose.model('Load', LoadSchema);
export default Load;
