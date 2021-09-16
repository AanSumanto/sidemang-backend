import mongoose from 'mongoose';

const villageDataSchema = new mongoose.Schema(
  {
    districtId: { type: mongoose.Schema.Types.ObjectID, ref: 'DistrictData', },
    villageName: { type: String, required: true },
  },
);

const VillageData = mongoose.model('VillageData', villageDataSchema);
export default VillageData;
