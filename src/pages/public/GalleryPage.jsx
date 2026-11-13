import React, { useState } from 'react';
import { Image, X, ZoomIn, Filter } from 'lucide-react';
import { galleryItems } from '../../data/websiteData';

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activePhoto, setActivePhoto] = useState(null);

  const categories = ['All', 'Campus', 'Science', 'Sports', 'Culture'];

  const filteredPhotos = selectedCategory === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <div className="space-y-14 sm:space-y-20 py-10 sm:py-12">
      
      {/* Title Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-14 shadow-lg border border-slate-800">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs sm:text-sm font-bold text-amber-400 uppercase tracking-widest font-mono">
              Visual Chronicles
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif tracking-tight text-white">
              Campus Photo & Media Archive
            </h1>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-sans">
              Explore moments of intellectual curiosity, athletic triumphs, scientific exploration, and festive cultural celebrations at ABC Public School.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 overflow-x-auto pb-3 text-sm">
          <span className="font-bold text-slate-600 uppercase tracking-wider mr-2 flex items-center gap-1.5 text-xs">
            <Filter className="w-4 h-4" />
            <span>Category:</span>
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4.5 py-2 rounded-lg font-semibold text-sm transition cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-900 text-white shadow-md'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat} ({cat === 'All' ? galleryItems.length : galleryItems.filter(g => g.category === cat).length})
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-6">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setActivePhoto(photo)}
              className="group relative h-72 rounded-xl overflow-hidden border border-slate-200 cursor-pointer shadow-xs hover:shadow-xl transition duration-300 bg-slate-900"
            >
              <img
                src={photo.image}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent flex flex-col justify-end p-5">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  {photo.category}
                </span>
                <h3 className="text-white text-base font-bold font-serif leading-snug mt-1">
                  {photo.title}
                </h3>
              </div>
              <div className="absolute top-3.5 right-3.5 p-2 rounded-lg bg-slate-900/70 text-white opacity-0 group-hover:opacity-100 transition">
                <ZoomIn className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/95 flex items-center justify-center p-4 sm:p-6 backdrop-blur-xs"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 bg-slate-950 flex items-center justify-between border-b border-slate-800 text-white">
              <div>
                <span className="text-xs text-amber-400 font-mono font-bold uppercase">{activePhoto.category} Showcase</span>
                <h4 className="font-bold text-base sm:text-lg font-serif mt-0.5">{activePhoto.title}</h4>
              </div>
              <button
                onClick={() => setActivePhoto(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="max-h-[75vh] overflow-hidden flex items-center justify-center bg-black">
              <img
                src={activePhoto.image}
                alt={activePhoto.title}
                className="max-h-[75vh] w-auto object-contain"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
