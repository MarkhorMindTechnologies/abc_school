import React, { useState } from 'react';
import { 
  GraduationCap, Calendar, Clock, BookOpen, Award, 
  Library, FileText, CheckCircle, Download, Upload, AlertCircle 
} from 'lucide-react';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';
import ReportCardModal from '../components/common/ReportCardModal';
import { useSchool } from '../context/SchoolContext';
import { formatDate } from '../utils/formatters';

export default function StudentPortalPage() {
  const { students, marks, homework, bookIssues, schoolInfo } = useSchool();
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [submitModalHw, setSubmitModalHw] = useState(null);
  const [submissionNotes, setSubmissionNotes] = useState('');

  // Default active student persona
  const student = students[0];
  const studentMarks = marks.find(m => m.studentId === student.id) || marks[0];
  const studentHw = homework.filter(h => h.className === student.className);
  const studentBooks = bookIssues.filter(b => b.studentId === student.id);

  const handleSubmitHomework = (e) => {
    e.preventDefault();
    alert(`Homework for ${submitModalHw.subject} submitted successfully to ${submitModalHw.teacherName}!`);
    setSubmitModalHw(null);
    setSubmissionNotes('');
  };

  return (
    <div className="space-y-6">
      {/* Header Profile Banner */}
      <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-lg bg-blue-900 text-white flex items-center justify-center font-bold text-xl">
            {student.fullName.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">{student.fullName}</h1>
              <Badge variant="primary">{student.className} - {student.section}</Badge>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Admission No: <span className="font-mono font-medium text-slate-800">{student.admissionNo}</span> • Roll No: {student.rollNo} • Blood Group: {student.bloodGroup}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setReportModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-md transition shadow-xs"
          >
            <Award className="w-4 h-4" />
            <span>View CBSE Report Card</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Attendance Rate</p>
          <p className="text-2xl font-bold text-emerald-700 mt-1">{student.attendanceRate}%</p>
          <p className="text-[11px] text-slate-400 mt-1">Excellent punctuality</p>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Term Exam Rank</p>
          <p className="text-2xl font-bold text-blue-900 mt-1">Rank #{studentMarks.classRank}</p>
          <p className="text-[11px] text-slate-400 mt-1">{studentMarks.percentage}% Score (Grade {studentMarks.overallGrade})</p>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Pending Assignments</p>
          <p className="text-2xl font-bold text-amber-700 mt-1">{studentHw.length} Tasks</p>
          <p className="text-[11px] text-slate-400 mt-1">All deadlines within this week</p>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Books Borrowed</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{studentBooks.length} Book</p>
          <p className="text-[11px] text-slate-400 mt-1">From Central Campus Library</p>
        </div>
      </div>

      {/* Two Column Grid: Today's Schedule & Homework */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Homework due */}
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Current Assigned Homework & Tasks</h3>
              <p className="text-xs text-slate-500">Submit homework files and notes before deadline</p>
            </div>
            <span className="text-xs font-bold text-blue-700">{studentHw.length} Active</span>
          </div>

          <div className="space-y-3">
            {studentHw.map((hw) => (
              <div key={hw.id} className="p-3 bg-slate-50 rounded-md border border-slate-200 space-y-2 text-xs">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-bold text-blue-900">{hw.subject}</span>
                    <h4 className="font-semibold text-slate-900 text-xs mt-0.5">{hw.title}</h4>
                  </div>
                  <Badge variant="warning">Due {formatDate(hw.dueDate)}</Badge>
                </div>
                <p className="text-[11px] text-slate-600 line-clamp-2">{hw.instructions}</p>
                <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-[11px]">
                  <span className="text-slate-500">Teacher: {hw.teacherName}</span>
                  <button
                    onClick={() => setSubmitModalHw(hw)}
                    className="inline-flex items-center gap-1 font-semibold text-blue-700 hover:text-blue-900"
                  >
                    <Upload className="w-3 h-3" />
                    <span>Submit Work</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Today's Class Schedule ({student.className}-A)</h3>
              <p className="text-xs text-slate-500">Room 204 • Class Incharge: Mrs. Sunita Raina</p>
            </div>
            <span className="text-xs font-bold text-emerald-700">In Progress</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-3 bg-slate-50 rounded-md border border-slate-200 flex justify-between items-center">
              <div>
                <p className="font-bold text-slate-900">Period 1 (09:00 - 09:45 AM)</p>
                <p className="text-slate-600">Mathematics • Mrs. Sunita Raina</p>
              </div>
              <span className="font-mono text-slate-500">Room 204</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-md border border-slate-200 flex justify-between items-center">
              <div>
                <p className="font-bold text-slate-900">Period 2 (09:45 - 10:30 AM)</p>
                <p className="text-slate-600">Science (Physics) • Mr. Tariq Ahmad Lone</p>
              </div>
              <span className="font-mono text-slate-500">Science Lab A</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-md border border-slate-200 flex justify-between items-center">
              <div>
                <p className="font-bold text-slate-900">Period 3 (10:30 - 11:15 AM)</p>
                <p className="text-slate-600">General English • Ms. Neha Gupta</p>
              </div>
              <span className="font-mono text-slate-500">Room 204</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-md border border-slate-200 flex justify-between items-center">
              <div>
                <p className="font-bold text-slate-900">Period 4 (11:15 - 12:00 PM)</p>
                <p className="text-slate-600">Social Science • Mr. Javaid Iqbal</p>
              </div>
              <span className="font-mono text-slate-500">Room 204</span>
            </div>
          </div>
        </div>

      </div>

      {/* Library Books Issued */}
      <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-3">
        <h3 className="text-sm font-bold text-slate-900">Books Borrowed from Campus Central Library</h3>
        <div className="divide-y divide-slate-100">
          {studentBooks.map((b) => (
            <div key={b.id} className="py-2.5 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-slate-900">{b.bookTitle}</p>
                <p className="text-[11px] text-slate-500">Issue Date: {formatDate(b.issueDate)} • Due Date: {formatDate(b.dueDate)}</p>
              </div>
              <Badge variant={b.status === 'Issued' ? 'primary' : 'danger'}>
                {b.status}
              </Badge>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Homework Modal */}
      {submitModalHw && (
        <Modal
          isOpen={!!submitModalHw}
          onClose={() => setSubmitModalHw(null)}
          title={`Submit Homework — ${submitModalHw.title}`}
          maxWidth="max-w-md"
        >
          <form onSubmit={handleSubmitHomework} className="space-y-3 text-xs">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Upload Homework PDF / Photos</label>
              <input type="file" className="w-full text-xs border border-slate-300 p-2 rounded bg-slate-50" />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Student Comments / Doubts</label>
              <textarea
                rows={3}
                value={submissionNotes}
                onChange={(e) => setSubmissionNotes(e.target.value)}
                placeholder="Mention solved exercise numbers or specific questions you need help with..."
                className="w-full px-3 py-1.5 border border-slate-300 rounded text-xs"
              />
            </div>
            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
              <button type="button" onClick={() => setSubmitModalHw(null)} className="px-3 py-1.5 border border-slate-300 rounded text-slate-700">Cancel</button>
              <button type="submit" className="px-4 py-1.5 bg-blue-700 text-white font-semibold rounded hover:bg-blue-800">Submit to Teacher</button>
            </div>
          </form>
        </Modal>
      )}

      {/* Report Card Modal */}
      {reportModalOpen && (
        <ReportCardModal
          isOpen={reportModalOpen}
          onClose={() => setReportModalOpen(false)}
          student={student}
          marksRecord={studentMarks}
        />
      )}
    </div>
  );
}
