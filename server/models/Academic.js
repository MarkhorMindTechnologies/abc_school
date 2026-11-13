import mongoose from 'mongoose';

// Class & Section Schema
export const classSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  level: { type: String, enum: ['Pre-Primary', 'Primary', 'Middle', 'Secondary', 'Senior Secondary'], required: true },
  sections: [{ type: String, default: 'A' }],
  classTeacher: { type: String }
}, { timestamps: true });

// Subject Schema
export const subjectSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, enum: ['Core', 'Science', 'Commerce', 'Humanities', 'Language', 'Elective'], default: 'Core' },
  applicableClasses: [{ type: String }]
}, { timestamps: true });

// Attendance Schema
export const attendanceSchema = new mongoose.Schema({
  date: { type: String, required: true, index: true },
  className: { type: String, required: true, index: true },
  section: { type: String, required: true, index: true },
  records: [{
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    studentName: String,
    status: { type: String, enum: ['Present', 'Absent', 'Late', 'Half-Day'], default: 'Present' },
    remarks: String
  }],
  markedBy: { type: String, required: true }
}, { timestamps: true });

// Examination Schema
export const examSchema = new mongoose.Schema({
  title: { type: String, required: true },
  session: { type: String, required: true },
  classesApplicable: [{ type: String }],
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  totalMarksPerSubject: { type: Number, default: 100 },
  passPercentage: { type: Number, default: 33 },
  status: { type: String, enum: ['Upcoming', 'In Progress', 'Completed'], default: 'Upcoming' }
}, { timestamps: true });

// Result Schema
export const resultSchema = new mongoose.Schema({
  examId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true, index: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true, index: true },
  studentName: String,
  className: String,
  subjects: [{
    code: String,
    name: String,
    maxMarks: { type: Number, default: 100 },
    theoryMarks: Number,
    practicalMarks: Number,
    marksObtained: Number,
    grade: String,
    remarks: String
  }],
  totalObtained: Number,
  maxTotal: Number,
  percentage: Number,
  overallGrade: String,
  classRank: Number,
  attendanceRate: Number,
  teacherRemarks: String,
  promotedStatus: String
}, { timestamps: true });

export const ClassModel = mongoose.model('Class', classSchema);
export const SubjectModel = mongoose.model('Subject', subjectSchema);
export const AttendanceModel = mongoose.model('Attendance', attendanceSchema);
export const ExamModel = mongoose.model('Exam', examSchema);
export const ResultModel = mongoose.model('Result', resultSchema);
