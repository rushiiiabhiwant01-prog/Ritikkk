import React from 'react';
import { Radio, Volume2, Sparkles, Clock, MapPin, Users } from 'lucide-react';

interface SaloneHeaderProps {
  onTriggerAction: (actionKey: string) => void;
  activeMassage: boolean;
}

export const SaloneHeader: React.FC<SaloneHeaderProps> = ({ onTriggerAction, activeMassage }) => {
  return (
    <header className="relative w-full z-20 pt-4 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Top Banner with Barber Poles & Vintage Neon Signboard */}
      <div className="relative rounded-2xl bg-gradient-to-r from-amber-950/90 via-stone-900/95 to-amber-950/90 border-2 border-amber-600/40 p-4 sm:p-6 shadow-2xl backdrop-blur-xl overflow-hidden">
        
        {/* Subtle background glow */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-96 h-32 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          
          {/* Left Barber Pole */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="w-5 h-20 sm:h-24 rounded-full border-2 border-stone-300 barber-pole-bg shadow-md overflow-hidden relative" />
            <div className="hidden xl:flex flex-col text-xs text-amber-200/80 font-mono space-y-1">
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                SALONE OPEN
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                Est. 1988
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                Gali No. 4, Market
              </span>
            </div>
          </div>

          {/* Central Title */}
          <div className="text-center flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wider uppercase mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Royal Hair Cutting & Special Radio</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-yatra tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 neon-title-glow drop-shadow-lg my-1">
              CHACHA VIBES ONLY
            </h1>

            <p className="font-caveat text-xl sm:text-2xl text-amber-200/90 tracking-wide font-bold">
              "Thode Chote Mat Karna... Sirf Set Kar Do!" • Deluxe Barber Shop
            </p>
          </div>

          {/* Right Barber Pole & Queue Indicator */}
          <div className="flex items-center gap-3">
            <div className="hidden xl:flex flex-col text-right text-xs text-amber-200/80 font-mono space-y-1">
              <span className="flex items-center justify-end gap-1.5 text-amber-300">
                <Users className="w-3.5 h-3.5 text-amber-400" />
                Queue: 2 Unclejis waiting
              </span>
              <span className="text-stone-400">Chai Status: Hot Cutting</span>
              <span className="text-stone-400">Radio: 98.3 FM Retro</span>
            </div>
            <div className="hidden sm:block w-5 h-20 sm:h-24 rounded-full border-2 border-stone-300 barber-pole-bg shadow-md overflow-hidden relative" />
          </div>

        </div>

        {/* Interactive Keyboard Shortcuts HUD */}
        <div className="mt-4 pt-3 border-t border-amber-900/50 flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-stone-300">
          <span className="text-amber-400 font-bold uppercase tracking-wider text-[11px] mr-1">Hotkeys:</span>
          
          <button 
            onClick={() => onTriggerAction('S')}
            className="px-2.5 py-1 rounded-lg bg-stone-800/90 border border-stone-700 hover:border-amber-500 text-stone-200 hover:text-amber-300 transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
            title="Press S or click to Snip Scissors"
          >
            <kbd className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-[10px]">S</kbd>
            <span>✂️ Scissor</span>
          </button>

          <button 
            onClick={() => onTriggerAction('W')}
            className="px-2.5 py-1 rounded-lg bg-stone-800/90 border border-stone-700 hover:border-amber-500 text-stone-200 hover:text-amber-300 transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
            title="Press W or click to Spray Mist"
          >
            <kbd className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-[10px]">W</kbd>
            <span>🚿 Water Spray</span>
          </button>

          <button 
            onClick={() => onTriggerAction('M')}
            className={`px-2.5 py-1 rounded-lg border transition-all flex items-center gap-1.5 shadow-sm active:scale-95 ${
              activeMassage 
                ? 'bg-amber-600 border-amber-400 text-stone-900 font-bold animate-pulse' 
                : 'bg-stone-800/90 border-stone-700 hover:border-amber-500 text-stone-200 hover:text-amber-300'
            }`}
            title="Press M or click for Head Massage"
          >
            <kbd className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-[10px]">M</kbd>
            <span>💆‍♂️ Malish</span>
          </button>

          <button 
            onClick={() => onTriggerAction('R')}
            className="px-2.5 py-1 rounded-lg bg-stone-800/90 border border-stone-700 hover:border-amber-500 text-stone-200 hover:text-amber-300 transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
            title="Press R or click to Tune Radio Static"
          >
            <kbd className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-[10px]">R</kbd>
            <span>📻 Radio Tune</span>
          </button>

          <button 
            onClick={() => onTriggerAction('C')}
            className="px-2.5 py-1 rounded-lg bg-stone-800/90 border border-stone-700 hover:border-amber-500 text-stone-200 hover:text-amber-300 transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
            title="Press C or click to Sip Chai"
          >
            <kbd className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-[10px]">C</kbd>
            <span>☕ Chai Sip</span>
          </button>

          <button 
            onClick={() => onTriggerAction('Space')}
            className="px-2.5 py-1 rounded-lg bg-stone-800/90 border border-stone-700 hover:border-amber-500 text-stone-200 hover:text-amber-300 transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
            title="Press Space to Play/Pause Radio"
          >
            <kbd className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-[10px]">Space</kbd>
            <span>🎵 Play/Pause</span>
          </button>
        </div>

      </div>
    </header>
  );
};
