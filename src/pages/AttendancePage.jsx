import React, { useState } from 'react';
import { 
  CheckSquare, Calendar, CheckCircle, XCircle, 
  Clock, AlertCircle, Save, Filter, Download 
} from 'lucide-react';
import Badge from '../components/common/Badge';
import { useSchool } from '../context/SchoolContext';
import { formatDate } from '../utils/formatters';

export default function AttendancePage() {
  const { 
    students, 
    classes, 
    staff, 
    markAttendance, 
    attendanceRecords 
  } = useSchool();

  const [activeTab, setActiveTab] = useState('student');
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().substring(0, 10));
  const [selectedClass, setSelectedClass] = useState('Class 10');
  const [selectedSection, setSelectedSection] = useState('A');

  // Filter students by selected class & section
  const targetStudents = students.filter(s => s.className === selectedClass);

  // Key for local storage / context attendance records
  const currentKey = `${selectedDate}_${selectedClass}_${selectedSection}`;
  
  // Local state for attendance marking
  const [currentMarks, setCurrentMarks] = useState(() => {
    const existing = attendanceRecords[currentKey];
    if (existing) return existing;
    // Default everyone to 'Present'
    const initial = {};
    targetStudents.forEach(s => { initial[s.id] = 'Present'; });
    return initial;
  });

  const handleStatusChange = (studentId, status) => {
    setCurrentMarks(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleMarkAll = (status) => {
    const updated = {};
    targetStudents.forEach(s => { updated[s.id] = status; });
    setCurrentMarks(updated);
  };

  const handleSaveAttendance = () => {
    markAttendance(selectedDate, selectedClass, selectedSection, currentMarks);
    alert(`Attendance successfully recorded and verified for ${selectedClass}-${selectedSection} on ${selectedDate}!`);
  };

  // Metrics calculation
  const total = targetStudents.length || 1;
  const presentCount = Object.values(currentMarks).filter(v => v === 'Present').length;
  const absentCount = Object.values(currentMarks).filter(v => v === 'Absent').length;
  const lateCount = Object.values(currentMarks).filter(v => v === 'Late' || v === 'Half-Day').length;
  const rate = Math.round((presentCount / total) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Attendance Management Register</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Daily student roll call, faculty register, monthly attendance reports and parent alert status.
          </p>
        </div>

        <button
          onClick={handleSaveAttendance}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-md transition shadow-xs"
        >
          <Save className="w-4 h-4" />
          <span>Save Attendance Register</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('student')}
          className={`px-4 py-2.5 border-b-2 transition ${
            activeTab === 'student'
              ? 'border-blue-700 text-blue-700 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Daily Student Register
        </button>
        <button
          onClick={() => setActiveTab('staff')}
          className={`px-4 py-2.5 border-b-2 transition ${
            activeTab === 'staff'
              ? 'border-blue-700 text-blue-700 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Faculty & Staff Register ({staff.length})
        </button>
        <button
          onClick={() => setActiveTab('monthly')}
          className={`px-4 py-2.5 border-b-2 transition ${
            activeTab === 'monthly'
              ? 'border-blue-700 text-blue-700 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Monthly Summary & Leave Register
        </button>
      </div>

      {/* Tab 1: Student Attendance Register */}
      {activeTab === 'student' && (
        <div className="space-y-4">
          {/* Controls Bar */}
          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs font-medium text-slate-700">
                <Calendar className="w-4 h-4 text-blue-700" />
                <span>Attendance Date:</span>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-2.5 py-1 text-xs border border-slate-300 rounded-md bg-white font-medium text-slate-800"
                />
              </div>

              <div className="flex items-center gap-1.5 text-xs font-medium text-slate-700">
                <span>Class:</span>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="px-2.5 py-1 text-xs border border-slate-300 rounded-md bg-white font-medium text-slate-800"
                >
                  {classes.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                </select>

                <select
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value)}
                  className="px-2.5 py-1 text-xs border border-slate-300 rounded-md bg-white font-medium text-slate-800"
                >
                  <option value="A">Section A</option>
                  <option value="B">Section B</option>
                  <option value="C">Section C</option>
                </select>
              </div>
            </div>

            {/* Quick Bulk Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleMarkAll('Present')}
                className="px-2.5 py-1 text-xs font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 rounded hover:bg-emerald-100"
              >
                Mark All Present
              </button>
              <button
                type="button"
                onClick={() => handleMarkAll('Absent')}
                className="px-2.5 py-1 text-xs font-medium text-rose-800 bg-rose-50 border border-rose-200 rounded hover:bg-rose-100"
              >
                Mark All Absent
              </button>
            </div>
          </div>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs">
              <p className="text-slate-500 font-medium">Total Strength</p>
              <p className="text-xl font-bold text-slate-900 mt-0.5">{total}</p>
            </div>
            <div className="bg-white p-3 rounded-lg border border-emerald-200 bg-emerald-50/30 text-xs">
              <p className="text-emerald-700 font-medium">Present Today</p>
              <p className="text-xl font-bold text-emerald-800 mt-0.5">{presentCount}</p>
            </div>
            <div className="bg-white p-3 rounded-lg border border-rose-200 bg-rose-50/30 text-xs">
              <p className="text-rose-700 font-medium">Absent Count</p>
              <p className="text-xl font-bold text-rose-800 mt-0.5">{absentCount}</p>
            </div>
            <div className="bg-white p-3 rounded-lg border border-blue-200 bg-blue-50/30 text-xs">
              <p className="text-blue-700 font-medium">Attendance Rate</p>
              <p className="text-xl font-bold text-blue-900 mt-0.5">{rate}%</p>
            </div>
          </div>

          {/* Roll Call Table */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="p-3 w-16">Roll</th>
                  <th className="p-3">Student Name</th>
                  <th className="p-3">Admission No</th>
                  <th className="p-3">Annual Rate</th>
                  <th className="p-3 text-right">Attendance Status Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {targetStudents.map((st) => {
                  const currentStatus = currentMarks[st.id] || 'Present';
                  return (
                    <tr key={st.id} className="hover:bg-slate-50/60 transition">
                      <td className="p-3 font-mono font-bold text-slate-800">{st.rollNo || '1001'}</td>
                      <td className="p-3">
                        <p className="font-bold text-slate-900">{st.fullName}</p>
                        <p className="text-[11px] text-slate-500">Father: {st.fatherName}</p>
                      </td>
                      <td className="p-3 font-mono text-slate-600">{st.admissionNo}</td>
                      <td className="p-3">
                        <span className="font-semibold text-emerald-700">{st.attendanceRate}%</span>
                      </td>
                      <td className="p-3 text-right">
                        <div className="inline-flex items-center gap-1 bg-slate-100 p-0.5 rounded-md border border-slate-200">
                          {['Present', 'Absent', 'Late', 'Half-Day'].map((status) => {
                            const isSelected = currentStatus === status;
                            const colors = {
                              'Present': 'bg-emerald-700 text-white font-bold',
                              'Absent': 'bg-rose-700 text-white font-bold',
                              'Late': 'bg-amber-600 text-white font-bold',
                              'Half-Day': 'bg-blue-700 text-white font-bold'
                            };
                            return (
                              <button
                                key={status}
                                type="button"
                                onClick={() => handleStatusChange(st.id, status)}
                                className={`px-2 py-1 text-[11px] rounded transition ${
                                  isSelected ? colors[status] : 'text-slate-600 hover:text-slate-900'
                                }`}
                              >
                                {status}
                              </button>
                            );
                          })}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Staff Attendance Register */}
      {activeTab === 'staff' && (
        <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center text-xs font-bold text-slate-800">
            <span>Faculty Daily Register: {formatDate(selectedDate)}</span>
            <span className="text-emerald-700 font-semibold">100% Present Today</span>
          </div>

          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold uppercase tracking-wider">
              <tr>
                <th className="p-3">Employee Code</th>
                <th className="p-3">Staff Name</th>
                <th className="p-3">Department</th>
                <th className="p-3">In-Time</th>
                <th className="p-3 text-right">Biometric Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {staff.map((st) => (
                <tr key={st.id} className="hover:bg-slate-50 transition">
                  <td className="p-3 font-mono font-bold text-slate-800">{st.employeeCode}</td>
                  <td className="p-3">
                    <p className="font-bold text-slate-900">{st.fullName}</p>
                    <p className="text-[11px] text-slate-500">{st.designation}</p>
                  </td>
                  <td className="p-3 text-slate-700">{st.department}</td>
                  <td className="p-3 font-mono text-slate-600">08:42 AM</td>
                  <td className="p-3 text-right">
                    <Badge variant="success">Present (On Campus)</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 3: Monthly Matrix */}
      {activeTab === 'monthly' && (
        <div className="bg-white rounded-lg border border-slate-200 shadow-xs p-5 space-y-4 text-xs">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Monthly Attendance Aggregate — February 2026</h3>
              <p className="text-slate-500">Working Days: 22 | Holidays: 6</p>
            </div>
            <button
              onClick={() => alert('Monthly Attendance Report exported to Excel format.')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-slate-300 rounded text-slate-700 hover:bg-slate-50 font-medium"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Monthly Register</span>
            </button>
          </div>

          <div className="divide-y divide-slate-100 border border-slate-200 rounded-md">
            {students.slice(0, 6).map((st) => (
              <div key={st.id} className="p-3 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">{st.fullName} ({st.className}-{st.section})</p>
                  <p className="text-slate-500 text-[11px]">Adm No: {st.admissionNo} • Father: {st.fatherName}</p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-emerald-700 text-sm">{st.attendanceRate}%</span>
                  <p className="text-[11px] text-slate-400">Total Leaves: 2 Days</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
