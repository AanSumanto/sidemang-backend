import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    idBerkas: String,
    idMenuLayanan: String,
    kodeKategori: String,
    kodeKelurahan: String,
    alurBerkasLurah: String,
    alurBerkasCamat: String,
    tanggalPengajuan: String,
    namaPemohon: String,
    KK: String,
    NIK: String,
    PBB: String,
    alamatPemohon: String,
    golDarah: String,
    RT: String,
    RW: String,
    tempatLahir: String,
    tanggalLahir: String,
    jenisKelamin: String,
    agama: String,
    kewarganegaraan: String,
    pekerjaan: String,
    umur: String,
    statusPernikahan: String,
    statusBerkas: String,
    kelengkapanBerkas: String,
    seksiBerkas: String,
    telepon: String,
    email: String,
    catatan: String,
    fileKTP: String,
    fileKK: String,
    filePBB: String,
  },
  {
    timestamps: true,
  },
);

const DataBerkasKecamatan = mongoose.model('DataBerkasKecamatan', userSchema);
export default DataBerkasKecamatan;
