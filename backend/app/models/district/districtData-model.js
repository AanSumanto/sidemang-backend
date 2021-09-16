import mongoose from 'mongoose';

const districtDataSchema = new mongoose.Schema(
  {
    cityId: { type: mongoose.Schema.Types.ObjectID, ref: 'CityData', },
    districtName: { type: String, required: true },
  },
);

const DistrictData = mongoose.model('CityData', districtDataSchema);
export default DistrictData;
