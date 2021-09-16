import mongoose from 'mongoose';

const populationSchema = new mongoose.Schema(
  {
    nik: { type: Number, required: true },
    kk: { type: Number },
    fullName: { type: String, required: true },
    placeOfBirth: { type: String, required: true },
    dateOfBirth: { type: Date , required: true },
    gender: { type: String },
    blood: { type: String },
    address: { type: String, required: true },
    rt: { type: Number },
    rw: { type: Number },
    provinceId: { type: mongoose.Schema.Types.ObjectID, ref: 'ProvinceData' },
    cityId: { type: mongoose.Schema.Types.ObjectID, ref: 'CityData'},
    district: { type: String, required: true },
    village: { type: String, required: true },
    religion: { type: String, required: true },
    maritalStatus: {  type: String, required: true },
    profession: { type: String, required: true },
    cityzenship: {  type: String, required: true },
    age: { type: String },
    ktpFile: { type: String },
    kkFile: { type: String },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  },
);

const Population = mongoose.model('Population', populationSchema);
export default Population;
