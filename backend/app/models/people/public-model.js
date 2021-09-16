import mongoose from 'mongoose';

const publicSchema = new mongoose.Schema(
  {
    nik: { type: Number, required: true },
    name: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    email: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    address: { type: String, required: true }
  },
  {
    timestamps: { createdAt: true, updatedAt: false }
  },
);

const Public = mongoose.model('Public', publicSchema);
export default Public;
