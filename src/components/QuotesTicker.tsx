import React, { useState, useEffect } from 'react';
import { MessageSquareQuote, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { NOSTALGIC_QUOTES } from '../data/playlist';

export const QuotesTicker: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % NOSTALGIC_QUOTES.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % NOSTALGIC_QUOTES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + NOSTALGIC_QUOTES.length) % NOSTALGIC_QUOTES.length);
  };

  return (
    <div className="w-full my-6 px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="relative rounded-2xl bg-gradient-to-r from-amber-950/80 via-stone-900/90 to-amber-950/80 border border-amber-600/40 p-4 sm:p-6 shadow-xl backdrop-blur-md overflow-hidden">
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Label Badge */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <MessageSquareQuote className="w-5 h-5" />
            </span>
            <div>
              <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest block">
                CHACHA'S SALONE WISDOM
              </span>
              <span className="text-[10px] text-stone-400">
                Rotates auto every 4s
              </span>
            </div>
          </div>

          {/* Central Quote Text */}
          <div className="flex-1 text-center sm:text-left px-2 sm:px-4 min-h-[48px] flex items-center justify-center sm:justify-start">
            <p className="font-caveat text-xl sm:text-2xl text-amber-100 font-bold tracking-wide transition-all duration-300">
              "{NOSTALGIC_QUOTES[currentIndex]}"
            </p>
          </div>

          {/* Next / Previous Buttons & Index Indicator */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handlePrev}
              className="p-2 rounded-lg bg-stone-800 hover:bg-amber-900 text-stone-300 hover:text-amber-300 border border-stone-700 transition-all active:scale-95"
              title="Previous Quote"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="text-xs font-mono text-stone-400 px-2">
              {currentIndex + 1} / {NOSTALGIC_QUOTES.length}
            </span>

            <button
              onClick={handleNext}
              className="p-2 rounded-lg bg-stone-800 hover:bg-amber-900 text-stone-300 hover:text-amber-300 border border-stone-700 transition-all active:scale-95"
              title="Next Quote"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
