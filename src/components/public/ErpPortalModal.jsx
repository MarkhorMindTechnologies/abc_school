import React, { useState } from 'react';
import { X, Lock, Shield, User, Key, CheckCircle, ExternalLink } from 'lucide-react';
import { schoolData } from '../../data/websiteData';

export default function ErpPortalModal({ isOpen, onClose }) {
  const [activePortal, setActivePortal] = useState('student');
  const [username, setUsername] = useState('ABC/2026/0101');
  const [password, setPassword] = useState('••••••••');
  const [simulatedMessage, setSimulatedMessage] = useState(false);

  if (!isOpen) return null;

  const handleSimulateLogin = (e) => {
    e.preventDefault();
    setSimulatedMessage(true);
    setTimeout(() => {
      setSimulatedMessage(false);
      onClose();
    }, 2500);
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
          className="relative w-full max-w-md bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden text-slate-800 animate-in fade-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-slate-900 text-white p-5 sm:p-6 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center font-black text-white text-sm shadow-xs">
                ERP
              </div>
              <div>
                <h3 className="font-bold text-base sm:text-lg font-serif">ABC School ERP Gateway</h3>
                <p className="text-xs text-slate-300">Single Sign-On (SSO) Enterprise Portal</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Portal Role Tabs */}
          <div className="flex border-b border-slate-200 text-sm font-semibold bg-slate-50">
            <button
              onClick={() => { setActivePortal('student'); setUsername('ABC/2026/0101'); }}
              className={`flex-1 py-3 text-center border-b-2 transition cursor-pointer ${
                activePortal === 'student' ? 'border-blue-700 text-blue-900 bg-white font-bold' : 'text-slate-500 border-transparent hover:text-slate-800'
              }`}
            >
              Student / Parent
            </button>
            <button
              onClick={() => { setActivePortal('faculty'); setUsername('EMP-102'); }}
              className={`flex-1 py-3 text-center border-b-2 transition cursor-pointer ${
                activePortal === 'faculty' ? 'border-blue-700 text-blue-900 bg-white font-bold' : 'text-slate-500 border-transparent hover:text-slate-800'
              }`}
            >
              Faculty
            </button>
            <button
              onClick={() => { setActivePortal('admin'); setUsername('ADMIN-01'); }}
              className={`flex-1 py-3 text-center border-b-2 transition cursor-pointer ${
                activePortal === 'admin' ? 'border-blue-700 text-blue-900 bg-white font-bold' : 'text-slate-500 border-transparent hover:text-slate-800'
              }`}
            >
              Administration
            </button>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-7 space-y-4">
            <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-lg text-blue-950 text-xs sm:text-sm leading-relaxed">
              <span className="font-bold">ERP Integration Gateway:</span> This public website is structured for Single-Sign-On (SSO) integration with the institutional ABC ERP Cloud.
            </div>

            {simulatedMessage ? (
              <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2.5">
                <CheckCircle className="w-9 h-9 text-emerald-600 mx-auto" />
                <p className="font-bold text-slate-900 text-base">ERP Authentication Successful!</p>
                <p className="text-sm text-slate-600">Connecting to {activePortal.toUpperCase()} Portal session...</p>
              </div>
            ) : (
              <form onSubmit={handleSimulateLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                    {activePortal === 'student' ? 'Admission / Roll Number' : 'Institutional Employee ID'}
                  </label>
                  <div className="relative">
                    <User className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-11 pr-3.5 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-900 font-mono focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-1.5">Security Password</label>
                  <div className="relative">
                    <Key className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-11 pr-3.5 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs sm:text-sm text-slate-600 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded border-slate-300 text-blue-800" />
                    <span>Remember terminal</span>
                  </label>
                  <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Please contact the School IT Desk for credential reset.'); }} className="text-blue-700 font-medium hover:underline">
                    Forgot Password?
                  </a>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-blue-800 hover:bg-blue-900 text-white font-bold uppercase tracking-wider rounded-lg transition shadow-md text-sm mt-2 cursor-pointer"
                >
                  Access Secure Portal
                </button>
              </form>
            )}

            <div className="pt-3 border-t border-slate-100 text-center text-xs text-slate-400">
              Encrypted with TLS 1.3 256-Bit SSL • ABC Public School IT Cell
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
