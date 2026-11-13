import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  admissionNo: { type: String, required: true, unique: true, index: true },
  rollNo: { type: String, index: true },
  fullName: { type: String, required: true, trim: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  dob: { type: Date, required: true },
  bloodGroup: { type: String, default: 'O+' },
  className: { type: String, required: true, index: true },
  section: { type: String, default: 'A', index: true },
  admissionDate: { type: Date, default: Date.now },
  category: { type: String, default: 'General' },
  
  // Guardian / Parent
  fatherName: { type: String, required: true },
  fatherPhone: { type: String, required: true },
  fatherOccupation: { type: String },
  motherName: { type: String },
  motherPhone: { type: String },
  guardianEmail: { type: String, lowercase: true, trim: true },
  address: { type: String, required: true },

  // Logistics & Status
  busRoute: { type: String },
  busStop: { type: String },
  hostelRoom: { type: String },
  attendanceRate: { type: Number, default: 100 },
  feeStatus: { type: String, enum: ['Paid', 'Partial', 'Overdue'], default: 'Paid' },
  pendingFeeAmount: { type: Number, default: 0 },
  status: { type: String, enum: ['Active', 'Transferred', 'Alumni', 'Withdrawn'], default: 'Active' },

  documents: [{
    title: String,
    url: String,
    uploadedAt: { type: Date, default: Date.now }
  }],

  academicHistory: [{
    fromClass: String,
    toClass: String,
    promotedDate: Date,
    status: String
  }]
}, {
  timestamps: true
});

studentSchema.index({ fullName: 'text', admissionNo: 'text', fatherPhone: 'text' });

export default mongoose.model('Student', studentSchema);
