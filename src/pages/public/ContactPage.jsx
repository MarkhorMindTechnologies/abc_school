import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Navigation } from 'lucide-react';
import { schoolData } from '../../data/websiteData';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    inquiryType: 'Admission Enquiry',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      alert('Please fill out all mandatory fields.');
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="space-y-14 sm:space-y-20 py-10 sm:py-12">
      
      {/* Title Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-14 shadow-lg border border-slate-800">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs sm:text-sm font-bold text-amber-400 uppercase tracking-widest font-mono">
              Get in Touch
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif tracking-tight text-white">
              Contact ABC Public School
            </h1>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-sans">
              Schedule a personalized campus visit, reach our administrative wings, or submit your query online.
            </p>
          </div>
        </div>
      </section>

      {/* Main Two Column Contact & Form Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Column: Campus Particulars */}
          <div className="space-y-6">
            <div>
              <span className="text-xs sm:text-sm font-bold text-blue-800 uppercase tracking-widest font-mono">
                Campus Location & Desk
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 font-serif tracking-tight mt-1.5">
                Institutional Contact Directory
              </h2>
            </div>

            <div className="space-y-5 text-sm text-slate-700">
              <div className="p-5 sm:p-6 bg-white border border-slate-200 rounded-xl shadow-xs flex items-start gap-4">
                <MapPin className="w-6 h-6 text-blue-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 text-base">Campus Address</h4>
                  <p className="mt-1 leading-relaxed text-sm sm:text-base">{schoolData.address}</p>
                  <p className="text-slate-500 text-xs sm:text-sm mt-1.5">Located along the Airport Corridor, 2.5 km from Srinagar International Airport.</p>
                </div>
              </div>

              <div className="p-5 sm:p-6 bg-white border border-slate-200 rounded-xl shadow-xs flex items-start gap-4">
                <Phone className="w-6 h-6 text-blue-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 text-base">Helplines & Extensions</h4>
                  <p className="font-mono mt-1 text-sm sm:text-base">Admissions Helpline: <strong className="text-slate-900">{schoolData.helpline}</strong></p>
                  <p className="font-mono text-sm sm:text-base">Main Reception: <strong className="text-slate-900">{schoolData.phone}</strong></p>
                  <p className="text-slate-500 text-xs sm:text-sm mt-1.5">Available Monday to Saturday: 09:00 AM to 03:30 PM</p>
                </div>
              </div>

              <div className="p-5 sm:p-6 bg-white border border-slate-200 rounded-xl shadow-xs flex items-start gap-4">
                <Mail className="w-6 h-6 text-blue-700 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900 text-base">Official Email Desks</h4>
                  <p className="text-sm sm:text-base">Admissions Office: <span className="font-mono font-medium text-blue-900">{schoolData.email}</span></p>
                  <p className="text-sm sm:text-base">General Enquiries: <span className="font-mono font-medium text-blue-900">{schoolData.infoEmail}</span></p>
                  <p className="text-sm sm:text-base">Office of the Principal: <span className="font-mono font-medium text-blue-900">{schoolData.principalEmail}</span></p>
                </div>
              </div>
            </div>

            {/* Map Visual Preview */}
            <div className="p-6 bg-slate-900 text-white rounded-xl space-y-2.5 border border-slate-800 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="font-bold text-base flex items-center gap-2">
                  <Navigation className="w-5 h-5 text-blue-400" />
                  <span>Google Maps Geolocation</span>
                </span>
                <span className="text-xs bg-blue-900 text-blue-200 font-mono px-2.5 py-1 rounded-md font-bold">
                  34.0042° N, 74.7788° E
                </span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                School campus transit access is streamlined via Humhama Chowk and Airport Expressway with dedicated security bays for parent drop-offs.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Inquiry Form */}
          <div className="bg-white p-7 sm:p-10 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div>
              <span className="text-xs sm:text-sm font-bold text-blue-800 uppercase tracking-widest font-mono">
                Direct Message Desk
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-serif tracking-tight mt-1.5">
                Send an Online Inquiry or Request Campus Visit
              </h3>
            </div>

            {submitted ? (
              <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-4">
                <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-slate-900 text-lg">Inquiry Dispatched Successfully!</h4>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-md mx-auto">
                  Thank you, <strong>{formData.name}</strong>. Your enquiry has been routed to the relevant departmental coordinator. You will receive a follow-up via phone call / email within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', phone: '', email: '', inquiryType: 'Admission Enquiry', message: '' });
                  }}
                  className="px-6 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-lg hover:bg-slate-800 transition cursor-pointer"
                >
                  Submit Another Query
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-1.5">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Dr. Altaf Hussain"
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-blue-700 focus:outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-1.5">Mobile Contact (+91) *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 94190 XXXXX"
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm font-mono text-slate-900 focus:ring-2 focus:ring-blue-700 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-1.5">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-blue-700 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-1.5">Nature of Inquiry</label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg bg-white text-sm text-slate-900 focus:ring-2 focus:ring-blue-700 focus:outline-hidden"
                  >
                    <option value="Admission Enquiry">Admission Enquiry (Session 2026–2027)</option>
                    <option value="Campus Tour Request">Schedule In-Person Campus Tour</option>
                    <option value="Fee & Accounts Query">Fee & Accounts Query</option>
                    <option value="Transfer Certificate (TC)">Transfer Certificate Verification</option>
                    <option value="Career & Faculty Vacancy">Career & Faculty Recruitment</option>
                    <option value="General Administration">General Administrative Matter</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-1.5">Your Detailed Query or Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide candidate details, class grade of interest, or specific questions..."
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-blue-700 focus:outline-hidden"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-blue-800 hover:bg-blue-900 text-white font-bold uppercase tracking-wider rounded-lg transition shadow-md text-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message to Admissions Office</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

    </div>
  );
}
