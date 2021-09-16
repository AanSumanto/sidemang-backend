import mongoose from 'mongoose';

const districTokenSchema = new mongoose.Schema(
  {
    token: { type: String, required: true },
    status:{
      type: String,
      enum: ['Pending', 'Active'],
      default: 'Pending',
    },
  }
);

const  DistrictToken = mongoose.model('DistrictToken', districTokenSchema);
export default DistrictToken;