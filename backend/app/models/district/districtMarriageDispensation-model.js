import mongoose from 'mongoose';

const districtMarriageDispensationSchema = new mongoose.Schema(
  {
    registrationNumber: { type: String, required: true, unique: true },
    referenceNumber: { type: String, required: true, unique: true },
    futureHusband: [
        {
            nik: { type: String },
            name: { type: String },
            address: { type: String },
            placeOfBirth: { type: String },
            dateOfBirth: { type: Date },
            religion: { type: String },
            citizenship: { type: String },
            profession: { type: String },
            maritalStatus: { type: String },
            ktpFile: { type: String },
            certificateFile: { type: String },
            applicationFile: { type: String },
            marriageCertificate: { type: String },
            kuaIntroduction: { type: String }, 
        },     
    ],
    futureWife : [
        {
            nik: { type: String },
            name: { type: String },
            address: { type: String },
            placeOfBirth: { type: String },
            dateOfBirth: { type: Date },
            religion: { type: String },
            citizenship: { type: String },
            profession: { type: String },
            maritalStatus: { type: String },
            ktpFile: { type: String },
            certificateFile: { type: String },
            applicationFile: { type: String },
            marriageCertificate: { type: String },
            kuaIntroduction: { type: String }, 
        }, 
    ]
  },
);

const DistrictMarriageDispensation = mongoose.model('DistrictMarriageDispensation', districtMarriageDispensationSchema);
export default DistrictMarriageDispensation;