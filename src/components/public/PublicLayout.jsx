import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import TopBar from './TopBar';
import Header from './Header';
import Navbar from './Navbar';
import PublicFooter from './PublicFooter';
import AdmissionModal from './AdmissionModal';
import ErpPortalModal from './ErpPortalModal';

export default function PublicLayout() {
  const [admissionModalOpen, setAdmissionModalOpen] = useState(false);
  const [erpModalOpen, setErpModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased selection:bg-blue-800 selection:text-white">
      {/* Top Utility Bar */}
      <TopBar onOpenErpModal={() => setErpModalOpen(true)} />

      {/* Main Header with Logo & Crest */}
      <Header 
        onOpenAdmissionModal={() => setAdmissionModalOpen(true)}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* Primary Navigation with Mega Dropdowns */}
      <Navbar 
        onOpenErpModal={() => setErpModalOpen(true)}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        <Outlet context={{ 
          openAdmissionModal: () => setAdmissionModalOpen(true),
          openErpModal: () => setErpModalOpen(true)
        }} />
      </main>

      {/* Public Institutional Footer */}
      <PublicFooter 
        onOpenAdmissionModal={() => setAdmissionModalOpen(true)}
        onOpenErpModal={() => setErpModalOpen(true)}
      />

      {/* Modals */}
      <AdmissionModal 
        isOpen={admissionModalOpen} 
        onClose={() => setAdmissionModalOpen(false)} 
      />

      <ErpPortalModal 
        isOpen={erpModalOpen} 
        onClose={() => setErpModalOpen(false)} 
      />
    </div>
  );
}
