import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from './components/public/PublicLayout';
import ScrollToTop from './components/public/ScrollToTop';

// Public Pages
import HomePage from './pages/public/HomePage';
import AboutPage from './pages/public/AboutPage';
import AcademicsPage from './pages/public/AcademicsPage';
import AdmissionsPage from './pages/public/AdmissionsPage';
import CampusPage from './pages/public/CampusPage';
import StudentLifePage from './pages/public/StudentLifePage';
import AchievementsPage from './pages/public/AchievementsPage';
import GalleryPage from './pages/public/GalleryPage';
import NewsNoticesPage from './pages/public/NewsNoticesPage';
import MandatoryDisclosurePage from './pages/public/MandatoryDisclosurePage';
import TransferCertificatePage from './pages/public/TransferCertificatePage';
import ContactPage from './pages/public/ContactPage';
import FacultyPage from './pages/public/FacultyPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsConditionsPage from './pages/TermsConditionsPage';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="academics" element={<AcademicsPage />} />
          <Route path="faculty" element={<FacultyPage />} />
          <Route path="admissions" element={<AdmissionsPage />} />
          <Route path="campus" element={<CampusPage />} />
          <Route path="student-life" element={<StudentLifePage />} />
          <Route path="achievements" element={<AchievementsPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="news" element={<NewsNoticesPage />} />
          <Route path="mandatory-disclosure" element={<MandatoryDisclosurePage />} />
          <Route path="tc-verification" element={<TransferCertificatePage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="terms-and-conditions" element={<TermsConditionsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
