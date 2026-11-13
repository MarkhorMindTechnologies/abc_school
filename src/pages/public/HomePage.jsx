import React, { useState } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { 
  ShieldCheck, Award, BookOpen, Users, Compass, 
  ArrowRight, Calendar, Clock, Download, ChevronRight, 
  MapPin, CheckCircle, ExternalLink, Sparkles, Navigation, Phone,
  GraduationCap
} from 'lucide-react';
import HeroSlider from '../../components/public/HeroSlider';
import { 
  schoolData, 
  statistics, 
  leadership, 
  academicWings, 
  campusFacilities, 
  newsAndNotices, 
  toppers, 
  galleryItems,
  facultyData
} from '../../data/websiteData';

export default function HomePage() {
  const { openAdmissionModal } = useOutletContext();
  const [selectedGalleryImg, setSelectedGalleryImg] = useState(null);

  return (
    <div className="flex flex-col">
      
      {/* 1. Hero Image Slider (Fills 100% of the first viewport fold with zero bleed) */}
      <HeroSlider onOpenAdmissionModal={openAdmissionModal} />

      {/* 2. Urgent Announcement Ticker (Starts cleanly below the fold on scroll) */}
      <div className="bg-blue-950 text-white py-3.5 border-y border-blue-800/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-1 bg-amber-400 text-slate-950 font-extrabold uppercase rounded text-xs tracking-wider shrink-0">
              Notice
            </span>
            <span className="font-medium text-slate-200 truncate">
              Admissions Open for Session 2026–2027: Pre-Primary (Nursery, LKG, UKG) & Class 11 (Science, Commerce, Humanities).
            </span>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={openAdmissionModal}
              className="text-amber-300 font-bold hover:underline inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <span>Fill Online Form</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <span className="text-blue-500">|</span>
            <Link to="/news" className="text-blue-200 hover:text-white font-medium whitespace-nowrap">
              View All Circulars
            </Link>
          </div>
        </div>
      </div>

      {/* 3. Main Content Sections (Spaced out for the 2nd fold and beyond) */}
      <div className="space-y-16 sm:space-y-24 py-12 sm:py-16">
        
        {/* Institutional Statistics Overview */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {statistics.map((stat, i) => (
              <div 
                key={i} 
                className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs text-center hover:border-blue-700 hover:shadow-md transition duration-300"
              >
                <div className="text-3xl sm:text-4xl font-black text-blue-900 font-serif tracking-tight">
                  {stat.value}
                </div>
                <p className="text-sm font-bold text-slate-900 mt-2 uppercase tracking-wider">{stat.label}</p>
                <p className="text-xs text-slate-500 mt-1">{stat.subtext}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Leadership Address: Chairman & Principal */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs sm:text-sm font-bold text-blue-800 uppercase tracking-widest font-mono">
              Visionary Leadership
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 font-serif tracking-tight mt-1.5">
              Guiding Principles & Educational Vision
            </h2>
            <div className="w-20 h-1 bg-amber-500 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Chairman */}
            <div className="bg-white rounded-xl border border-slate-200 p-7 sm:p-9 shadow-xs flex flex-col justify-between space-y-6 hover:shadow-md transition">
              <div className="space-y-4">
                <span className="inline-block px-3 py-1 rounded-md bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider">
                  From the Chairman's Desk
                </span>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed italic font-serif">
                  "{leadership.chairman.message}"
                </p>
              </div>

              <div className="flex items-center gap-4 pt-5 border-t border-slate-100">
                <div className="w-14 h-14 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-lg shrink-0 font-serif shadow-xs">
                  SM
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base font-serif">{leadership.chairman.name}</h4>
                  <p className="text-sm text-blue-800 font-semibold">{leadership.chairman.designation}</p>
                  <p className="text-xs sm:text-sm text-slate-500">{leadership.chairman.credentials}</p>
                </div>
              </div>
            </div>

            {/* Principal */}
            <div className="bg-white rounded-xl border border-slate-200 p-7 sm:p-9 shadow-xs flex flex-col justify-between space-y-6 hover:shadow-md transition">
              <div className="space-y-4">
                <span className="inline-block px-3 py-1 rounded-md bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
                  Principal's Address
                </span>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed italic font-serif">
                  "{leadership.principal.message}"
                </p>
              </div>

              <div className="flex items-center gap-4 pt-5 border-t border-slate-100">
                <div className="w-14 h-14 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold text-lg shrink-0 font-serif shadow-xs">
                  FM
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base font-serif">{leadership.principal.name}</h4>
                  <p className="text-sm text-blue-800 font-semibold">{leadership.principal.designation}</p>
                  <p className="text-xs sm:text-sm text-slate-500">{leadership.principal.credentials}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Academic Wings Overview */}
        <section className="bg-slate-100/80 py-16 sm:py-20 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs sm:text-sm font-bold text-blue-800 uppercase tracking-widest font-mono">
                Academic Continuum
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 font-serif tracking-tight mt-1.5">
                Structured Wings from Foundation to Senior Secondary
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2.5">
                Aligned with the Central Board of Secondary Education and National Education Policy (NEP 2020) framework.
              </p>
              <div className="w-20 h-1 bg-amber-500 mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
              {academicWings.map((wing) => (
                <div key={wing.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4 hover:border-blue-700 hover:shadow-lg transition duration-300">
                  <div>
                    <span className="text-xs font-mono font-bold text-blue-800 uppercase tracking-wider block mb-1.5">
                      {wing.subtitle}
                    </span>
                    <h3 className="font-bold text-slate-900 text-base sm:text-lg font-serif leading-snug">
                      {wing.name}
                    </h3>
                    <p className="text-sm text-slate-600 mt-2.5 leading-relaxed line-clamp-4">
                      {wing.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <Link
                      to={`/academics#${wing.id}`}
                      className="text-sm font-bold text-blue-800 hover:text-blue-950 inline-flex items-center gap-1 group"
                    >
                      <span>View Curriculum</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Distinguished Teaching Faculty Showcase */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs sm:text-sm font-bold text-blue-800 uppercase tracking-widest font-mono">
                Academic Excellence & Mentorship
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 font-serif tracking-tight mt-1.5">
                Distinguished Teaching Faculty & Scholars
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
                Our institution is powered by seasoned educators, doctoral researchers, and CBSE board evaluators dedicated to academic distinction and holistic student growth.
              </p>
            </div>
            <Link
              to="/faculty"
              className="text-sm font-bold uppercase tracking-wider text-blue-800 hover:text-blue-950 inline-flex items-center gap-1.5 group shrink-0"
            >
              <span>Explore All 84+ Faculty</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </Link>
          </div>

          {/* Top Faculty Profile Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
            {facultyData.slice(0, 4).map((teacher) => (
              <div 
                key={teacher.id}
                className="bg-white rounded-xl border border-slate-200 shadow-xs hover:border-blue-700 hover:shadow-xl transition duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  {/* Portrait photo */}
                  <div className="relative h-60 overflow-hidden bg-slate-100">
                    <img 
                      src={teacher.image} 
                      alt={teacher.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-500" 
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 bg-slate-950/80 backdrop-blur-xs text-white text-xs font-semibold rounded-md uppercase tracking-wider">
                        {teacher.department.split('&')[0].trim()}
                      </span>
                    </div>
                    <div className="absolute bottom-3 right-3">
                      <span className="px-2.5 py-1 bg-amber-400 text-slate-950 text-xs font-bold font-mono rounded-md shadow-xs">
                        {teacher.experience} Exp
                      </span>
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-5 space-y-2.5">
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg font-serif group-hover:text-blue-800 transition leading-snug">
                        {teacher.name}
                      </h3>
                      <p className="text-xs font-semibold text-blue-800 uppercase tracking-wider mt-0.5">
                        {teacher.designation}
                      </p>
                    </div>

                    <div className="flex items-start gap-1.5 text-xs text-slate-600 pt-1">
                      <GraduationCap className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      <span className="font-medium">{teacher.qualification}</span>
                    </div>

                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      <span className="font-semibold text-slate-700">Specialization:</span> {teacher.specialization}
                    </p>
                  </div>
                </div>

                {/* Footer Achievement Highlight */}
                <div className="p-4 bg-slate-50/80 border-t border-slate-100 text-xs text-slate-600 flex items-start gap-2">
                  <Award className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span className="font-medium text-slate-700 line-clamp-1">{teacher.achievements}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Faculty Quality Standards Strip & Full Directory CTA */}
          <div className="mt-8 bg-gradient-to-r from-blue-950 to-slate-900 rounded-xl p-6 sm:p-7 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md border border-blue-900">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 w-full md:w-auto text-center sm:text-left">
              <div>
                <p className="text-2xl sm:text-3xl font-black font-serif text-amber-400">84+</p>
                <p className="text-xs text-slate-300 font-medium uppercase tracking-wider mt-0.5">Teaching Faculty</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black font-serif text-amber-400">100%</p>
                <p className="text-xs text-slate-300 font-medium uppercase tracking-wider mt-0.5">PG & B.Ed. Certified</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black font-serif text-amber-400">1:15</p>
                <p className="text-xs text-slate-300 font-medium uppercase tracking-wider mt-0.5">Teacher–Student Ratio</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black font-serif text-amber-400">14.5 Yrs</p>
                <p className="text-xs text-slate-300 font-medium uppercase tracking-wider mt-0.5">Average Experience</p>
              </div>
            </div>

            <div className="shrink-0 w-full sm:w-auto text-center sm:text-right">
              <Link
                to="/faculty"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold uppercase tracking-wider text-xs sm:text-sm rounded-lg transition shadow-sm"
              >
                <span>View Complete Faculty Directory</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs sm:text-sm font-bold text-blue-800 uppercase tracking-widest font-mono">
                Campus Environment
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 font-serif tracking-tight mt-1.5">
                State-of-the-Art Infrastructure
              </h2>
            </div>
            <Link
              to="/campus"
              className="text-sm font-bold uppercase tracking-wider text-blue-800 hover:text-blue-950 inline-flex items-center gap-1.5 group"
            >
              <span>Explore All Facilities</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {campusFacilities.map((fac) => (
              <div key={fac.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition duration-300 group">
                <div className="h-52 overflow-hidden relative">
                  <img
                    src={fac.image}
                    alt={fac.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-3.5 left-3.5 px-3 py-1 bg-slate-950/85 text-white rounded-md text-xs font-bold uppercase tracking-wider backdrop-blur-xs">
                    {fac.category}
                  </span>
                </div>
                <div className="p-6 space-y-2.5">
                  <h3 className="font-bold text-slate-900 text-lg sm:text-xl font-serif group-hover:text-blue-800 transition">
                    {fac.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {fac.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Board Results & Academic Toppers */}
        <section className="bg-slate-900 text-white py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs sm:text-sm font-bold text-amber-400 uppercase tracking-widest font-mono">
                Academic Laurels
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-serif tracking-tight mt-1.5">
                CBSE Board Examination Hall of Fame
              </h2>
              <p className="text-sm sm:text-base text-slate-300 mt-2.5">
                Our students consistently achieve top percentiles and placements into premier national institutions.
              </p>
              <div className="w-20 h-1 bg-amber-400 mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {toppers.map((top, idx) => (
                <div key={idx} className="bg-slate-800/90 border border-slate-700 rounded-xl p-6 text-center space-y-4 hover:border-amber-400 transition duration-300">
                  <div className="w-24 h-24 rounded-full mx-auto overflow-hidden border-2 border-amber-400 shadow-md">
                    <img src={top.image} alt={top.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg font-serif">{top.name}</h3>
                    <p className="text-sm text-amber-300 font-semibold">{top.exam}</p>
                    <p className="text-3xl font-black text-amber-400 font-mono mt-1.5">{top.score}</p>
                  </div>
                  <div className="pt-3 border-t border-slate-700 text-xs sm:text-sm text-slate-300">
                    <p className="font-medium text-slate-200">{top.stream}</p>
                    <p className="text-amber-200 font-semibold mt-1">{top.status}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                to="/achievements"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold uppercase tracking-wider rounded-lg text-sm transition shadow-md"
              >
                <span>View Comprehensive Board Broadsheets</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* News, Circulars & Upcoming Events */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs sm:text-sm font-bold text-blue-800 uppercase tracking-widest font-mono">
                Campus Communication
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 font-serif tracking-tight mt-1.5">
                Latest Circulars, Notices & Press Releases
              </h2>
            </div>
            <Link
              to="/news"
              className="text-sm font-bold uppercase tracking-wider text-blue-800 hover:text-blue-950 inline-flex items-center gap-1.5 group"
            >
              <span>View Notice Board</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {newsAndNotices.map((n) => (
              <div key={n.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3 hover:border-slate-300 hover:shadow-md transition">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="px-2.5 py-1 bg-slate-100 text-slate-800 font-semibold rounded-md border border-slate-200">
                    {n.category}
                  </span>
                  <span className="text-slate-500 font-mono flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span>{n.date}</span>
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base sm:text-lg font-serif leading-snug">
                  {n.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {n.summary}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Photo Gallery Preview */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs sm:text-sm font-bold text-blue-800 uppercase tracking-widest font-mono">
                Visual Chronicles
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 font-serif tracking-tight mt-1.5">
                Moments of Discovery, Athletics & Culture
              </h2>
            </div>
            <Link
              to="/gallery"
              className="text-sm font-bold uppercase tracking-wider text-blue-800 hover:text-blue-950 inline-flex items-center gap-1.5 group"
            >
              <span>Full Photo Archive</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {galleryItems.slice(0, 4).map((item) => (
              <div 
                key={item.id} 
                onClick={() => setSelectedGalleryImg(item)}
                className="group relative h-56 sm:h-64 rounded-xl overflow-hidden border border-slate-200 cursor-pointer shadow-xs hover:shadow-lg transition duration-300"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent flex items-end p-4">
                  <div>
                    <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">{item.category}</span>
                    <p className="text-white text-sm font-bold leading-tight line-clamp-1 mt-0.5">{item.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action: Admissions Banner */}
        <section className="bg-blue-950 text-white py-16 sm:py-20 border-y border-blue-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
            <span className="inline-block px-3.5 py-1.5 bg-amber-400 text-slate-950 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-md">
              Admissions Open 2026–2027
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif tracking-tight">
              Begin Your Child's Journey of Excellence at ABC Public School
            </h2>
            <p className="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Experience our 8.5-acre modern campus, dedicated educators, and time-tested academic pedagogy. Schedule a campus visit or register online today.
            </p>
            <div className="pt-3 flex flex-wrap justify-center gap-4">
              <button
                onClick={openAdmissionModal}
                className="px-7 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm uppercase tracking-wider rounded-lg transition shadow-lg inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Submit Admission Enquiry</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                to="/contact"
                className="px-7 py-3.5 bg-blue-900 hover:bg-slate-950 text-white font-semibold text-sm uppercase tracking-wider rounded-lg border border-blue-600 transition"
              >
                Schedule Campus Visit
              </Link>
            </div>
          </div>
        </section>

        {/* 11. Campus Location, Directions & Interactive Map (Inspired by Sri Chaitanya School) */}
        <section id="location" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs sm:text-sm font-bold text-blue-800 uppercase tracking-widest font-mono">
              Locate Our Campus
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 font-serif tracking-tight mt-1.5">
              Visit Our 8.5-Acre Campus in Srinagar
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2.5">
              Centrally located along the prestigious Airport Corridor in Humhama, seamlessly connected to Srinagar, Budgam, and surrounding districts.
            </p>
            <div className="w-20 h-1 bg-amber-500 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Card: Campus Directory & Connectivity Landmarks (5 cols) */}
            <div className="lg:col-span-5 bg-white p-7 sm:p-8 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-6">
              <div className="space-y-6">
                
                {/* Header Crest Info */}
                <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
                  <div className="w-12 h-12 rounded-lg bg-blue-950 border border-amber-400 flex flex-col items-center justify-center text-white shrink-0 shadow-xs">
                    <span className="font-black text-base text-amber-300">ABC</span>
                    <span className="text-[7px] font-mono font-bold tracking-widest text-slate-300">ESTD 1988</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base font-serif">ABC Public School Campus</h3>
                    <p className="text-xs text-blue-800 font-semibold">Airport Road, Humhama, Srinagar</p>
                  </div>
                </div>

                {/* Exact Postal Address */}
                <div className="flex items-start gap-3.5 text-sm">
                  <div className="p-2.5 bg-blue-50 text-blue-800 rounded-lg shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider text-slate-500">Campus Address</span>
                    <p className="text-slate-800 font-medium mt-0.5 leading-relaxed">
                      {schoolData.address}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Landmark: Near Sheikh-ul-Alam International Airport Corridor, Humhama Chowk.
                    </p>
                  </div>
                </div>

                {/* Contact Telephones */}
                <div className="flex items-start gap-3.5 text-sm">
                  <div className="p-2.5 bg-emerald-50 text-emerald-800 rounded-lg shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider text-slate-500">Helplines & Enquiries</span>
                    <p className="font-mono text-slate-900 font-semibold">
                      Admissions: <a href={`tel:${schoolData.helpline}`} className="text-blue-800 hover:underline">{schoolData.helpline}</a>
                    </p>
                    <p className="font-mono text-slate-700 text-xs sm:text-sm">
                      Campus Office: <a href={`tel:${schoolData.phone}`} className="text-slate-800 hover:underline">{schoolData.phone}</a>
                    </p>
                    <p className="text-xs text-slate-600 font-mono pt-0.5">
                      Email: <a href={`mailto:${schoolData.email}`} className="text-blue-800 hover:underline">{schoolData.email}</a>
                    </p>
                  </div>
                </div>

                {/* Visiting Hours */}
                <div className="flex items-start gap-3.5 text-sm">
                  <div className="p-2.5 bg-amber-50 text-amber-800 rounded-lg shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider text-slate-500">Visiting Hours</span>
                    <p className="text-slate-800 font-semibold mt-0.5">
                      {schoolData.visitingHours}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Admissions Desk open for parent consultations & guided school walkthroughs.
                    </p>
                  </div>
                </div>

                {/* Transit Distance Badges */}
                <div className="pt-2">
                  <span className="font-bold text-slate-500 block text-xs uppercase tracking-wider mb-2">Transit Proximity</span>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                      <span className="text-slate-500 block">Srinagar Airport</span>
                      <strong className="text-slate-900 font-mono text-sm">2.5 km (5 mins)</strong>
                    </div>
                    <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                      <span className="text-slate-500 block">Lal Chowk Center</span>
                      <strong className="text-slate-900 font-mono text-sm">9.0 km (18 mins)</strong>
                    </div>
                    <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                      <span className="text-slate-500 block">Nowgam Railway Stn</span>
                      <strong className="text-slate-900 font-mono text-sm">8.5 km (15 mins)</strong>
                    </div>
                    <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                      <span className="text-slate-500 block">Hyderpora Flyover</span>
                      <strong className="text-slate-900 font-mono text-sm">4.2 km (8 mins)</strong>
                    </div>
                  </div>
                </div>

              </div>

              {/* Bottom Direction CTA */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
                <a
                  href="https://maps.google.com/?q=Airport+Road+Humhama+Srinagar+Jammu+and+Kashmir"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3 px-4 bg-blue-800 hover:bg-blue-900 text-white font-bold text-sm rounded-lg transition shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Directions</span>
                </a>
                <Link
                  to="/contact"
                  className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm rounded-lg border border-slate-200 transition text-center"
                >
                  Schedule Tour
                </Link>
              </div>
            </div>

            {/* Right Card: Interactive Live Google Map (7 cols) */}
            <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-100 relative min-h-[420px] sm:min-h-[500px] flex flex-col">
              
              {/* Top Map Location Banner */}
              <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between border-b border-slate-800 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="font-bold text-slate-100">Live Campus Geolocation Map</span>
                </div>
                <div className="flex items-center gap-2 font-mono text-slate-400 text-xs">
                  <span className="hidden sm:inline">Coordinates:</span>
                  <span className="text-amber-400 font-bold">34.0042° N, 74.7788° E</span>
                </div>
              </div>

              {/* Embedded Interactive Google Map Iframe */}
              <div className="flex-1 relative w-full h-full min-h-[380px]">
                <iframe
                  title="ABC Public School Campus Map"
                  src="https://maps.google.com/maps?q=Airport%20Road,%20Humhama,%20Srinagar,%20Jammu%20and%20Kashmir&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full absolute inset-0 border-0"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>

                {/* Floating Map Pin Badge */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs p-3 rounded-xl border border-slate-300 shadow-lg max-w-xs pointer-events-none hidden sm:block">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-900 text-amber-300 font-black text-xs flex items-center justify-center">
                      ABC
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-xs leading-tight font-serif">ABC Public School</p>
                      <p className="text-[11px] text-slate-600">Airport Road, Humhama</p>
                    </div>
                  </div>
                </div>

                {/* Floating Fullscreen Map Button */}
                <a
                  href="https://maps.google.com/?q=Airport+Road+Humhama+Srinagar+Jammu+and+Kashmir"
                  target="_blank"
                  rel="noreferrer"
                  className="absolute bottom-4 right-4 bg-white/95 hover:bg-white text-slate-900 px-3.5 py-2 rounded-lg border border-slate-300 shadow-md text-xs font-bold flex items-center gap-1.5 transition"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 text-blue-700" />
                </a>
              </div>

              {/* Map Footer Info Strip */}
              <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-2">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Dedicated pickup/drop security bays with wide-paved bus arrival corridors.</span>
                </span>
                <span className="font-medium text-blue-900 shrink-0">
                  GPS Fleet Route Network Available
                </span>
              </div>

            </div>

          </div>
        </section>

      </div>

      {/* Lightbox Modal */}
      {selectedGalleryImg && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedGalleryImg(null)}
        >
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <img 
              src={selectedGalleryImg.image} 
              alt={selectedGalleryImg.title} 
              className="w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
            />
            <div className="mt-4 text-white flex justify-between items-center text-sm">
              <span className="font-bold text-base">{selectedGalleryImg.title} ({selectedGalleryImg.category})</span>
              <button 
                onClick={() => setSelectedGalleryImg(null)}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-semibold transition cursor-pointer"
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
