import mongoose from 'mongoose';

const cityDataSchema = new mongoose.Schema(
  {
    provinceId: { type: mongoose.Schema.Types.ObjectID, ref: 'ProvinceData', },
    cityName: { type: String, required: true },
  },
);

const CityData = mongoose.model('CityData', cityDataSchema);
export default CityData;
