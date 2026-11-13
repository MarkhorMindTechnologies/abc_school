import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, ShieldCheck } from 'lucide-react';
import { heroSlides } from '../../data/websiteData';
import { Link } from 'react-router-dom';

export default function HeroSlider({ onOpenAdmissionModal }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const slide = heroSlides[currentSlide];

  return (
    <div 
      className="relative w-full h-[calc(100vh-128px)] md:h-[calc(100vh-180px)] min-h-[460px] md:max-h-[calc(100vh-180px)] overflow-hidden bg-slate-950 text-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Slides with Crossfade */}
      {heroSlides.map((s, index) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          {/* Background Image with Dark Vignette Overlay */}
          <img
            src={s.image}
            alt={s.title}
            className="w-full h-full object-cover object-center filter brightness-[0.45]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/70 to-slate-950/20"></div>
        </div>
      ))}

      {/* Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div className="max-w-3xl space-y-3 sm:space-y-4 lg:space-y-5">
          
          {/* Institutional Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-blue-900/90 border border-blue-600 text-blue-100 text-xs sm:text-sm font-bold uppercase tracking-wider backdrop-blur-xs">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{slide.tag}</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight font-serif drop-shadow-md">
            {slide.title}
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base lg:text-lg text-slate-100 font-normal leading-relaxed drop-shadow-sm max-w-2xl">
            {slide.subtitle}
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center gap-3.5">
            <button
              onClick={onOpenAdmissionModal}
              className="px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm uppercase tracking-wider rounded-lg transition shadow-lg inline-flex items-center gap-2 cursor-pointer"
            >
              <span>{slide.ctaPrimary}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              to={slide.ctaSecondaryLink}
              className="px-6 py-3 bg-slate-900/80 hover:bg-slate-900 text-white font-semibold text-sm uppercase tracking-wider rounded-lg border border-slate-600 hover:border-slate-400 transition backdrop-blur-xs"
            >
              {slide.ctaSecondary}
            </Link>
          </div>

        </div>
      </div>

      {/* Slide Navigation Arrows */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-lg bg-slate-900/70 hover:bg-slate-900 text-white border border-slate-700 transition cursor-pointer"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-lg bg-slate-900/70 hover:bg-slate-900 text-white border border-slate-700 transition cursor-pointer"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            aria-label={`Jump to slide ${i + 1}`}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              i === currentSlide
                ? 'w-8 h-2.5 bg-amber-400'
                : 'w-2.5 h-2.5 bg-white/50 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
