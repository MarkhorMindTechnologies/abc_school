import React, { useState } from 'react';
import { 
  Users, UserPlus, Eye, Edit2, Trash2, CreditCard, 
  Award, ArrowUpRight, FileText, CheckCircle, Shield,
  Printer, ArrowRight
} from 'lucide-react';
import DataTable from '../components/common/DataTable';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';
import ConfirmDialog from '../components/common/ConfirmDialog';
import IdCardModal from '../components/common/IdCardModal';
import ReportCardModal from '../components/common/ReportCardModal';
import { useSchool } from '../context/SchoolContext';
import { formatCurrency, formatDate } from '../utils/formatters';

export default function StudentsPage() {
  const { 
    students, 
    classes, 
    addStudent, 
    updateStudent, 
    deleteStudent, 
    promoteStudent,
    marks,
    feeTransactions
  } = useSchool();

  const [classFilter, setClassFilter] = useState('All');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editStudent, setEditStudent] = useState(null);
  const [idCardStudent, setIdCardStudent] = useState(null);
  const [reportCardStudent, setReportCardStudent] = useState(null);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [promoteModalStudent, setPromoteModalStudent] = useState(null);
  const [targetClass, setTargetClass] = useState('Class 11 (Science)');
  const [targetSection, setTargetSection] = useState('A');
  const [showAddModal, setShowAddModal] = useState(false);
  const [tcStudent, setTcStudent] = useState(null);

  // New Student Form State
  const [formData, setFormData] = useState({
    fullName: '',
    gender: 'Male',
    dob: '2010-06-15',
    bloodGroup: 'B+',
    className: 'Class 10',
    section: 'A',
    fatherName: '',
    fatherPhone: '',
    fatherOccupation: '',
    motherName: '',
    motherPhone: '',
    guardianEmail: '',
    address: 'Srinagar, Jammu & Kashmir',
    category: 'General',
    busRoute: 'Route 1 (Rajbagh - Lal Mandi)',
    busStop: 'Rajbagh Chowk'
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateStudent = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.fatherName || !formData.fatherPhone) {
      alert('Please fill out required fields.');
      return;
    }
    addStudent(formData);
    setShowAddModal(false);
    setFormData({
      fullName: '',
      gender: 'Male',
      dob: '2010-06-15',
      bloodGroup: 'B+',
      className: 'Class 10',
      section: 'A',
      fatherName: '',
      fatherPhone: '',
      fatherOccupation: '',
      motherName: '',
      motherPhone: '',
      guardianEmail: '',
      address: 'Srinagar, Jammu & Kashmir',
      category: 'General',
      busRoute: 'Route 1 (Rajbagh - Lal Mandi)',
      busStop: 'Rajbagh Chowk'
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editStudent) return;
    updateStudent(editStudent.id, editStudent);
    setEditStudent(null);
  };

  const handlePromoteSubmit = () => {
    if (!promoteModalStudent) return;
    promoteStudent(promoteModalStudent.id, targetClass, targetSection);
    alert(`Student ${promoteModalStudent.fullName} successfully promoted to ${targetClass}-${targetSection}!`);
    setPromoteModalStudent(null);
  };

  const filteredStudents = classFilter === 'All'
    ? students
    : students.filter(s => s.className === classFilter);

  const columns = [
    {
      header: 'Adm No',
      accessor: 'admissionNo',
      className: 'w-28',
      render: (row) => <span className="font-mono text-xs font-bold text-slate-800">{row.admissionNo}</span>
    },
    {
      header: 'Student Name',
      render: (row) => (
        <div>
          <p className="font-bold text-slate-900 text-xs">{row.fullName}</p>
          <p className="text-[11px] text-slate-500">Roll: {row.rollNo || '1001'} • Blood: {row.bloodGroup || 'O+'}</p>
        </div>
      )
    },
    {
      header: 'Class & Section',
      render: (row) => (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200">
          {row.className} - {row.section}
        </span>
      )
    },
    {
      header: 'Parent Details',
      render: (row) => (
        <div className="text-xs">
          <p className="font-medium text-slate-800">{row.fatherName}</p>
          <p className="text-[11px] text-slate-500 font-mono">{row.fatherPhone}</p>
        </div>
      )
    },
    {
      header: 'Attendance',
      render: (row) => (
        <span className={`text-xs font-bold ${row.attendanceRate >= 90 ? 'text-emerald-700' : 'text-amber-700'}`}>
          {row.attendanceRate}%
        </span>
      )
    },
    {
      header: 'Fee Status',
      render: (row) => (
        <Badge variant={row.feeStatus === 'Paid' ? 'success' : row.feeStatus === 'Partial' ? 'warning' : 'danger'}>
          {row.feeStatus}
        </Badge>
      )
    },
    {
      header: 'Actions',
      className: 'text-right',
      render: (row) => {
        const studentMarks = marks.find(m => m.studentId === row.id);
        return (
          <div className="flex items-center justify-end gap-1">
            <button
              onClick={() => setSelectedStudent(row)}
              className="p-1 rounded text-slate-500 hover:text-blue-700 hover:bg-slate-100"
              title="View Student 360° Profile"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIdCardStudent(row)}
              className="p-1 rounded text-slate-500 hover:text-blue-700 hover:bg-slate-100"
              title="Print Student ID Card"
            >
              <Printer className="w-4 h-4" />
            </button>
            {studentMarks && (
              <button
                onClick={() => setReportCardStudent({ student: row, marks: studentMarks })}
                className="p-1 rounded text-slate-500 hover:text-emerald-700 hover:bg-slate-100"
                title="View Term Marksheet"
              >
                <Award className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => {
                setPromoteModalStudent(row);
                setTargetClass('Class 11 (Science)');
                setTargetSection('A');
              }}
              className="p-1 rounded text-slate-500 hover:text-indigo-700 hover:bg-slate-100"
              title="Promote Class"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setEditStudent({ ...row })}
              className="p-1 rounded text-slate-500 hover:text-amber-700 hover:bg-slate-100"
              title="Edit Profile"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setStudentToDelete(row)}
              className="p-1 rounded text-slate-400 hover:text-rose-700 hover:bg-slate-100"
              title="Withdraw Student"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        );
      }
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Student Information System (SIS)</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Central repository for student profiles, academics, attendance, ID cards, and transfers.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-md transition shadow-xs"
        >
          <UserPlus className="w-4 h-4" />
          <span>Enroll New Student</span>
        </button>
      </div>

      {/* Class Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <button
          onClick={() => setClassFilter('All')}
          className={`px-3 py-1.5 rounded-md border font-medium transition shrink-0 ${
            classFilter === 'All'
              ? 'bg-blue-900 text-white border-blue-900'
              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
          }`}
        >
          All Classes ({students.length})
        </button>
        {classes.slice(0, 10).map((c) => (
          <button
            key={c.id}
            onClick={() => setClassFilter(c.name)}
            className={`px-3 py-1.5 rounded-md border font-medium transition shrink-0 ${
              classFilter === c.name
                ? 'bg-blue-900 text-white border-blue-900'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* Main Student Directory Table */}
      <DataTable
        columns={columns}
        data={filteredStudents}
        searchPlaceholder="Search student name, roll number, admission number..."
        searchKeys={['fullName', 'admissionNo', 'rollNo', 'fatherName', 'className']}
        exportFilename="abc_school_students_master_2026"
      />

      {/* View Student 360 Profile Modal */}
      {selectedStudent && (
        <Modal
          isOpen={!!selectedStudent}
          onClose={() => setSelectedStudent(null)}
          title={`Student Profile — ${selectedStudent.fullName}`}
          subtitle={`Admission No: ${selectedStudent.admissionNo} • Class: ${selectedStudent.className}-${selectedStudent.section}`}
          maxWidth="max-w-2xl"
        >
          <div className="space-y-5 text-xs">
            {/* Top Quick Badges */}
            <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-md">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-900 text-white rounded-md flex items-center justify-center font-bold text-lg">
                  {selectedStudent.fullName.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{selectedStudent.fullName}</h3>
                  <p className="text-slate-500">Roll No: {selectedStudent.rollNo} • Blood Group: {selectedStudent.bloodGroup}</p>
                </div>
              </div>
              <div className="text-right space-y-1">
                <Badge variant={selectedStudent.feeStatus === 'Paid' ? 'success' : 'danger'}>
                  Fee: {selectedStudent.feeStatus}
                </Badge>
                <p className="text-[11px] font-semibold text-emerald-700">Attendance: {selectedStudent.attendanceRate}%</p>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-slate-200 p-3 rounded-md space-y-2">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] pb-1 border-b border-slate-100">
                  Parent / Guardian Information
                </h4>
                <div className="space-y-1 text-slate-700">
                  <p><span className="text-slate-500">Father:</span> {selectedStudent.fatherName}</p>
                  <p><span className="text-slate-500">Occupation:</span> {selectedStudent.fatherOccupation || 'Service'}</p>
                  <p><span className="text-slate-500">Father Phone:</span> <span className="font-mono">{selectedStudent.fatherPhone}</span></p>
                  <p><span className="text-slate-500">Mother:</span> {selectedStudent.motherName || 'N/A'}</p>
                  <p><span className="text-slate-500">Guardian Email:</span> {selectedStudent.guardianEmail || 'contact@parent.com'}</p>
                </div>
              </div>

              <div className="border border-slate-200 p-3 rounded-md space-y-2">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] pb-1 border-b border-slate-100">
                  Campus & Logistics Allocation
                </h4>
                <div className="space-y-1 text-slate-700">
                  <p><span className="text-slate-500">Admission Date:</span> {formatDate(selectedStudent.admissionDate)}</p>
                  <p><span className="text-slate-500">Transport:</span> {selectedStudent.busRoute || 'Private Conveyance'}</p>
                  <p><span className="text-slate-500">Bus Stop:</span> {selectedStudent.busStop || 'N/A'}</p>
                  <p><span className="text-slate-500">Residential Address:</span> {selectedStudent.address}</p>
                </div>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const st = selectedStudent;
                    setSelectedStudent(null);
                    setIdCardStudent(st);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print ID Card</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTcStudent(selectedStudent);
                    setSelectedStudent(null);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded hover:bg-blue-100"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Generate Transfer Certificate</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => setSelectedStudent(null)}
                className="px-4 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Transfer Certificate (TC) Preview Modal */}
      {tcStudent && (
        <Modal
          isOpen={!!tcStudent}
          onClose={() => setTcStudent(null)}
          title="School Transfer Certificate (TC)"
          maxWidth="max-w-xl"
        >
          <div className="space-y-4 text-xs">
            <div className="border-2 border-slate-800 p-6 rounded bg-white text-slate-900 space-y-3">
              <div className="text-center border-b border-slate-800 pb-3">
                <h2 className="text-lg font-bold uppercase">ABC PUBLIC SCHOOL</h2>
                <p className="text-[11px] text-slate-600">Affiliated to CBSE New Delhi • Affiliation No: 730045</p>
                <p className="font-bold uppercase text-xs mt-2 underline">School Leaving / Transfer Certificate</p>
              </div>
              <p>This is to certify that <span className="font-bold">{tcStudent.fullName}</span>, son/daughter of <span className="font-bold">{tcStudent.fatherName}</span>, having Admission No <span className="font-mono font-bold">{tcStudent.admissionNo}</span> was a bonafide student of this institution in <span className="font-bold">{tcStudent.className}</span>.</p>
              <p>1. Date of Birth according to Admission Register: <span className="font-bold">{formatDate(tcStudent.dob)}</span></p>
              <p>2. Dues cleared till date: <span className="font-bold text-emerald-700">All fees paid and no library books outstanding</span>.</p>
              <p>3. General Conduct & Character: <span className="font-bold">Good and exemplary</span>.</p>
              <p>4. Reason for leaving: <span className="italic">On parent's formal application</span>.</p>
              
              <div className="grid grid-cols-2 pt-8 text-center text-xs">
                <div>
                  <p className="border-t border-slate-400 pt-1">Prepared By: Front Office</p>
                </div>
                <div>
                  <p className="border-t border-slate-400 pt-1 font-bold">Principal Signature & Seal</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-blue-700 text-white font-semibold rounded hover:bg-blue-800"
              >
                Print Official TC
              </button>
              <button
                onClick={() => setTcStudent(null)}
                className="px-4 py-2 border border-slate-300 rounded text-slate-700"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Promotion Wizard Modal */}
      {promoteModalStudent && (
        <Modal
          isOpen={!!promoteModalStudent}
          onClose={() => setPromoteModalStudent(null)}
          title={`Promote Class — ${promoteModalStudent.fullName}`}
          maxWidth="max-w-md"
        >
          <div className="space-y-4 text-xs">
            <p className="text-slate-600">
              Current Class: <span className="font-bold text-slate-900">{promoteModalStudent.className} - {promoteModalStudent.section}</span>
            </p>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Target Class *</label>
              <select
                value={targetClass}
                onChange={(e) => setTargetClass(e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-md bg-white text-xs"
              >
                {classes.map(c => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Section</label>
              <select
                value={targetSection}
                onChange={(e) => setTargetSection(e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-md bg-white text-xs"
              >
                <option value="A">Section A</option>
                <option value="B">Section B</option>
                <option value="C">Section C</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
              <button
                onClick={() => setPromoteModalStudent(null)}
                className="px-3 py-1.5 border border-slate-300 rounded text-slate-600"
              >
                Cancel
              </button>
              <button
                onClick={handlePromoteSubmit}
                className="px-4 py-1.5 bg-blue-700 text-white font-semibold rounded hover:bg-blue-800"
              >
                Confirm Promotion
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Edit Student Modal */}
      {editStudent && (
        <Modal
          isOpen={!!editStudent}
          onClose={() => setEditStudent(null)}
          title={`Edit Student Record — ${editStudent.fullName}`}
          maxWidth="max-w-xl"
        >
          <form onSubmit={handleEditSubmit} className="space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={editStudent.fullName}
                  onChange={(e) => setEditStudent({ ...editStudent, fullName: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs"
                />
              </div>
              <div>
                <label className="block font-medium text-slate-700 mb-1">Class</label>
                <select
                  value={editStudent.className}
                  onChange={(e) => setEditStudent({ ...editStudent, className: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md bg-white text-xs"
                >
                  {classes.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block font-medium text-slate-700 mb-1">Father Name</label>
                <input
                  type="text"
                  value={editStudent.fatherName}
                  onChange={(e) => setEditStudent({ ...editStudent, fatherName: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs"
                />
              </div>
              <div>
                <label className="block font-medium text-slate-700 mb-1">Father Phone</label>
                <input
                  type="text"
                  value={editStudent.fatherPhone}
                  onChange={(e) => setEditStudent({ ...editStudent, fatherPhone: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs"
                />
              </div>
              <div className="col-span-2">
                <label className="block font-medium text-slate-700 mb-1">Residential Address</label>
                <input
                  type="text"
                  value={editStudent.address}
                  onChange={(e) => setEditStudent({ ...editStudent, address: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setEditStudent(null)}
                className="px-3 py-1.5 border border-slate-300 rounded text-slate-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-blue-700 text-white font-semibold rounded hover:bg-blue-800"
              >
                Save Changes
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Add New Student Modal */}
      {showAddModal && (
        <Modal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          title="Direct Student Enrollment"
          subtitle="Add student record to ABC School Student Information System"
          maxWidth="max-w-2xl"
        >
          <form onSubmit={handleCreateStudent} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Student Full Name *</label>
                <input
                  type="text"
                  required
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleFormChange}
                  placeholder="e.g. Danish Farooq"
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Class *</label>
                <select
                  name="className"
                  value={formData.className}
                  onChange={handleFormChange}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md bg-white text-xs"
                >
                  {classes.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Section</label>
                <select
                  name="section"
                  value={formData.section}
                  onChange={handleFormChange}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md bg-white text-xs"
                >
                  <option value="A">Section A</option>
                  <option value="B">Section B</option>
                  <option value="C">Section C</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleFormChange}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Father / Guardian Name *</label>
                <input
                  type="text"
                  required
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleFormChange}
                  placeholder="e.g. Farooq Ahmad"
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Guardian Mobile (+91) *</label>
                <input
                  type="tel"
                  required
                  name="fatherPhone"
                  value={formData.fatherPhone}
                  onChange={handleFormChange}
                  placeholder="+91 94190 XXXXX"
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-medium text-slate-700 mb-1">Residential Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleFormChange}
                  placeholder="e.g. Rajbagh, Srinagar, J&K"
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border border-slate-300 rounded-md text-slate-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-700 text-white font-semibold rounded-md hover:bg-blue-800"
              >
                Enroll Student
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Printable ID Card Modal */}
      {idCardStudent && (
        <IdCardModal
          isOpen={!!idCardStudent}
          onClose={() => setIdCardStudent(null)}
          person={idCardStudent}
          type="student"
        />
      )}

      {/* Printable Report Card Modal */}
      {reportCardStudent && (
        <ReportCardModal
          isOpen={!!reportCardStudent}
          onClose={() => setReportCardStudent(null)}
          student={reportCardStudent.student}
          marksRecord={reportCardStudent.marks}
        />
      )}

      {/* Confirm Delete / Withdraw Dialog */}
      {studentToDelete && (
        <ConfirmDialog
          isOpen={!!studentToDelete}
          onClose={() => setStudentToDelete(null)}
          onConfirm={() => deleteStudent(studentToDelete.id)}
          title="Withdraw Student Record"
          message={`Are you sure you want to withdraw ${studentToDelete.fullName} (${studentToDelete.admissionNo}) from ABC Public School active records?`}
          confirmText="Withdraw Student"
        />
      )}
    </div>
  );
}
