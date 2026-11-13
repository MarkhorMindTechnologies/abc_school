import React, { useState } from 'react';
import { X, CheckCircle, FileText, Calendar, Phone, ArrowRight } from 'lucide-react';
import { schoolData } from '../../data/websiteData';

export default function AdmissionModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    studentName: '',
    gender: 'Male',
    appliedClass: 'Class 9',
    dob: '2012-05-10',
    fatherName: '',
    fatherMobile: '',
    parentEmail: '',
    previousSchool: '',
    previousPercentage: '',
    residentialArea: 'Srinagar, J&K'
  });

  const [submittedData, setSubmittedData] = useState(null);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.studentName || !formData.fatherName || !formData.fatherMobile) {
      alert('Please fill out all mandatory fields.');
      return;
    }
    const appNum = `ABC/2026/ENQ-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedData({
      ...formData,
      appNum,
      submissionTimestamp: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    });
  };

  const handleReset = () => {
    setSubmittedData(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-xs transition-opacity" 
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
        <div 
          className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden text-slate-800 animate-in fade-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-slate-900 text-white p-5 sm:p-6 flex items-center justify-between border-b border-slate-800">
            <div>
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
                Academic Session {schoolData.activeSession}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-white mt-1">
                Online Admission Enquiry & Registration
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Form or Confirmation View */}
          <div className="p-6 sm:p-8">
            {!submittedData ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <p className="text-sm text-slate-600 leading-relaxed">
                  Please complete the preliminary candidate registration form below. Our admissions coordination office will review your application and initiate contact within 2 business days.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                      Applicant Student Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      name="studentName"
                      value={formData.studentName}
                      onChange={handleChange}
                      placeholder="e.g. Zaid Bashir"
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                      Applying for Class *
                    </label>
                    <select
                      name="appliedClass"
                      value={formData.appliedClass}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg bg-white text-sm text-slate-900 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-hidden"
                    >
                      <option value="Nursery">Nursery (Pre-Primary)</option>
                      <option value="LKG">LKG</option>
                      <option value="UKG">UKG</option>
                      <option value="Class 1">Class 1</option>
                      <option value="Class 2">Class 2</option>
                      <option value="Class 3">Class 3</option>
                      <option value="Class 4">Class 4</option>
                      <option value="Class 5">Class 5</option>
                      <option value="Class 6">Class 6</option>
                      <option value="Class 7">Class 7</option>
                      <option value="Class 8">Class 8</option>
                      <option value="Class 9">Class 9</option>
                      <option value="Class 10">Class 10</option>
                      <option value="Class 11 (Science)">Class 11 (Science Stream)</option>
                      <option value="Class 11 (Commerce)">Class 11 (Commerce Stream)</option>
                      <option value="Class 11 (Humanities)">Class 11 (Humanities Stream)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      required
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                      Gender *
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg bg-white text-sm text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                      Father / Guardian Name *
                    </label>
                    <input
                      type="text"
                      required
                      name="fatherName"
                      value={formData.fatherName}
                      onChange={handleChange}
                      placeholder="e.g. Bashir Ahmad Dar"
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                      Guardian Mobile (+91) *
                    </label>
                    <input
                      type="tel"
                      required
                      name="fatherMobile"
                      value={formData.fatherMobile}
                      onChange={handleChange}
                      placeholder="+91 94190 XXXXX"
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm font-mono text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                      Guardian Email
                    </label>
                    <input
                      type="email"
                      name="parentEmail"
                      value={formData.parentEmail}
                      onChange={handleChange}
                      placeholder="parent@example.com"
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                      Prior School & Score (%)
                    </label>
                    <input
                      type="text"
                      name="previousSchool"
                      value={formData.previousSchool}
                      onChange={handleChange}
                      placeholder="e.g. Burn Hall School (89%)"
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                    Residential Address
                  </label>
                  <input
                    type="text"
                    name="residentialArea"
                    value={formData.residentialArea}
                    onChange={handleChange}
                    placeholder="e.g. Rajbagh / Sanat Nagar, Srinagar"
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                  />
                </div>

                <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 text-sm font-bold uppercase tracking-wider text-white bg-blue-800 hover:bg-blue-900 rounded-lg transition shadow-md cursor-pointer"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            ) : (
              /* Success Confirmation */
              <div className="space-y-5">
                <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-950 flex items-start gap-4">
                  <CheckCircle className="w-7 h-7 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-base">Application Successfully Registered!</h4>
                    <p className="mt-1 text-sm text-emerald-800">
                      Your admission enquiry has been logged into ABC Public School Admissions Registry.
                    </p>
                  </div>
                </div>

                <div className="border border-slate-200 p-5 rounded-xl bg-slate-50 space-y-3 text-sm">
                  <div className="flex justify-between border-b border-slate-200 pb-2.5">
                    <span className="text-slate-600">Application Reference Number:</span>
                    <span className="font-mono font-bold text-blue-900 text-base">{submittedData.appNum}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Candidate Name:</span>
                    <span className="font-bold text-slate-900">{submittedData.studentName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Class Applied:</span>
                    <span className="font-semibold text-slate-800">{submittedData.appliedClass}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Guardian Mobile:</span>
                    <span className="font-mono font-medium text-slate-800">{submittedData.fatherMobile}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Registration Date:</span>
                    <span className="font-medium text-slate-800">{submittedData.submissionTimestamp}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed italic">
                  Note: Please quote your Application Reference Number during your campus visit. The admissions office will contact you to schedule the candidate diagnostic interaction.
                </p>

                <div className="pt-4 border-t border-slate-200 flex justify-end">
                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 bg-slate-900 text-white font-semibold text-sm rounded-lg hover:bg-slate-800 transition cursor-pointer"
                  >
                    Close & Return to Website
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
