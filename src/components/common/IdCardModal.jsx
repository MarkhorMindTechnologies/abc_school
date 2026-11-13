import React from 'react';
import Modal from './Modal';
import { Printer, Shield, User } from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';

export default function IdCardModal({ isOpen, onClose, person, type = 'student' }) {
  const { schoolInfo } = useSchool();

  if (!person) return null;

  const handlePrint = () => {
    window.print();
  };

  const isStudent = type === 'student';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Official ${isStudent ? 'Student' : 'Staff'} Identity Card`} maxWidth="max-w-md">
      <div className="space-y-6">
        {/* ID Card Visual */}
        <div className="w-[340px] mx-auto bg-white border-2 border-slate-800 rounded-lg overflow-hidden shadow-md print:shadow-none print:border-black">
          {/* Header */}
          <div className="bg-slate-900 text-white text-center py-2.5 px-3">
            <div className="flex items-center justify-center gap-1.5 mb-0.5">
              <Shield className="w-4 h-4 text-blue-400" />
              <span className="font-bold text-xs uppercase tracking-wider">{schoolInfo.name}</span>
            </div>
            <p className="text-[10px] text-slate-300">Airport Road, Humhama, Srinagar (J&K)</p>
          </div>

          {/* Body */}
          <div className="p-4 bg-slate-50">
            <div className="flex gap-4 items-center">
              {/* Photo Box */}
              <div className="w-24 h-28 bg-slate-200 border border-slate-300 rounded flex flex-col items-center justify-center text-slate-400 shrink-0">
                <User className="w-10 h-10 mb-1" />
                <span className="text-[9px] uppercase font-bold text-slate-500">Photo</span>
              </div>

              {/* Personal Details */}
              <div className="text-xs space-y-1 text-slate-800">
                <p className="font-bold text-sm text-slate-900">{person.fullName}</p>
                <p className="text-[11px] font-semibold text-blue-800">
                  {isStudent ? `${person.className} - Sec ${person.section}` : person.designation}
                </p>
                <div className="pt-1 text-[11px] space-y-0.5 text-slate-600">
                  <p><span className="font-medium text-slate-800">{isStudent ? 'Adm No:' : 'Emp Code:'}</span> {person.admissionNo || person.employeeCode || person.id}</p>
                  <p><span className="font-medium text-slate-800">Blood Group:</span> {person.bloodGroup || 'O+'}</p>
                  <p><span className="font-medium text-slate-800">Emergency:</span> {person.fatherPhone || person.phone || '+91 94190 12345'}</p>
                  {isStudent && <p><span className="font-medium text-slate-800">Bus Route:</span> {person.busRoute ? person.busRoute.split('(')[0] : 'Private'}</p>}
                </div>
              </div>
            </div>

            {/* Simulated Barcode */}
            <div className="mt-4 pt-3 border-t border-slate-200 text-center">
              <div className="font-mono text-[9px] tracking-widest text-slate-600 mb-0.5">
                |||||| | |||||||| |||| | |||||| |||||||
              </div>
              <p className="text-[9px] font-mono font-medium text-slate-500">
                ID: {person.admissionNo || person.employeeCode || person.id}
              </p>
            </div>
          </div>

          {/* Footer Ribbon */}
          <div className="bg-slate-800 text-[10px] text-center text-slate-300 py-1 font-medium">
            Valid Academic Session 2026–2027
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
            <span>Print ID Card</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}
