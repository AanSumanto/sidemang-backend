import mongoose from 'mongoose';

const districtCompanyDomicileInformationSchema = new mongoose.Schema(
  {
    registrationNumber: { type: String, required: true, unique: true },  
    referenceNumber: { type: String, required: true, unique: true },
    companyName: { type: String, required: true },
    bussinessType: { type: String, required: true },
    companyAddress: { type: String, required: true },
    buildingStatus: { type: String, required: true },
    buildingFunction: { type: String },
    ipbData: { type: String },
    deedOfIncorporation: { type: String },
    numberOfEmployees: { type: String },
    headCompany: { type: String },
    validFrom: { type: Date },
    lastsFrom: { type: Date},
    recomendationFile: { type: String },
    notarialDeedFile: { type: String },
    siupFile: { type: String },
    tdpFile: { type: String },    
  },
);

const DistrictCompanyDomicileInformation = mongoose.model('DistrictCompanyDomicileInformation', districtCompanyDomicileInformationSchema);
export default DistrictCompanyDomicileInformation;
