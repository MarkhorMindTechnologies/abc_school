import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Import Models
import Student from './models/Student.js';
import Staff from './models/Staff.js';
import { FeePayment, Expense } from './models/Finance.js';
import { AttendanceModel, ExamModel, ResultModel } from './models/Academic.js';
import { Book, BookIssue, TransportRoute, Inventory, AuditLog } from './models/Operations.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/abc_school_erp';

// Security and Logging Middlewares
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(morgan('dev'));
app.use(express.json());

// API Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ONLINE',
    school: 'ABC Public Higher Secondary School',
    session: '2026-2027',
    timestamp: new Date().toISOString()
  });
});

// REST API Endpoints

// 1. Students API
app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find().sort({ admissionNo: 1 });
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/students', async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 2. Staff API
app.get('/api/staff', async (req, res) => {
  try {
    const staff = await Staff.find().sort({ employeeCode: 1 });
    res.json(staff);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Fees & Ledger API
app.get('/api/fees/transactions', async (req, res) => {
  try {
    const txns = await FeePayment.find().sort({ createdAt: -1 });
    res.json(txns);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/fees/transactions', async (req, res) => {
  try {
    const newTxn = new FeePayment(req.body);
    await newTxn.save();
    res.status(201).json(newTxn);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 4. Attendance API
app.post('/api/attendance', async (req, res) => {
  try {
    const { date, className, section, records, markedBy } = req.body;
    let att = await AttendanceModel.findOne({ date, className, section });
    if (att) {
      att.records = records;
      att.markedBy = markedBy;
      await att.save();
    } else {
      att = new AttendanceModel({ date, className, section, records, markedBy });
      await att.save();
    }
    res.json({ message: 'Attendance recorded successfully', data: att });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Connect to MongoDB
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(MONGODB_URI)
    .then(() => {
      console.log('Connected to MongoDB database (ABC School ERP)');
      app.listen(PORT, () => {
        console.log(`ABC School ERP Server running on port ${PORT}`);
      });
    })
    .catch((err) => {
      console.log('MongoDB connection note: Database offline or connecting in local fallback mode.', err.message);
      app.listen(PORT, () => {
        console.log(`ABC School ERP Server running in standalone demo mode on port ${PORT}`);
      });
    });
}

export default app;
