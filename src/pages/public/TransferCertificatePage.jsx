import React, { useState } from 'react';
import { Search, FileText, CheckCircle, Printer, Download, ArrowRight, X } from 'lucide-react';
import { schoolData } from '../../data/websiteData';

export default function TransferCertificatePage() {
  const [query, setQuery] = useState('');
  const [selectedTc, setSelectedTc] = useState(null);

  const sampleTCs = [
    {
      tcNo: "TC/2025-26/0142",
      admissionNo: "ABC/2020/0912",
      studentName: "Danish Ahmad Wani",
      fatherName: "Ahmad Hussain Wani",
      motherName: "Rubeena Bano",
      classLeaving: "Class 10 (Passed AISSE 2025)",
      dateOfBirth: "14 May 2009",
      dateOfIssue: "20 May 2025",
      duesCleared: "All Dues Paid in Full",
      reasonForLeaving: "Higher Secondary Admission in Srinagar",
      conduct: "Good and Exemplary"
    },
    {
      tcNo: "TC/2025-26/0143",
      admissionNo: "ABC/2022/1045",
      studentName: "Tanvi Sharma",
      fatherName: "Sunil Sharma",
      motherName: "Anita Sharma",
      classLeaving: "Class 8",
      dateOfBirth: "22 August 2011",
      dateOfIssue: "10 June 2025",
      duesCleared: "All Dues Paid in Full",
      reasonForLeaving: "Parent Job Transfer to Jammu",
      conduct: "Good"
    },
    {
      tcNo: "TC/2025-26/0144",
      admissionNo: "ABC/2019/0781",
      studentName: "Mohammad Saqib",
      fatherName: "Ghulam Nabi",
      motherName: "Haleema Bano",
      classLeaving: "Class 12 (Science Stream)",
      dateOfBirth: "05 November 2007",
      dateOfIssue: "28 May 2025",
      duesCleared: "All Dues Paid in Full",
      reasonForLeaving: "Course Completed (AISSCE Board Cleared)",
      conduct: "Exemplary"
    }
  ];

  const searchResults = query.trim() === ''
    ? sampleTCs
    : sampleTCs.filter(t => 
        t.studentName.toLowerCase().includes(query.toLowerCase()) || 
        t.admissionNo.toLowerCase().includes(query.toLowerCase()) ||
        t.tcNo.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <div className="space-y-14 sm:space-y-20 py-10 sm:py-12">
      
      {/* Title Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-14 shadow-lg border border-slate-800">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs sm:text-sm font-bold text-amber-400 uppercase tracking-widest font-mono">
              CBSE Statutory Verification
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif tracking-tight text-white">
              Transfer Certificate (TC) Verification Portal
            </h1>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-sans">
              In accordance with CBSE Bye-Laws, all school leaving and transfer certificates issued by ABC Public School can be publicly searched and authenticated online.
            </p>
          </div>
        </div>
      </section>

      {/* Search Toolbar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-7 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider">
            Search Issued Transfer Certificate
          </h2>

          <div className="flex flex-col sm:flex-row gap-3.5 max-w-2xl">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter Student Name, Admission No (e.g. ABC/2020/0912) or TC No..."
                className="w-full pl-11 pr-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-700 focus:outline-hidden"
              />
            </div>
            <button
              onClick={() => {}}
              className="px-6 py-2.5 bg-blue-800 text-white font-bold text-sm uppercase tracking-wider rounded-lg hover:bg-blue-900 transition shadow-xs cursor-pointer"
            >
              Verify Certificate
            </button>
          </div>
        </div>

        {/* Results List */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden mt-8">
          <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200 text-sm font-bold text-slate-800 flex justify-between items-center">
            <span>Verified Transfer Certificates ({searchResults.length} Records)</span>
            <span className="text-emerald-700 font-semibold text-xs sm:text-sm">Institutional Digital Record</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-700 uppercase tracking-wider">
                <tr>
                  <th className="p-4 sm:p-5">TC Serial Number</th>
                  <th className="p-4 sm:p-5">Admission No</th>
                  <th className="p-4 sm:p-5">Student Name</th>
                  <th className="p-4 sm:p-5">Class Leaving</th>
                  <th className="p-4 sm:p-5">Date of Issue</th>
                  <th className="p-4 sm:p-5 text-right">Certificate Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-800">
                {searchResults.length > 0 ? (
                  searchResults.map((tc) => (
                    <tr key={tc.tcNo} className="hover:bg-slate-50 transition">
                      <td className="p-4 sm:p-5 font-mono font-bold text-blue-900">{tc.tcNo}</td>
                      <td className="p-4 sm:p-5 font-mono">{tc.admissionNo}</td>
                      <td className="p-4 sm:p-5 font-bold text-slate-900">{tc.studentName}</td>
                      <td className="p-4 sm:p-5 font-medium">{tc.classLeaving}</td>
                      <td className="p-4 sm:p-5 text-slate-600">{tc.dateOfIssue}</td>
                      <td className="p-4 sm:p-5 text-right">
                        <button
                          onClick={() => setSelectedTc(tc)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-50 text-blue-800 border border-blue-200 rounded-lg font-semibold hover:bg-blue-100 transition cursor-pointer"
                        >
                          <FileText className="w-4 h-4 text-blue-700" />
                          <span>View / Print TC</span>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="p-10 text-center text-slate-500 text-sm">
                      No issued transfer certificate found matching query "{query}".
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Official TC Modal */}
      {selectedTc && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/80 flex items-center justify-center p-4 backdrop-blur-xs"
          onClick={() => setSelectedTc(null)}
        >
          <div 
            className="bg-white rounded-xl max-w-2xl w-full p-8 sm:p-10 border-2 border-slate-800 text-slate-900 space-y-5 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center border-b-2 border-slate-800 pb-5">
              <h2 className="text-2xl font-black uppercase tracking-tight font-serif">{schoolData.name}</h2>
              <p className="text-xs sm:text-sm text-slate-700 font-medium mt-1">{schoolData.affiliation}</p>
              <p className="text-xs text-slate-500 mt-0.5">Affiliation No: {schoolData.affiliationNo} | School Code: {schoolData.schoolCode}</p>
              <p className="text-xs text-slate-500">{schoolData.address}</p>
              <div className="inline-block mt-3 px-4 py-1 bg-slate-100 border border-slate-300 rounded-md font-bold uppercase text-xs tracking-wider">
                Official School Leaving / Transfer Certificate
              </div>
            </div>

            <div className="space-y-2.5 text-sm leading-relaxed">
              <div className="flex justify-between border-b border-slate-100 pb-1.5">
                <span className="font-semibold text-slate-600">TC Certificate Number:</span>
                <span className="font-mono font-bold text-blue-900">{selectedTc.tcNo}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-1.5">
                <span className="font-semibold text-slate-600">Admission / Scholar Number:</span>
                <span className="font-mono font-bold">{selectedTc.admissionNo}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-1.5">
                <span className="font-semibold text-slate-600">Name of the Student:</span>
                <span className="font-bold text-slate-900">{selectedTc.studentName}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-1.5">
                <span className="font-semibold text-slate-600">Father / Guardian Name:</span>
                <span>{selectedTc.fatherName}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-1.5">
                <span className="font-semibold text-slate-600">Mother Name:</span>
                <span>{selectedTc.motherName}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-1.5">
                <span className="font-semibold text-slate-600">Date of Birth (in figures):</span>
                <span>{selectedTc.dateOfBirth}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-1.5">
                <span className="font-semibold text-slate-600">Class in which student last studied:</span>
                <span className="font-bold">{selectedTc.classLeaving}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-1.5">
                <span className="font-semibold text-slate-600">Dues clearance status:</span>
                <span className="text-emerald-700 font-bold">{selectedTc.duesCleared}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-1.5">
                <span className="font-semibold text-slate-600">General Conduct:</span>
                <span className="font-bold">{selectedTc.conduct}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-1.5">
                <span className="font-semibold text-slate-600">Date of Issue:</span>
                <span>{selectedTc.dateOfIssue}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 pt-8 text-center text-xs sm:text-sm text-slate-600">
              <div>
                <p className="border-t border-slate-400 pt-1.5 font-medium">Class Incharge / Office Clerk</p>
              </div>
              <div>
                <p className="border-t border-slate-400 pt-1.5 font-bold text-slate-900">Principal Signature & Seal</p>
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-3 border-t border-slate-200">
              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 bg-blue-800 text-white font-bold rounded-lg text-sm hover:bg-blue-900 inline-flex items-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Certificate</span>
              </button>
              <button
                onClick={() => setSelectedTc(null)}
                className="px-5 py-2.5 border border-slate-300 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
