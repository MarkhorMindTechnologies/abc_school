import mongoose from 'mongoose';

// Fee Structure Schema
export const feeStructureSchema = new mongoose.Schema({
  classRange: { type: String, required: true },
  tuitionMonthly: { type: Number, required: true },
  annualCharges: { type: Number, default: 0 },
  labFee: { type: Number, default: 0 },
  computerFee: { type: Number, default: 0 },
  examFeeAnnual: { type: Number, default: 0 }
}, { timestamps: true });

// Fee Payment Transaction Schema
export const feePaymentSchema = new mongoose.Schema({
  receiptNo: { type: String, required: true, unique: true, index: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true, index: true },
  studentName: { type: String, required: true },
  admissionNo: { type: String, required: true },
  className: { type: String, required: true },
  date: { type: Date, default: Date.now },
  feeMonth: { type: String, required: true },
  heads: [{
    name: String,
    amount: Number
  }],
  discountAmount: { type: Number, default: 0 },
  fineAmount: { type: Number, default: 0 },
  totalAmount: { type: Number, required: true },
  paidAmount: { type: Number, required: true },
  balanceDue: { type: Number, default: 0 },
  paymentMode: { type: String, required: true },
  transactionRef: { type: String },
  collectedBy: { type: String, required: true },
  status: { type: String, enum: ['Completed', 'Partial', 'Cancelled'], default: 'Completed' }
}, { timestamps: true });

// Institutional Expense Schema
export const expenseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  paidTo: { type: String, required: true },
  paymentMode: { type: String, default: 'Net Banking' },
  approvedBy: { type: String, required: true },
  receiptDocument: String
}, { timestamps: true });

export const FeeStructure = mongoose.model('FeeStructure', feeStructureSchema);
export const FeePayment = mongoose.model('FeePayment', feePaymentSchema);
export const Expense = mongoose.model('Expense', expenseSchema);
