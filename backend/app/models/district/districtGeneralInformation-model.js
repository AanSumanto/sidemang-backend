import mongoose from 'mongoose';

const districtGeneralInformationSchema = new mongoose.Schema(
  {
    referenceNumber: { type: String, required: true },

  },
);

const DistrictGeneralInformation = mongoose.model('DistrictGeneralInformation', districtGeneralInformationSchema);
export default DistrictGeneralInformation;
