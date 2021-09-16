import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    nik: { type: Number },
    nip: { type: Number },
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, lowercase: true },
    password: { type: String, required: true },
    avatar: { type: String },
    status: {
      type: String,
      enum: ['Pending', 'Active'],
      default: 'Pending',
    }, 
    isEmployee: { type: String },
    role: { type: String },
    confirmationCode: { type: String },
    resetPasswordCode: { type: String },
    resetPasswordExpired: { type: Date },
    notifications: {
      readerId: { type: String },
      senderId: { type: String },
    },    
  },
  {
    timestamps: true,
  },
);

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     return next(this);
//   }
//   const bcryptSalt = process.env.BCRYPT_SALT;
//   const hash = await bcrypt.hash(this.password, Number(bcryptSalt));
//   this.password = hash;
//   next();
// });

const User = mongoose.model('User', userSchema);
export default User;
