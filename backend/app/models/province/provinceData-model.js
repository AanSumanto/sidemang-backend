import mongoose from 'mongoose';

const provinceDataSchema = new mongoose.Schema(
  {
    provinceName: { type: String, required: true },
  },
);

const ProvinceData = mongoose.model('ProvinceData', provinceDataSchema);
export default ProvinceData;
