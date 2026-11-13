import mongoose from 'mongoose';

// Library Book Catalog & Borrowing
export const bookSchema = new mongoose.Schema({
  isbn: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  shelfLocation: { type: String, required: true },
  totalCopies: { type: Number, default: 1 },
  issuedCopies: { type: Number, default: 0 },
  availableCopies: { type: Number, default: 1 }
}, { timestamps: true });

export const bookIssueSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  bookTitle: String,
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  studentName: String,
  admissionNo: String,
  issueDate: { type: Date, default: Date.now },
  dueDate: { type: Date, required: true },
  returnDate: Date,
  fineAmount: { type: Number, default: 0 },
  status: { type: String, enum: ['Issued', 'Returned', 'Overdue'], default: 'Issued' }
}, { timestamps: true });

// Transport Fleet & Routes
export const transportRouteSchema = new mongoose.Schema({
  routeNumber: { type: String, required: true, unique: true },
  routeName: { type: String, required: true },
  vehicleNo: { type: String, required: true },
  busModel: String,
  driverName: { type: String, required: true },
  driverPhone: { type: String, required: true },
  conductorName: String,
  totalCapacity: { type: Number, default: 40 },
  allocatedStudents: { type: Number, default: 0 },
  gpsStatus: { type: String, default: 'Live (Online)' },
  stops: [{
    name: String,
    time: String,
    fare: Number
  }]
}, { timestamps: true });

// Inventory Schema
export const inventorySchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, default: 'Units' },
  location: { type: String, required: true },
  condition: { type: String, default: 'Good' },
  minThreshold: { type: Number, default: 5 },
  status: { type: String, enum: ['Normal', 'Low Stock', 'Out of Stock'], default: 'Normal' }
}, { timestamps: true });

// Audit Log Schema
export const auditLogSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  user: { type: String, required: true },
  role: { type: String, required: true },
  action: { type: String, required: true, index: true },
  details: { type: String, required: true },
  ipAddress: { type: String, default: '127.0.0.1' }
}, { timestamps: true });

export const Book = mongoose.model('Book', bookSchema);
export const BookIssue = mongoose.model('BookIssue', bookIssueSchema);
export const TransportRoute = mongoose.model('TransportRoute', transportRouteSchema);
export const Inventory = mongoose.model('Inventory', inventorySchema);
export const AuditLog = mongoose.model('AuditLog', auditLogSchema);
