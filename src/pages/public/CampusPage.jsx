import React from 'react';
import { 
  Building2, BookOpen, Activity, Bus, Shield, 
  MapPin, CheckCircle, Wifi, Award 
} from 'lucide-react';
import { campusFacilities } from '../../data/websiteData';

export default function CampusPage() {
  return (
    <div className="space-y-14 sm:space-y-20 py-10 sm:py-12">
      
      {/* Title Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-14 shadow-lg border border-slate-800">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs sm:text-sm font-bold text-amber-400 uppercase tracking-widest font-mono">
              8.5 Acre Eco-Friendly Infrastructure
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif tracking-tight text-white">
              Campus Facilities & Infrastructure
            </h1>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-sans">
              Engineered to foster empirical discovery, holistic wellness, and collaborative academic inquiry in an inspiring, green valley setting.
            </p>
          </div>
        </div>
      </section>

      {/* Campus Facility Blocks */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-16 sm:space-y-20">
          {campusFacilities.map((facility, index) => (
            <div 
              key={facility.id}
              id={facility.id}
              className={`flex flex-col lg:flex-row gap-10 lg:gap-14 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className="w-full lg:w-1/2 rounded-2xl overflow-hidden border border-slate-200 shadow-xl h-80 sm:h-96">
                <img
                  src={facility.image}
                  alt={facility.title}
                  className="w-full h-full object-cover object-center hover:scale-105 transition duration-500"
                />
              </div>

              <div className="w-full lg:w-1/2 space-y-5">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-900 rounded-md text-xs font-bold uppercase tracking-wider">
                  {facility.category} Infrastructure
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 font-serif tracking-tight">
                  {facility.title}
                </h2>
                <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                  {facility.description}
                </p>

                <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-sm text-slate-800">
                  <div className="flex items-center gap-2.5 p-3.5 bg-white border border-slate-200 rounded-xl shadow-xs">
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span className="font-medium">Safety Certified & Inspected</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-3.5 bg-white border border-slate-200 rounded-xl shadow-xs">
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span className="font-medium">Specialized Faculty Incharge</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Additional Health & Safety Highlights */}
      <section className="bg-slate-100/80 py-16 sm:py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs sm:text-sm font-bold text-blue-800 uppercase tracking-widest font-mono">
              Student Welfare
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 font-serif tracking-tight mt-1.5">
              Health, Hygiene & Campus Security Standards
            </h2>
            <div className="w-20 h-1 bg-amber-500 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-7 sm:p-8 rounded-xl border border-slate-200 shadow-xs space-y-3 hover:shadow-md transition">
              <h3 className="font-bold text-slate-900 text-lg font-serif">Medical Infirmary & First Aid</h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                4-bed air-conditioned infirmary staffed by a registered nurse during school hours, stocked with emergency oxygen, trauma kits, and an on-call pediatrician.
              </p>
            </div>

            <div className="bg-white p-7 sm:p-8 rounded-xl border border-slate-200 shadow-xs space-y-3 hover:shadow-md transition">
              <h3 className="font-bold text-slate-900 text-lg font-serif">Campus CCTV & Perimeter Security</h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Comprehensive 128-camera IP CCTV network covering all campus gates, corridors, and perimeters with round-the-clock trained security guards and visitor pass logging.
              </p>
            </div>

            <div className="bg-white p-7 sm:p-8 rounded-xl border border-slate-200 shadow-xs space-y-3 hover:shadow-md transition">
              <h3 className="font-bold text-slate-900 text-lg font-serif">RO Purified Water & Eco Solar</h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Centralized reverse osmosis (RO) drinking water coolers tested quarterly by municipal authorities, alongside a 50 kW rooftop solar generation array.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
