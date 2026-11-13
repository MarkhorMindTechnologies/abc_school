import React, { useState } from 'react';
import { 
  Award, Plus, FileText, CheckCircle, Printer, 
  Calendar, Search, Filter, Download, ArrowUpRight 
} from 'lucide-react';
import DataTable from '../components/common/DataTable';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';
import ReportCardModal from '../components/common/ReportCardModal';
import { useSchool } from '../context/SchoolContext';
import { formatDate, calculateGrade } from '../utils/formatters';

export default function ExaminationsPage() {
  const { exams, marks, students, classes, subjects, schoolInfo } = useSchool();
  const [activeTab, setActiveTab] = useState('reportCards');
  const [selectedExam, setSelectedExam] = useState(exams[1] ? exams[1].id : exams[0]?.id);
  const [selectedClass, setSelectedClass] = useState('Class 10-A');
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');
  const [reportCardData, setReportCardData] = useState(null);
  const [showCreateExamModal, setShowCreateExamModal] = useState(false);

  // New Exam Form
  const [newExamData, setNewExamData] = useState({
    title: 'Unit Test 2 (March 2026)',
    session: '2026–2027',
    startDate: '2026-03-12',
    endDate: '2026-03-20',
    totalMarks: 50,
    passPercentage: 33
  });

  // Marks Entry state for selected exam & class
  const [entryScores, setEntryScores] = useState({
    'STU-001': { theory: 76, practical: 20 },
    'STU-002': { theory: 78, practical: 19 },
    'STU-003': { theory: 55, practical: 17 },
    'STU-004': { theory: 74, practical: 20 }
  });

  const handleScoreChange = (studentId, field, val) => {
    const num = Math.min(80, Math.max(0, Number(val) || 0));
    setEntryScores(prev => ({
      ...prev,
      [studentId]: {
        ...(prev[studentId] || { theory: 0, practical: 0 }),
        [field]: num
      }
    }));
  };

  const handleSaveMarks = () => {
    alert(`Marks for ${selectedSubject} (${selectedClass}) successfully saved to CBSE Examination Cell database!`);
  };

  const handleCreateExam = (e) => {
    e.preventDefault();
    alert(`Examination '${newExamData.title}' scheduled successfully!`);
    setShowCreateExamModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Examinations & Student Performance</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Exam schedules, subject-wise marks entry, CBSE 9-point grading, and printable report cards.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowCreateExamModal(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-md transition shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Schedule New Examination</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('reportCards')}
          className={`px-4 py-2.5 border-b-2 transition ${
            activeTab === 'reportCards'
              ? 'border-blue-700 text-blue-700 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Student Progress Report Cards ({marks.length})
        </button>
        <button
          onClick={() => setActiveTab('marksEntry')}
          className={`px-4 py-2.5 border-b-2 transition ${
            activeTab === 'marksEntry'
              ? 'border-blue-700 text-blue-700 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Subject Marks Entry Sheet
        </button>
        <button
          onClick={() => setActiveTab('schedules')}
          className={`px-4 py-2.5 border-b-2 transition ${
            activeTab === 'schedules'
              ? 'border-blue-700 text-blue-700 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Examination Schedules ({exams.length})
        </button>
      </div>

      {/* Tab 1: Student Report Cards List */}
      {activeTab === 'reportCards' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {marks.map((mRecord) => {
              const matchedStudent = students.find(s => s.id === mRecord.studentId);
              return (
                <div key={mRecord.studentId} className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs hover:border-slate-300 transition space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">{mRecord.studentName}</h3>
                      <p className="text-xs text-slate-500">{mRecord.className}</p>
                    </div>
                    <Badge variant={mRecord.overallGrade === 'A1' ? 'success' : 'primary'}>
                      Grade: {mRecord.overallGrade}
                    </Badge>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-md border border-slate-100 grid grid-cols-3 gap-2 text-center text-xs">
                    <div>
                      <p className="text-slate-500 text-[10px]">Total Score</p>
                      <p className="font-bold text-slate-900">{mRecord.totalObtained}/{mRecord.maxTotal}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 text-[10px]">Percentage</p>
                      <p className="font-bold text-emerald-700">{mRecord.percentage}%</p>
                    </div>
                    <div>
                      <p className="text-slate-500 text-[10px]">Class Rank</p>
                      <p className="font-bold text-blue-800">#{mRecord.classRank}</p>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 font-medium">CBSE Pre-Board 2026</span>
                    <button
                      type="button"
                      onClick={() => setReportCardData({ marks: mRecord, student: matchedStudent })}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>View Marksheet</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Marks Entry Sheet */}
      {activeTab === 'marksEntry' && (
        <div className="bg-white rounded-lg border border-slate-200 shadow-xs p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <div>
                <span className="font-medium text-slate-700 mr-1.5">Exam:</span>
                <select
                  value={selectedExam}
                  onChange={(e) => setSelectedExam(e.target.value)}
                  className="px-3 py-1.5 border border-slate-300 rounded-md bg-white font-medium text-slate-800"
                >
                  {exams.map(e => <option key={e.id} value={e.id}>{e.title}</option>)}
                </select>
              </div>

              <div>
                <span className="font-medium text-slate-700 mr-1.5">Class:</span>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="px-3 py-1.5 border border-slate-300 rounded-md bg-white font-medium text-slate-800"
                >
                  <option value="Class 10-A">Class 10-A</option>
                  <option value="Class 10-B">Class 10-B</option>
                  <option value="Class 12-A">Class 12-A (Science)</option>
                </select>
              </div>

              <div>
                <span className="font-medium text-slate-700 mr-1.5">Subject:</span>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="px-3 py-1.5 border border-slate-300 rounded-md bg-white font-medium text-slate-800"
                >
                  <option value="Mathematics">Mathematics (MTH101)</option>
                  <option value="Physics">Physics (PHY101)</option>
                  <option value="General English">General English (ENG101)</option>
                  <option value="Integrated Science">Integrated Science (SCI101)</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleSaveMarks}
              className="px-4 py-1.5 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-md transition"
            >
              Save Marks Broadsheet
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="p-3">Roll No</th>
                  <th className="p-3">Student Name</th>
                  <th className="p-3">Admission No</th>
                  <th className="p-3 w-32">Theory (Max 80)</th>
                  <th className="p-3 w-32">Internal/Practical (Max 20)</th>
                  <th className="p-3 text-center w-24">Total (100)</th>
                  <th className="p-3 text-center w-20">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {students.slice(0, 5).map((st) => {
                  const score = entryScores[st.id] || { theory: 70, practical: 18 };
                  const total = score.theory + score.practical;
                  const gradeObj = calculateGrade(total, 100);

                  return (
                    <tr key={st.id} className="hover:bg-slate-50 transition">
                      <td className="p-3 font-mono font-bold text-slate-800">{st.rollNo || '1001'}</td>
                      <td className="p-3 font-bold text-slate-900">{st.fullName}</td>
                      <td className="p-3 font-mono text-slate-500">{st.admissionNo}</td>
                      <td className="p-3">
                        <input
                          type="number"
                          max={80}
                          min={0}
                          value={score.theory}
                          onChange={(e) => handleScoreChange(st.id, 'theory', e.target.value)}
                          className="w-20 px-2 py-1 border border-slate-300 rounded font-semibold text-slate-900"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          type="number"
                          max={20}
                          min={0}
                          value={score.practical}
                          onChange={(e) => handleScoreChange(st.id, 'practical', e.target.value)}
                          className="w-20 px-2 py-1 border border-slate-300 rounded font-semibold text-slate-900"
                        />
                      </td>
                      <td className="p-3 text-center font-bold text-blue-900 text-sm">{total}</td>
                      <td className="p-3 text-center">
                        <Badge variant={gradeObj.grade.startsWith('A') ? 'success' : 'primary'}>
                          {gradeObj.grade}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Schedules */}
      {activeTab === 'schedules' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {exams.map((ex) => (
            <div key={ex.id} className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{ex.title}</h3>
                  <p className="text-xs text-slate-500">Session {ex.session}</p>
                </div>
                <Badge variant={ex.status === 'Completed' ? 'success' : 'primary'}>{ex.status}</Badge>
              </div>

              <div className="text-xs space-y-1.5 text-slate-600 pt-2 border-t border-slate-100">
                <p><span className="font-medium text-slate-800">Timeline:</span> {formatDate(ex.startDate)} to {formatDate(ex.endDate)}</p>
                <p><span className="font-medium text-slate-800">Total Marks:</span> {ex.totalMarksPerSubject} per subject</p>
                <p><span className="font-medium text-slate-800">Pass Criteria:</span> {ex.passPercentage}%</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Printable Report Card Modal */}
      {reportCardData && (
        <ReportCardModal
          isOpen={!!reportCardData}
          onClose={() => setReportCardData(null)}
          student={reportCardData.student}
          marksRecord={reportCardData.marks}
        />
      )}

      {/* Create Exam Modal */}
      {showCreateExamModal && (
        <Modal
          isOpen={showCreateExamModal}
          onClose={() => setShowCreateExamModal(false)}
          title="Schedule New Examination"
          maxWidth="max-w-md"
        >
          <form onSubmit={handleCreateExam} className="space-y-3 text-xs">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Examination Title *</label>
              <input
                type="text"
                required
                value={newExamData.title}
                onChange={(e) => setNewExamData({ ...newExamData, title: e.target.value })}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Start Date</label>
                <input
                  type="date"
                  value={newExamData.startDate}
                  onChange={(e) => setNewExamData({ ...newExamData, startDate: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">End Date</label>
                <input
                  type="date"
                  value={newExamData.endDate}
                  onChange={(e) => setNewExamData({ ...newExamData, endDate: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setShowCreateExamModal(false)}
                className="px-3 py-1.5 border border-slate-300 rounded text-slate-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-blue-700 text-white font-semibold rounded hover:bg-blue-800"
              >
                Schedule Exam
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
