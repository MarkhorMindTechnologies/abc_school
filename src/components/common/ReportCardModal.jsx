import React from 'react';
import Modal from './Modal';
import { Printer, Award, CheckCircle } from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';

export default function ReportCardModal({ isOpen, onClose, marksRecord, student }) {
  const { schoolInfo } = useSchool();

  if (!marksRecord) return null;

  const handlePrint = () => {
    window.print();
  };

  const currentStudent = student || {
    fullName: marksRecord.studentName,
    admissionNo: 'ABC/2026/0101',
    rollNo: '1001',
    className: marksRecord.className,
    fatherName: 'Parent / Guardian',
    motherName: 'Mother',
    dob: '2010-04-14'
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Academic Progress Report Card" maxWidth="max-w-3xl">
      <div className="space-y-6" id="printable-report-card">
        {/* Printable Marksheet Container */}
        <div className="border-2 border-slate-800 rounded-lg p-6 bg-white print:border-none print:p-0">
          {/* Header */}
          <div className="text-center border-b-2 border-slate-800 pb-4 mb-4">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase">{schoolInfo.name}</h1>
            <p className="text-xs font-medium text-slate-700">{schoolInfo.affiliation}</p>
            <p className="text-xs text-slate-500">Affiliation No: {schoolInfo.affiliationNo} | School Code: {schoolInfo.schoolCode}</p>
            <p className="text-xs text-slate-500">{schoolInfo.address}</p>
            <div className="inline-block mt-3 px-4 py-1 bg-slate-900 text-white rounded text-xs font-bold uppercase tracking-wider">
              Annual Student Progress Report & Marksheet (Academic Session {schoolInfo.activeSession})
            </div>
          </div>

          {/* Student Profile Info Grid */}
          <div className="grid grid-cols-3 gap-3 text-xs mb-4 p-3 bg-slate-50 rounded-md border border-slate-200">
            <div>
              <p className="text-slate-500 font-medium">Student Name:</p>
              <p className="font-bold text-slate-900 text-sm">{currentStudent.fullName}</p>
            </div>
            <div>
              <p className="text-slate-500 font-medium">Admission No:</p>
              <p className="font-bold text-slate-900">{currentStudent.admissionNo}</p>
            </div>
            <div>
              <p className="text-slate-500 font-medium">Class & Section:</p>
              <p className="font-bold text-slate-900">{marksRecord.className}</p>
            </div>
            <div>
              <p className="text-slate-500 font-medium">Roll Number:</p>
              <p className="font-bold text-slate-900">{currentStudent.rollNo || '1001'}</p>
            </div>
            <div>
              <p className="text-slate-500 font-medium">Father's Name:</p>
              <p className="font-bold text-slate-900">{currentStudent.fatherName}</p>
            </div>
            <div>
              <p className="text-slate-500 font-medium">Annual Attendance Rate:</p>
              <p className="font-bold text-emerald-700">{marksRecord.attendanceRate || currentStudent.attendanceRate || 95}%</p>
            </div>
          </div>

          {/* Scholastic Achievements Table */}
          <div className="mb-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-blue-700" />
              <span>Part 1: Scholastic Performance (CBSE 9-Point Scale)</span>
            </h3>
            <table className="w-full text-xs border border-slate-300">
              <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-300">
                <tr>
                  <th className="py-2 px-3 text-left border-r border-slate-300">Sub Code</th>
                  <th className="py-2 px-3 text-left border-r border-slate-300">Subject Description</th>
                  <th className="py-2 px-3 text-center border-r border-slate-300">Max Marks</th>
                  <th className="py-2 px-3 text-center border-r border-slate-300">Marks Obtained</th>
                  <th className="py-2 px-3 text-center border-r border-slate-300">Grade</th>
                  <th className="py-2 px-3 text-left">Subject Teacher Remark</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-800">
                {marksRecord.subjects && marksRecord.subjects.map((sub, idx) => (
                  <tr key={idx} className={idx % 2 === 1 ? 'bg-slate-50/50' : 'bg-white'}>
                    <td className="py-2 px-3 font-mono font-medium border-r border-slate-300">{sub.code || `SUB${idx+1}`}</td>
                    <td className="py-2 px-3 font-semibold border-r border-slate-300">{sub.name}</td>
                    <td className="py-2 px-3 text-center border-r border-slate-300">{sub.maxMarks}</td>
                    <td className="py-2 px-3 text-center font-bold border-r border-slate-300">{sub.marksObtained}</td>
                    <td className="py-2 px-3 text-center font-bold text-blue-800 border-r border-slate-300">{sub.grade}</td>
                    <td className="py-2 px-3 text-slate-600 italic text-[11px]">{sub.remarks || 'Satisfactory progress'}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-slate-100 font-bold border-t-2 border-slate-800 text-slate-900">
                <tr>
                  <td colSpan={2} className="py-2 px-3 text-right border-r border-slate-300">Grand Total:</td>
                  <td className="py-2 px-3 text-center border-r border-slate-300">{marksRecord.maxTotal || 500}</td>
                  <td className="py-2 px-3 text-center text-blue-900 border-r border-slate-300">{marksRecord.totalObtained}</td>
                  <td className="py-2 px-3 text-center text-blue-900 border-r border-slate-300">{marksRecord.overallGrade}</td>
                  <td className="py-2 px-3">
                    Percentage: <span className="text-emerald-700">{marksRecord.percentage}%</span> | Rank: <span className="text-blue-800">#{marksRecord.classRank || 1}</span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Part 2: Co-Scholastic & Discipline */}
          <div className="grid grid-cols-3 gap-3 mb-4 text-xs">
            <div className="border border-slate-200 p-2.5 rounded bg-slate-50">
              <p className="font-bold text-slate-800">Work Education:</p>
              <p className="text-slate-600 mt-0.5">Grade: <span className="font-bold text-blue-800">A</span> (Computer Literacy & Projects)</p>
            </div>
            <div className="border border-slate-200 p-2.5 rounded bg-slate-50">
              <p className="font-bold text-slate-800">Art Education:</p>
              <p className="text-slate-600 mt-0.5">Grade: <span className="font-bold text-blue-800">A</span> (Calligraphy & Visual Arts)</p>
            </div>
            <div className="border border-slate-200 p-2.5 rounded bg-slate-50">
              <p className="font-bold text-slate-800">Discipline & Attendance:</p>
              <p className="text-slate-600 mt-0.5">Grade: <span className="font-bold text-emerald-800">A1</span> (Exemplary Conduct)</p>
            </div>
          </div>

          {/* Teacher & Principal Remarks */}
          <div className="border border-slate-200 rounded p-3 text-xs mb-6 bg-slate-50">
            <p className="font-bold text-slate-800 mb-1">Class Teacher's Cumulative Remarks:</p>
            <p className="text-slate-700 italic">
              "{marksRecord.teacherRemarks || 'Consistent academic excellence, sincere dedication to studies and commendable participation in co-curricular activities.'}"
            </p>
            <div className="mt-2 flex items-center gap-1.5 text-emerald-700 font-bold">
              <CheckCircle className="w-4 h-4" />
              <span>Result: PROMOTED TO NEXT HIGHER CLASS</span>
            </div>
          </div>

          {/* Signatures Row */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-400 text-center text-xs text-slate-600">
            <div>
              <div className="h-10"></div>
              <p className="border-t border-slate-300 pt-1 font-semibold text-slate-800">Class Teacher Signature</p>
            </div>
            <div>
              <div className="w-20 h-10 border border-slate-300 rounded mx-auto mb-1 flex items-center justify-center text-[10px] text-slate-400 uppercase font-mono">
                Official Seal
              </div>
              <p className="border-t border-slate-300 pt-1 font-semibold text-slate-800">Examination Controller</p>
            </div>
            <div>
              <div className="h-10 flex items-center justify-center font-serif italic text-slate-700 font-bold text-sm">
                Farooq A. Mir
              </div>
              <p className="border-t border-slate-300 pt-1 font-semibold text-slate-800">Principal, ABC Public School</p>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex justify-end gap-2 no-print">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition"
          >
            Close
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-md transition"
          >
            <Printer className="w-4 h-4" />
            <span>Print Report Card</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}
