import React, { useState } from 'react';
import { 
  GraduationCap, UserPlus, Eye, Edit2, Trash2, 
  Printer, Briefcase, Mail, Phone, MapPin, Award
} from 'lucide-react';
import DataTable from '../components/common/DataTable';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';
import ConfirmDialog from '../components/common/ConfirmDialog';
import IdCardModal from '../components/common/IdCardModal';
import { useSchool } from '../context/SchoolContext';
import { formatCurrency, formatDate } from '../utils/formatters';

export default function StaffPage() {
  const { staff, addStaff, updateStaff, deleteStaff } = useSchool();
  const [deptFilter, setDeptFilter] = useState('All');
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [idCardStaff, setIdCardStaff] = useState(null);
  const [editStaff, setEditStaff] = useState(null);
  const [staffToDelete, setStaffToDelete] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    designation: 'PGT Faculty',
    department: 'Science',
    email: '',
    phone: '',
    qualification: 'M.Sc., B.Ed.',
    experienceYears: 5,
    salaryMonthly: 60000,
    bloodGroup: 'O+',
    address: 'Srinagar, Jammu & Kashmir',
    assignedSubjects: 'Physics'
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateStaff = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) {
      alert('Please fill out required fields.');
      return;
    }
    addStaff({
      ...formData,
      assignedSubjects: formData.assignedSubjects ? [formData.assignedSubjects] : []
    });
    setShowAddModal(false);
    setFormData({
      fullName: '',
      designation: 'PGT Faculty',
      department: 'Science',
      email: '',
      phone: '',
      qualification: 'M.Sc., B.Ed.',
      experienceYears: 5,
      salaryMonthly: 60000,
      bloodGroup: 'O+',
      address: 'Srinagar, Jammu & Kashmir',
      assignedSubjects: 'Physics'
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editStaff) return;
    updateStaff(editStaff.id, editStaff);
    setEditStaff(null);
  };

  const departments = ['All', 'Administration', 'Mathematics', 'Science', 'Languages', 'Accounts & Finance', 'Library & Information', 'Transport Operations'];

  const filteredStaff = deptFilter === 'All'
    ? staff
    : staff.filter(s => s.department === deptFilter);

  const columns = [
    {
      header: 'Emp Code',
      accessor: 'employeeCode',
      className: 'w-28',
      render: (row) => <span className="font-mono text-xs font-bold text-slate-800">{row.employeeCode}</span>
    },
    {
      header: 'Employee Details',
      render: (row) => (
        <div>
          <p className="font-bold text-slate-900 text-xs">{row.fullName}</p>
          <p className="text-[11px] text-slate-500">{row.qualification}</p>
        </div>
      )
    },
    {
      header: 'Designation & Department',
      render: (row) => (
        <div className="text-xs">
          <p className="font-semibold text-slate-800">{row.designation}</p>
          <p className="text-[11px] text-blue-700 font-medium">{row.department}</p>
        </div>
      )
    },
    {
      header: 'Contact Info',
      render: (row) => (
        <div className="text-xs">
          <p className="text-slate-800 font-mono">{row.phone}</p>
          <p className="text-[11px] text-slate-500">{row.email}</p>
        </div>
      )
    },
    {
      header: 'Experience',
      render: (row) => (
        <span className="text-xs font-medium text-slate-700">
          {row.experienceYears} Years
        </span>
      )
    },
    {
      header: 'Monthly Pay',
      render: (row) => (
        <span className="text-xs font-semibold text-slate-900">
          {formatCurrency(row.salaryMonthly)}
        </span>
      )
    },
    {
      header: 'Actions',
      className: 'text-right',
      render: (row) => (
        <div className="flex items-center justify-end gap-1">
          <button
            onClick={() => setSelectedStaff(row)}
            className="p-1 rounded text-slate-500 hover:text-blue-700 hover:bg-slate-100"
            title="View Profile"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIdCardStaff(row)}
            className="p-1 rounded text-slate-500 hover:text-blue-700 hover:bg-slate-100"
            title="Print Staff ID Card"
          >
            <Printer className="w-4 h-4" />
          </button>
          <button
            onClick={() => setEditStaff({ ...row })}
            className="p-1 rounded text-slate-500 hover:text-amber-700 hover:bg-slate-100"
            title="Edit Details"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setStaffToDelete(row)}
            className="p-1 rounded text-slate-400 hover:text-rose-700 hover:bg-slate-100"
            title="Relieve Member"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Faculty & Staff Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Teaching faculty, administrative officials, and operational staff directory.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-md transition shadow-xs"
        >
          <UserPlus className="w-4 h-4" />
          <span>Appoint Staff Member</span>
        </button>
      </div>

      {/* Department Filter Buttons */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {departments.map((dept) => (
          <button
            key={dept}
            onClick={() => setDeptFilter(dept)}
            className={`px-3 py-1.5 rounded-md border font-medium transition shrink-0 ${
              deptFilter === dept
                ? 'bg-blue-900 text-white border-blue-900'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {dept}
          </button>
        ))}
      </div>

      {/* Staff Table */}
      <DataTable
        columns={columns}
        data={filteredStaff}
        searchPlaceholder="Search staff by name, code, designation, department..."
        searchKeys={['fullName', 'employeeCode', 'designation', 'department', 'qualification']}
        exportFilename="abc_school_staff_roster_2026"
      />

      {/* Staff Profile Modal */}
      {selectedStaff && (
        <Modal
          isOpen={!!selectedStaff}
          onClose={() => setSelectedStaff(null)}
          title={`Staff Profile — ${selectedStaff.fullName}`}
          subtitle={`${selectedStaff.designation} (${selectedStaff.employeeCode})`}
          maxWidth="max-w-xl"
        >
          <div className="space-y-4 text-xs">
            <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-md">
              <div className="w-12 h-12 bg-slate-900 text-white rounded-md flex items-center justify-center font-bold text-lg">
                {selectedStaff.fullName.substring(0, 2).toUpperCase()}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-900 text-sm">{selectedStaff.fullName}</h3>
                <p className="text-slate-500">{selectedStaff.designation} • {selectedStaff.department}</p>
                <p className="text-slate-600 mt-0.5">{selectedStaff.qualification}</p>
              </div>
              <div>
                <Badge variant="success">Active</Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-slate-700">
              <div className="border border-slate-200 p-2.5 rounded-md space-y-1">
                <p><span className="text-slate-500">Contact Phone:</span> <span className="font-mono font-medium">{selectedStaff.phone}</span></p>
                <p><span className="text-slate-500">Official Email:</span> {selectedStaff.email}</p>
                <p><span className="text-slate-500">Blood Group:</span> {selectedStaff.bloodGroup || 'O+'}</p>
                <p><span className="text-slate-500">Residential Address:</span> {selectedStaff.address}</p>
              </div>

              <div className="border border-slate-200 p-2.5 rounded-md space-y-1">
                <p><span className="text-slate-500">Date of Joining:</span> {formatDate(selectedStaff.joiningDate)}</p>
                <p><span className="text-slate-500">Total Experience:</span> {selectedStaff.experienceYears} Years</p>
                <p><span className="text-slate-500">Gross Monthly Salary:</span> <span className="font-semibold text-slate-900">{formatCurrency(selectedStaff.salaryMonthly)}</span></p>
              </div>
            </div>

            {selectedStaff.assignedSubjects && selectedStaff.assignedSubjects.length > 0 && (
              <div className="p-3 border border-slate-200 rounded-md bg-slate-50">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-1.5">
                  Assigned Classes & Subjects
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedStaff.assignedSubjects.map((sub, i) => (
                    <span key={i} className="px-2 py-0.5 bg-blue-100 text-blue-900 border border-blue-200 rounded text-xs font-medium">
                      {sub}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => {
                  const st = selectedStaff;
                  setSelectedStaff(null);
                  setIdCardStaff(st);
                }}
                className="px-3 py-1.5 text-xs font-medium text-slate-700 border border-slate-300 rounded hover:bg-slate-50"
              >
                Print Staff ID Card
              </button>
              <button
                type="button"
                onClick={() => setSelectedStaff(null)}
                className="px-4 py-1.5 text-xs font-semibold bg-blue-700 text-white rounded hover:bg-blue-800"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Edit Staff Modal */}
      {editStaff && (
        <Modal
          isOpen={!!editStaff}
          onClose={() => setEditStaff(null)}
          title={`Edit Staff Record — ${editStaff.fullName}`}
          maxWidth="max-w-xl"
        >
          <form onSubmit={handleEditSubmit} className="space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={editStaff.fullName}
                  onChange={(e) => setEditStaff({ ...editStaff, fullName: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs"
                />
              </div>
              <div>
                <label className="block font-medium text-slate-700 mb-1">Designation</label>
                <input
                  type="text"
                  required
                  value={editStaff.designation}
                  onChange={(e) => setEditStaff({ ...editStaff, designation: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs"
                />
              </div>
              <div>
                <label className="block font-medium text-slate-700 mb-1">Department</label>
                <input
                  type="text"
                  value={editStaff.department}
                  onChange={(e) => setEditStaff({ ...editStaff, department: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs"
                />
              </div>
              <div>
                <label className="block font-medium text-slate-700 mb-1">Phone</label>
                <input
                  type="text"
                  value={editStaff.phone}
                  onChange={(e) => setEditStaff({ ...editStaff, phone: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs"
                />
              </div>
              <div>
                <label className="block font-medium text-slate-700 mb-1">Gross Salary (₹/month)</label>
                <input
                  type="number"
                  value={editStaff.salaryMonthly}
                  onChange={(e) => setEditStaff({ ...editStaff, salaryMonthly: Number(e.target.value) })}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs"
                />
              </div>
              <div>
                <label className="block font-medium text-slate-700 mb-1">Experience (Years)</label>
                <input
                  type="number"
                  value={editStaff.experienceYears}
                  onChange={(e) => setEditStaff({ ...editStaff, experienceYears: Number(e.target.value) })}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setEditStaff(null)}
                className="px-3 py-1.5 border border-slate-300 rounded text-slate-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-blue-700 text-white font-semibold rounded hover:bg-blue-800"
              >
                Save Staff Record
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Add Staff Modal */}
      {showAddModal && (
        <Modal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          title="Appoint New Faculty / Staff Member"
          maxWidth="max-w-2xl"
        >
          <form onSubmit={handleCreateStaff} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleFormChange}
                  placeholder="e.g. Mohammad Shafi Mir"
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Designation *</label>
                <input
                  type="text"
                  required
                  name="designation"
                  value={formData.designation}
                  onChange={handleFormChange}
                  placeholder="e.g. Senior PGT Physics"
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Department</label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleFormChange}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md bg-white text-xs"
                >
                  <option value="Science">Science</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Languages">Languages</option>
                  <option value="Administration">Administration</option>
                  <option value="Accounts & Finance">Accounts & Finance</option>
                  <option value="Library & Information">Library & Information</option>
                  <option value="Transport Operations">Transport Operations</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Qualification *</label>
                <input
                  type="text"
                  required
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleFormChange}
                  placeholder="e.g. M.Sc. Physics, B.Ed."
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Contact Phone (+91) *</label>
                <input
                  type="tel"
                  required
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  placeholder="+91 94190 XXXXX"
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Official Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  placeholder="faculty@abcschool.edu.in"
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Gross Salary (₹/month)</label>
                <input
                  type="number"
                  name="salaryMonthly"
                  value={formData.salaryMonthly}
                  onChange={handleFormChange}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Experience (Years)</label>
                <input
                  type="number"
                  name="experienceYears"
                  value={formData.experienceYears}
                  onChange={handleFormChange}
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
                Appoint Staff Member
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Staff ID Card Modal */}
      {idCardStaff && (
        <IdCardModal
          isOpen={!!idCardStaff}
          onClose={() => setIdCardStaff(null)}
          person={idCardStaff}
          type="staff"
        />
      )}

      {/* Delete / Relieve Dialog */}
      {staffToDelete && (
        <ConfirmDialog
          isOpen={!!staffToDelete}
          onClose={() => setStaffToDelete(null)}
          onConfirm={() => deleteStaff(staffToDelete.id)}
          title="Relieve Staff Member"
          message={`Are you sure you want to relieve ${staffToDelete.fullName} (${staffToDelete.employeeCode})?`}
          confirmText="Relieve Member"
        />
      )}
    </div>
  );
}
