import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Droplets, 
  Radio, 
  Flame, 
  Maximize2, 
  Tv, 
  Zap, 
  CheckCircle2, 
  HeartHandshake 
} from 'lucide-react';
import { 
  playScissorSnip, 
  playWaterSpray, 
  startHeadMassageRumble, 
  stopHeadMassageRumble, 
  playRadioTuningStatic, 
  playChaiSipSound 
} from '../lib/soundSynth';

interface SaloneMirrorWorkstationProps {
  onActionFeedback: (msg: string) => void;
  activeMassage: boolean;
  setActiveMassage: (val: boolean) => void;
}

export const SaloneMirrorWorkstation: React.FC<SaloneMirrorWorkstationProps> = ({
  onActionFeedback,
  activeMassage,
  setActiveMassage
}) => {
  const [filterMode, setFilterMode] = useState<'normal' | 'sepia' | 'vhs' | 'golden'>('golden');
  const [sprayMistActive, setSprayMistActive] = useState(false);
  const [hairParticles, setHairParticles] = useState<{ id: number; left: number; top: number; rot: number }[]>([]);
  const [waterDroplets, setWaterDroplets] = useState<{ id: number; x: number; y: number; size: number }[]>([]);
  const [radioTuningAngle, setRadioTuningAngle] = useState(45);
  const [chaiSteamActive, setChaiSteamActive] = useState(true);

  // Handle Scissor Snip
  const handleScissorClick = () => {
    playScissorSnip();
    onActionFeedback("✂️ Snip-Snip! 'Bhaiya, piche se zyada chote mat karna!'");

    // Spawn falling hair particles
    const newParticles = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      left: 30 + Math.random() * 40,
      top: 20 + Math.random() * 30,
      rot: Math.random() * 360,
    }));
    setHairParticles(prev => [...prev, ...newParticles]);

    setTimeout(() => {
      setHairParticles(prev => prev.filter(p => !newParticles.some(np => np.id === p.id)));
    }, 1200);
  };

  // Handle Water Spray
  const handleSprayClick = () => {
    playWaterSpray();
    setSprayMistActive(true);
    onActionFeedback("🚿 Pssst-Pssst! Fresh water mist sprayed on hair & mirror!");

    // Spawn water droplets on mirror glass
    const newDroplets = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 70,
      size: 4 + Math.random() * 8,
    }));
    setWaterDroplets(prev => [...prev, ...newDroplets]);

    setTimeout(() => {
      setSprayMistActive(false);
    }, 800);

    // Fade droplets after 4s
    setTimeout(() => {
      setWaterDroplets(prev => prev.slice(6));
    }, 4000);
  };

  // Handle Head Massage Toggle
  const handleMassageToggle = () => {
    if (activeMassage) {
      stopHeadMassageRumble();
      setActiveMassage(false);
      onActionFeedback("💆‍♂️ Head massage paused. 'Kaisa laga thanda thanda cool cool?'");
    } else {
      startHeadMassageRumble();
      setActiveMassage(true);
      onActionFeedback("💆‍♂️ VVIP Navratna Head Massage Activated! Feel the relaxing vibrations...");
    }
  };

  // Handle Radio Tuning Knob
  const handleRadioClick = () => {
    playRadioTuningStatic();
    setRadioTuningAngle(prev => (prev + 45) % 360);
    onActionFeedback("📻 Radio Tuned! 'Aap sun rahe hain 98.3 FM Evergreen Chacha Hits!'");
  };

  // Handle Chai Sip
  const handleChaiClick = () => {
    playChaiSipSound();
    onActionFeedback("☕ Ahhh! Hot Adrak Cutting Chai sip! 'Chai thandi nahi honi chahiye Ramu!'");
  };

  return (
    <div className="relative w-full my-6 px-4 sm:px-8 max-w-7xl mx-auto">
      
      {/* Outer Salone Wall Frame */}
      <div className={`relative rounded-3xl bg-wood-pattern border-4 border-amber-900/80 p-6 sm:p-10 shadow-2xl overflow-hidden transition-transform duration-100 ${
        activeMassage ? 'vibrate-active' : ''
      }`}>

        {/* Ambient Top Mirror Halogen Spotlights */}
        <div className="flex justify-between items-center mb-4 px-6">
          <div className="w-12 h-6 rounded-t-full bg-amber-400/80 shadow-[0_0_20px_rgba(251,191,36,0.8)] border border-amber-200" />
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-900/60 border border-amber-600/40 text-amber-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
            <span>ROYAL MIRROR REFLECTION</span>
          </div>
          <div className="w-12 h-6 rounded-t-full bg-amber-400/80 shadow-[0_0_20px_rgba(251,191,36,0.8)] border border-amber-200" />
        </div>

        {/* Mirror Frame */}
        <div className="relative rounded-2xl border-8 border-amber-950 shadow-[inset_0_0_50px_rgba(0,0,0,0.9)] bg-stone-900 overflow-hidden">
          
          {/* Brass Mirror Frame Corner Rivets */}
          <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-amber-500 border border-amber-300 z-30 shadow-md" />
          <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-amber-500 border border-amber-300 z-30 shadow-md" />
          <div className="absolute bottom-2 left-2 w-3 h-3 rounded-full bg-amber-500 border border-amber-300 z-30 shadow-md" />
          <div className="absolute bottom-2 right-2 w-3 h-3 rounded-full bg-amber-500 border border-amber-300 z-30 shadow-md" />

          {/* Mirror Filter Effect Overlays */}
          <div className={`relative min-h-[360px] sm:min-h-[440px] flex flex-col justify-between p-6 sm:p-10 transition-all duration-500 ${
            filterMode === 'sepia' ? 'sepia contrast-125 brightness-90 bg-amber-950/40' :
            filterMode === 'vhs' ? 'hue-rotate-15 contrast-150 saturate-150 bg-indigo-950/30' :
            filterMode === 'golden' ? 'bg-gradient-to-b from-amber-900/30 via-stone-900/60 to-amber-950/80' :
            'bg-stone-900/80'
          }`}>

            {/* Mirror Sheen / Reflection Line */}
            <div className="absolute -top-10 -left-10 w-96 h-[600px] bg-gradient-to-r from-transparent via-white/10 to-transparent transform rotate-45 pointer-events-none" />

            {/* Water Mist Particle Overlay */}
            {sprayMistActive && (
              <div className="absolute inset-0 bg-blue-400/20 backdrop-blur-[2px] z-20 pointer-events-none animate-pulse flex items-center justify-center">
                <div className="text-blue-200 text-sm font-mono flex items-center gap-2 bg-stone-900/80 px-4 py-2 rounded-full border border-blue-400/50">
                  <Droplets className="w-4 h-4 text-blue-400 animate-bounce" />
                  Water Mist Spray Effect Active...
                </div>
              </div>
            )}

            {/* Water Droplets on Mirror */}
            {waterDroplets.map(d => (
              <div
                key={d.id}
                className="absolute rounded-full bg-white/40 border border-white/60 shadow-inner z-20 pointer-events-none transition-opacity duration-1000"
                style={{
                  left: `${d.x}%`,
                  top: `${d.y}%`,
                  width: `${d.size}px`,
                  height: `${d.size * 1.2}px`,
                }}
              />
            ))}

            {/* Falling Hair Particle Snippets */}
            {hairParticles.map(p => (
              <div
                key={p.id}
                className="absolute w-3 h-0.5 bg-amber-900 border-b border-stone-950 z-20 pointer-events-none transition-all duration-1000 ease-in"
                style={{
                  left: `${p.left}%`,
                  top: `${p.top + 40}%`,
                  transform: `rotate(${p.rot}deg)`,
                  opacity: 0.8,
                }}
              />
            ))}

            {/* Massage Vibration Ring Effect */}
            {activeMassage && (
              <div className="absolute inset-0 z-10 pointer-events-none border-4 border-amber-500/30 rounded-xl animate-ping" />
            )}

            {/* Mirror Top HUD / Filter Controls */}
            <div className="relative z-20 flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-amber-300/90 font-semibold uppercase tracking-wider bg-amber-950/80 px-3 py-1 rounded-full border border-amber-700/50">
                  🪞 Salone Mirror Filter:
                </span>
              </div>

              {/* Filter Buttons */}
              <div className="flex items-center gap-1.5 bg-stone-950/80 p-1 rounded-xl border border-stone-800">
                <button
                  onClick={() => setFilterMode('golden')}
                  className={`px-2.5 py-1 text-xs rounded-lg font-mono transition-all ${
                    filterMode === 'golden' 
                      ? 'bg-amber-500 text-stone-950 font-bold shadow-md' 
                      : 'text-stone-300 hover:text-amber-300'
                  }`}
                >
                  ✨ Golden Hour
                </button>
                <button
                  onClick={() => setFilterMode('sepia')}
                  className={`px-2.5 py-1 text-xs rounded-lg font-mono transition-all ${
                    filterMode === 'sepia' 
                      ? 'bg-amber-600 text-stone-950 font-bold shadow-md' 
                      : 'text-stone-300 hover:text-amber-300'
                  }`}
                >
                  📻 70s Sepia
                </button>
                <button
                  onClick={() => setFilterMode('vhs')}
                  className={`px-2.5 py-1 text-xs rounded-lg font-mono transition-all ${
                    filterMode === 'vhs' 
                      ? 'bg-indigo-600 text-white font-bold shadow-md' 
                      : 'text-stone-300 hover:text-indigo-300'
                  }`}
                >
                  📺 90s VHS
                </button>
                <button
                  onClick={() => setFilterMode('normal')}
                  className={`px-2.5 py-1 text-xs rounded-lg font-mono transition-all ${
                    filterMode === 'normal' 
                      ? 'bg-stone-700 text-white font-bold shadow-md' 
                      : 'text-stone-300 hover:text-white'
                  }`}
                >
                  ⚪ Clean Glass
                </button>
              </div>
            </div>

            {/* Mirror Central Reflection Scene */}
            <div className="relative z-10 my-auto text-center py-6 flex flex-col items-center justify-center">
              
              {/* Retro Salon Calendar / Newspaper Clipping */}
              <div className="inline-block bg-amber-100 text-stone-900 px-4 py-2 rounded-md rotate-[-2deg] shadow-xl border border-amber-300 mb-4 font-mono text-xs max-w-xs">
                <div className="border-b border-amber-900/30 pb-1 font-bold text-amber-900 flex justify-between">
                  <span>DAILY NEWS • 1994</span>
                  <span>₹2.50</span>
                </div>
                <p className="mt-1 font-serif text-[11px] leading-tight text-stone-800">
                  "Chacha Ji's Hair Cutting Salone voted #1 in Town for Best Evergreen Music & Relaxing Malish."
                </p>
              </div>

              {/* Visual Hair Cutting Barber Chair Illustration */}
              <div className="relative my-2 group cursor-pointer" onClick={handleMassageToggle}>
                <div className="text-6xl sm:text-7xl filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.8)] transition-transform duration-300 group-hover:scale-105">
                  💈💈
                </div>
                <div className="mt-2 text-xs font-mono text-amber-300/80 bg-stone-950/80 px-3 py-1 rounded-full border border-amber-500/30 inline-block">
                  Click objects on shelf below to interact!
                </div>
              </div>

            </div>

            {/* Mirror Bottom Stickers */}
            <div className="relative z-20 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-3 text-xs font-mono text-amber-200/80">
              <span className="bg-red-950/80 border border-red-700/50 px-2.5 py-1 rounded text-red-300 font-bold">
                ⛔ NO POLITICS DISCUSSION
              </span>
              <span className="bg-emerald-950/80 border border-emerald-700/50 px-2.5 py-1 rounded text-emerald-300 font-bold">
                ✅ 100% HERBAL NAVRATNA OIL
              </span>
              <span className="bg-amber-950/80 border border-amber-700/50 px-2.5 py-1 rounded text-amber-300 font-bold">
                💰 AAJ CASH, KAL UDHAAR
              </span>
            </div>

          </div>
        </div>

        {/* WORKSTATION SHELF - BELOW THE MIRROR */}
        <div className="relative mt-6 pt-4 border-t-4 border-amber-950 bg-gradient-to-b from-stone-900 via-amber-950/80 to-stone-950 rounded-2xl p-4 sm:p-6 shadow-2xl border border-amber-700/30">
          
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-yatra text-xl text-amber-300 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              Chacha's Salone Workstation Shelf
            </h3>
            <span className="text-xs font-mono text-stone-400 hidden sm:inline-block">
              Click any tool to trigger sound & effect!
            </span>
          </div>

          {/* Grid of Interactive Salone Tools */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            
            {/* Tool 1: Scissors */}
            <button
              onClick={handleScissorClick}
              className="group relative flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl bg-stone-900/90 hover:bg-amber-950 border border-stone-700 hover:border-amber-500 shadow-lg transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <div className="text-3xl sm:text-4xl mb-1 group-hover:rotate-12 transition-transform">
                ✂️
              </div>
              <span className="font-bold text-xs text-amber-200 group-hover:text-amber-400">
                Scissors
              </span>
              <span className="text-[10px] text-stone-400 font-mono">
                Click / [S]
              </span>
            </button>

            {/* Tool 2: Water Spray */}
            <button
              onClick={handleSprayClick}
              className="group relative flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl bg-stone-900/90 hover:bg-blue-950 border border-stone-700 hover:border-blue-500 shadow-lg transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <div className="text-3xl sm:text-4xl mb-1 group-hover:-translate-y-1 transition-transform">
                🚿
              </div>
              <span className="font-bold text-xs text-blue-200 group-hover:text-blue-400">
                Water Spray
              </span>
              <span className="text-[10px] text-stone-400 font-mono">
                Click / [W]
              </span>
            </button>

            {/* Tool 3: Navratna Massager */}
            <button
              onClick={handleMassageToggle}
              className={`group relative flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl shadow-lg transition-all duration-200 active:scale-95 cursor-pointer ${
                activeMassage 
                  ? 'bg-amber-600 border-2 border-amber-300 text-stone-950 animate-bounce' 
                  : 'bg-stone-900/90 hover:bg-amber-950 border border-stone-700 hover:border-amber-500'
              }`}
            >
              <div className="text-3xl sm:text-4xl mb-1 group-hover:scale-110 transition-transform">
                💆‍♂️
              </div>
              <span className="font-bold text-xs text-amber-200 group-hover:text-amber-400">
                Head Massage
              </span>
              <span className="text-[10px] text-stone-400 font-mono">
                {activeMassage ? 'ON (Vibrating)' : 'Click / [M]'}
              </span>
            </button>

            {/* Tool 4: Steaming Cutting Chai */}
            <button
              onClick={handleChaiClick}
              className="group relative flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl bg-stone-900/90 hover:bg-amber-950 border border-stone-700 hover:border-amber-500 shadow-lg transition-all duration-200 active:scale-95 cursor-pointer"
            >
              {/* Rising Steam Particles */}
              <div className="absolute -top-3 flex gap-1 z-10 pointer-events-none">
                <span className="w-1.5 h-3 bg-amber-200/60 rounded-full steam-particle" />
                <span className="w-1.5 h-3 bg-amber-200/60 rounded-full steam-particle delay-300" />
              </div>

              <div className="text-3xl sm:text-4xl mb-1 group-hover:scale-110 transition-transform">
                ☕
              </div>
              <span className="font-bold text-xs text-amber-200 group-hover:text-amber-400">
                Cutting Chai
              </span>
              <span className="text-[10px] text-stone-400 font-mono">
                Click / [C]
              </span>
            </button>

            {/* Tool 5: Vintage Cassette Radio */}
            <button
              onClick={handleRadioClick}
              className="group relative flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl bg-stone-900/90 hover:bg-amber-950 border border-stone-700 hover:border-amber-500 shadow-lg transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <div 
                className="text-3xl sm:text-4xl mb-1 transition-transform duration-300"
                style={{ transform: `rotate(${radioTuningAngle}deg)` }}
              >
                📻
              </div>
              <span className="font-bold text-xs text-amber-200 group-hover:text-amber-400">
                Radio Dial
              </span>
              <span className="text-[10px] text-stone-400 font-mono">
                Tune / [R]
              </span>
            </button>

            {/* Tool 6: Herbal Hair Tonic */}
            <button
              onClick={() => onActionFeedback("🧴 Navratna Cool Oil applied! 'Sar thanda... dimaag shant!'")}
              className="group relative flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl bg-stone-900/90 hover:bg-emerald-950 border border-stone-700 hover:border-emerald-500 shadow-lg transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <div className="text-3xl sm:text-4xl mb-1 group-hover:scale-110 transition-transform">
                🧴
              </div>
              <span className="font-bold text-xs text-emerald-200 group-hover:text-emerald-400">
                Cool Oil
              </span>
              <span className="text-[10px] text-stone-400 font-mono">
                Thanda Oil
              </span>
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};
