import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema(
  {
    nip: { type: Number, required: true },
    nrnpnsd: { type: Number, required: true },
    nik: { type: Number, required: true },
    name: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    email: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    frontTitle: { type: String},
    nonAcademicDegree: { type: String },
    backTitle: { type: String},
    placeOfBirth: { type: String },
    dateOfBirth: { type: String },
    gender: { type: String },
    address: { type: String },
    religion: { type: String },
    maritalStatus: { type: String },
    citizenship: { type: String },
    workUnit: { type: String },
    subsection: { type: String },
    rank: { type: String },
    group: { type: String },
    department: { type: String },
    handphoneNumber: { type: String },
    homePhoneNumber: { type: String }

  },
  {
    timestamps: { createdAt: true, updatedAt: false }
  },
);

const Employee = mongoose.model('Employee', employeeSchema);
export default Employee;
