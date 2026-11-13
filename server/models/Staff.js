import mongoose from 'mongoose';

const staffSchema = new mongoose.Schema({
  employeeCode: { type: String, required: true, unique: true, index: true },
  fullName: { type: String, required: true, trim: true },
  designation: { type: String, required: true },
  department: { type: String, required: true, index: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  phone: { type: String, required: true },
  qualification: { type: String, required: true },
  experienceYears: { type: Number, default: 0 },
  joiningDate: { type: Date, default: Date.now },
  salaryMonthly: { type: Number, required: true },
  status: { type: String, enum: ['Active', 'On Leave', 'Relieved'], default: 'Active' },
  bloodGroup: { type: String, default: 'O+' },
  address: { type: String, required: true },
  assignedSubjects: [{ type: String }],
  assignedClasses: [{ type: String }],
  bankDetails: {
    accountNumber: String,
    bankName: String,
    ifscCode: String
  }
}, {
  timestamps: true
});

export default mongoose.model('Staff', staffSchema);
