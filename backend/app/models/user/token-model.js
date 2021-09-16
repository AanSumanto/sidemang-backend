import mongoose from 'mongoose';

const tokenResetSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, 
      required: true, 
      ref: 'User',
    },
    token: { type: String, required: true },
    createAt: { 
      type: Date, 
      required: true, 
      default: Date.now,
      expires: 900,    
    },
  }
);

const TokenReset = mongoose.model('TokenReset', tokenResetSchema);
export default TokenReset;