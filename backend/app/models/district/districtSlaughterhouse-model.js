import mongoose from 'mongoose';

const districtSlaughterhouseSchema = new mongoose.Schema(
  {
    registrationNumber: { type: String, required: true, unique: true },
    referenceNumber: { type: String, required: true, unique: true },
    bussinessType: { type: String, required: true },
    bussinessPlace: { type: String, },
    recomendationFile: { type: String },
    photoFile: { type: String },
    animalHealthFile: { type: String },
    ownershipAnimalFile: { type: String },
  },
);

const DistrictSlaughterhouse = mongoose.model('DistrictSlaughterhouse', districtSlaughterhouseSchema);
export default DistrictSlaughterhouse;
