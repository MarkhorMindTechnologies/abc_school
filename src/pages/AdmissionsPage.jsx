import React, { useState } from 'react';
import { 
  UserPlus, CheckCircle, XCircle, Clock, Eye, 
  FileCheck, Download, AlertCircle, Calendar, Check 
} from 'lucide-react';
import DataTable from '../components/common/DataTable';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';
import { useSchool } from '../context/SchoolContext';
import { formatDate } from '../utils/formatters';

export default function AdmissionsPage() {
  const { 
    admissions, 
    addAdmission, 
    updateAdmissionStatus, 
    convertAdmissionToStudent, 
    classes 
  } = useSchool();

  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedAdmission, setSelectedAdmission] = useState(null);
  const [showNewModal, setShowNewModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [statusRemarks, setStatusRemarks] = useState('');

  // Form State for New Admission
  const [formData, setFormData] = useState({
    applicantName: '',
    gender: 'Male',
    dob: '2012-05-15',
    appliedClass: 'Class 9',
    fatherName: '',
    fatherPhone: '',
    fatherEmail: '',
    previousSchool: '',
    previousPercentage: '',
    interviewDate: '2026-03-10',
    remarks: ''
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateAdmission = (e) => {
    e.preventDefault();
    if (!formData.applicantName || !formData.fatherName || !formData.fatherPhone) {
      alert('Please fill out all required fields.');
      return;
    }
    addAdmission({
      ...formData,
      documentsAttached: ['Birth Certificate', 'Aadhar Card', 'Previous Marksheet']
    });
    setShowNewModal(false);
    setFormData({
      applicantName: '',
      gender: 'Male',
      dob: '2012-05-15',
      appliedClass: 'Class 9',
      fatherName: '',
      fatherPhone: '',
      fatherEmail: '',
      previousSchool: '',
      previousPercentage: '',
      interviewDate: '2026-03-10',
      remarks: ''
    });
  };

  const handleStatusUpdate = () => {
    if (!selectedAdmission || !newStatus) return;
    updateAdmissionStatus(selectedAdmission.id, newStatus, statusRemarks);
    setShowStatusModal(false);
    setSelectedAdmission(prev => ({ ...prev, status: newStatus, remarks: statusRemarks }));
  };

  const handleConvertStudent = (adm) => {
    if (window.confirm(`Enroll ${adm.applicantName} directly as active student in ABC Public School?`)) {
      const newStudent = convertAdmissionToStudent(adm.id, adm.appliedClass, 'A');
      if (newStudent) {
        alert(`Student Successfully Enrolled!\nAdmission No: ${newStudent.admissionNo}\nClass: ${newStudent.className}-A`);
        setSelectedAdmission(null);
      }
    }
  };

  const filteredAdmissions = statusFilter === 'All' 
    ? admissions 
    : admissions.filter(a => a.status === statusFilter);

  const columns = [
    {
      header: 'App ID',
      accessor: 'id',
      className: 'w-24',
      render: (row) => <span className="font-mono text-xs font-semibold text-slate-700">{row.id}</span>
    },
    {
      header: 'Applicant Details',
      render: (row) => (
        <div>
          <p className="font-bold text-slate-900 text-xs">{row.applicantName}</p>
          <p className="text-[11px] text-slate-500">DOB: {formatDate(row.dob)} • {row.gender}</p>
        </div>
      )
    },
    {
      header: 'Class Applied',
      accessor: 'appliedClass',
      render: (row) => <span className="font-medium text-slate-800 text-xs">{row.appliedClass}</span>
    },
    {
      header: 'Guardian Info',
      render: (row) => (
        <div className="text-xs">
          <p className="font-medium text-slate-800">{row.fatherName}</p>
          <p className="text-[11px] text-slate-500 font-mono">{row.fatherPhone}</p>
        </div>
      )
    },
    {
      header: 'Prior Academic Record',
      render: (row) => (
        <div className="text-xs">
          <p className="text-slate-700">{row.previousSchool || 'Fresher'}</p>
          <p className="text-[11px] text-slate-500">{row.previousPercentage ? `Score: ${row.previousPercentage}` : 'Pre-primary'}</p>
        </div>
      )
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => {
        const variants = {
          'Admitted': 'success',
          'Approved': 'success',
          'Interview Scheduled': 'primary',
          'Under Review': 'warning',
          'Rejected': 'danger'
        };
        return <Badge variant={variants[row.status] || 'neutral'}>{row.status}</Badge>;
      }
    },
    {
      header: 'Actions',
      className: 'text-right',
      render: (row) => (
        <div className="flex items-center justify-end gap-1.5">
          <button
            onClick={() => setSelectedAdmission(row)}
            className="p-1.5 rounded-md hover:bg-slate-100 text-slate-600 hover:text-blue-700"
            title="View Application"
          >
            <Eye className="w-4 h-4" />
          </button>
          {row.status === 'Approved' && (
            <button
              onClick={() => handleConvertStudent(row)}
              className="px-2 py-1 text-xs font-semibold bg-emerald-700 text-white hover:bg-emerald-800 rounded transition"
              title="Enroll as Student"
            >
              Enroll
            </button>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Admission & Enrollment Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage online enquiries, applications, document verification and student onboarding.
          </p>
        </div>

        <button
          onClick={() => setShowNewModal(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-md transition shadow-xs"
        >
          <UserPlus className="w-4 h-4" />
          <span>New Admission Enquiry</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {['All', 'Under Review', 'Interview Scheduled', 'Approved', 'Admitted', 'Rejected'].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-3 py-1.5 rounded-md border font-medium transition shrink-0 ${
              statusFilter === status
                ? 'bg-blue-900 text-white border-blue-900'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Admissions Table */}
      <DataTable
        columns={columns}
        data={filteredAdmissions}
        searchPlaceholder="Search applicant, father, or phone..."
        searchKeys={['applicantName', 'fatherName', 'fatherPhone', 'appliedClass', 'id']}
        exportFilename="abc_school_admissions_2026"
      />

      {/* View Application Modal */}
      {selectedAdmission && (
        <Modal
          isOpen={!!selectedAdmission}
          onClose={() => setSelectedAdmission(null)}
          title={`Application Details — ${selectedAdmission.id}`}
          subtitle={`Submitted on ${formatDate(selectedAdmission.submissionDate)}`}
          maxWidth="max-w-xl"
        >
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-md border border-slate-200">
              <div>
                <p className="text-slate-500">Applicant Full Name:</p>
                <p className="font-bold text-slate-900 text-sm">{selectedAdmission.applicantName}</p>
              </div>
              <div>
                <p className="text-slate-500">Applied Class:</p>
                <p className="font-bold text-slate-900">{selectedAdmission.appliedClass}</p>
              </div>
              <div>
                <p className="text-slate-500">Gender & DOB:</p>
                <p className="text-slate-800 font-medium">{selectedAdmission.gender} • {formatDate(selectedAdmission.dob)}</p>
              </div>
              <div>
                <p className="text-slate-500">Current Status:</p>
                <Badge variant={selectedAdmission.status === 'Admitted' ? 'success' : 'warning'}>
                  {selectedAdmission.status}
                </Badge>
              </div>
            </div>

            <div className="space-y-2 border-t border-slate-200 pt-3">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Guardian Details</h4>
              <div className="grid grid-cols-2 gap-2 text-slate-700">
                <p><span className="text-slate-500">Father/Guardian:</span> {selectedAdmission.fatherName}</p>
                <p><span className="text-slate-500">Phone:</span> {selectedAdmission.fatherPhone}</p>
                <p className="col-span-2"><span className="text-slate-500">Email:</span> {selectedAdmission.fatherEmail || 'Not specified'}</p>
              </div>
            </div>

            <div className="space-y-2 border-t border-slate-200 pt-3">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Previous Academic History</h4>
              <p className="text-slate-700"><span className="text-slate-500">School:</span> {selectedAdmission.previousSchool || 'Fresher'}</p>
              <p className="text-slate-700"><span className="text-slate-500">Percentage / Grade:</span> {selectedAdmission.previousPercentage || 'N/A'}</p>
              {selectedAdmission.interviewDate && (
                <p className="text-blue-700 font-medium"><span className="text-slate-500">Interview Scheduled:</span> {formatDate(selectedAdmission.interviewDate)}</p>
              )}
            </div>

            <div className="space-y-2 border-t border-slate-200 pt-3">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Documents Attached</h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedAdmission.documentsAttached && selectedAdmission.documentsAttached.map((doc, i) => (
                  <span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded text-[11px]">
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span>{doc}</span>
                  </span>
                ))}
              </div>
            </div>

            {selectedAdmission.remarks && (
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-700">
                <span className="font-bold text-slate-900">Remarks: </span>
                <span>{selectedAdmission.remarks}</span>
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={() => {
                  setNewStatus(selectedAdmission.status);
                  setStatusRemarks(selectedAdmission.remarks || '');
                  setShowStatusModal(true);
                }}
                className="px-3 py-1.5 text-xs font-semibold bg-slate-800 text-white rounded hover:bg-slate-900 transition"
              >
                Change Application Status
              </button>

              <div className="flex gap-2">
                {selectedAdmission.status === 'Approved' && (
                  <button
                    type="button"
                    onClick={() => handleConvertStudent(selectedAdmission)}
                    className="px-3 py-1.5 text-xs font-semibold bg-emerald-700 text-white rounded hover:bg-emerald-800 transition"
                  >
                    Enroll as Student
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setSelectedAdmission(null)}
                  className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Change Status Modal */}
      {showStatusModal && (
        <Modal
          isOpen={showStatusModal}
          onClose={() => setShowStatusModal(false)}
          title="Update Application Status"
          maxWidth="max-w-md"
        >
          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-medium text-slate-700 mb-1">New Status</label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-md bg-white text-slate-800 text-xs focus:ring-1 focus:ring-blue-600"
              >
                <option value="Under Review">Under Review</option>
                <option value="Interview Scheduled">Interview Scheduled</option>
                <option value="Approved">Approved for Admission</option>
                <option value="Admitted">Admitted (Enrolled)</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Official Notes / Remarks</label>
              <textarea
                value={statusRemarks}
                onChange={(e) => setStatusRemarks(e.target.value)}
                rows={3}
                placeholder="Enter remarks or interview instructions..."
                className="w-full px-3 py-1.5 border border-slate-300 rounded-md bg-white text-slate-800 text-xs focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setShowStatusModal(false)}
                className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleStatusUpdate}
                className="px-4 py-1.5 bg-blue-700 text-white font-semibold rounded hover:bg-blue-800"
              >
                Save Status
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Create New Admission Modal */}
      {showNewModal && (
        <Modal
          isOpen={showNewModal}
          onClose={() => setShowNewModal(false)}
          title="New Student Admission Enquiry"
          subtitle="Register an offline or online applicant for Session 2026–2027"
          maxWidth="max-w-2xl"
        >
          <form onSubmit={handleCreateAdmission} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Applicant Full Name *</label>
                <input
                  type="text"
                  required
                  name="applicantName"
                  value={formData.applicantName}
                  onChange={handleFormChange}
                  placeholder="e.g. Sahil Bashir"
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Applied Class *</label>
                <select
                  name="appliedClass"
                  value={formData.appliedClass}
                  onChange={handleFormChange}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md bg-white text-xs focus:ring-1 focus:ring-blue-600"
                >
                  {classes.map(c => (
                    <option key={c.id} value={c.name}>{c.name} ({c.level})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleFormChange}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleFormChange}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md bg-white text-xs focus:ring-1 focus:ring-blue-600"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Father / Guardian Name *</label>
                <input
                  type="text"
                  required
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleFormChange}
                  placeholder="e.g. Bashir Ahmad Dar"
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs focus:ring-1 focus:ring-blue-600"
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
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Previous School Attended</label>
                <input
                  type="text"
                  name="previousSchool"
                  value={formData.previousSchool}
                  onChange={handleFormChange}
                  placeholder="e.g. Tyndale Biscoe School"
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Previous Percentage / Grade</label>
                <input
                  type="text"
                  name="previousPercentage"
                  value={formData.previousPercentage}
                  onChange={handleFormChange}
                  placeholder="e.g. 88.5%"
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Administrative Remarks / Notes</label>
              <textarea
                name="remarks"
                value={formData.remarks}
                onChange={handleFormChange}
                rows={2}
                placeholder="Candidate strengths or assessment notes..."
                className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setShowNewModal(false)}
                className="px-4 py-2 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-700 text-white font-semibold rounded-md hover:bg-blue-800 transition"
              >
                Submit Admission Record
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
