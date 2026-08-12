import React, { useState, useEffect } from 'react';
import bgPhoto from './assets/images/luxury_salone_emerald_bg_1786548461717.jpg';
import { SaloneHeader } from './components/SaloneHeader';
import { SaloneMirrorWorkstation } from './components/SaloneMirrorWorkstation';
import { QuotesTicker } from './components/QuotesTicker';
import { AuthenticWallDetails } from './components/AuthenticWallDetails';
import { GlassMusicPlayer } from './components/GlassMusicPlayer';
import { 
  playScissorSnip, 
  playWaterSpray, 
  startHeadMassageRumble, 
  stopHeadMassageRumble, 
  playRadioTuningStatic, 
  playChaiSipSound 
} from './lib/soundSynth';
import { Radio, Sparkles, Heart, Coffee } from 'lucide-react';

export default function App() {
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>("✂️ Welcome to Chacha's Deluxe Salone! Press hotkeys S, W, M, R, C or Space!");
  const [activeMassage, setActiveMassage] = useState(false);

  // Trigger feedback message toast
  const triggerFeedback = (msg: string) => {
    setFeedbackMsg(msg);
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid hotkeys when typing in input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      const key = e.key.toUpperCase();
      if (key === 'S') {
        playScissorSnip();
        triggerFeedback("✂️ [S] Scissor Snip! 'Bhaiya side locks thodi sharp rakhu?'");
      } else if (key === 'W') {
        playWaterSpray();
        triggerFeedback("🚿 [W] Water Mist Sprayed! Refreshing salon spray!");
      } else if (key === 'M') {
        if (activeMassage) {
          stopHeadMassageRumble();
          setActiveMassage(false);
          triggerFeedback("💆‍♂️ [M] Head Massage Paused.");
        } else {
          startHeadMassageRumble();
          setActiveMassage(true);
          triggerFeedback("💆‍♂️ [M] VVIP Navratna Head Massage Activated!");
        }
      } else if (key === 'R') {
        playRadioTuningStatic();
        triggerFeedback("📻 [R] Radio Tuned to 98.3 FM Retro Hits!");
      } else if (key === 'C') {
        playChaiSipSound();
        triggerFeedback("☕ [C] Hot Cutting Chai Sip! 'Ek garam adrak chai!'");
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeMassage]);

  return (
    <div className="relative min-h-screen bg-salon-tile text-stone-100 font-sans pb-32 selection:bg-amber-500 selection:text-stone-900 overflow-x-hidden">
      
      {/* Realistic Vintage Salone Background Photo Overlay */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center opacity-35 mix-blend-overlay pointer-events-none transition-opacity duration-1000"
        style={{ backgroundImage: `url(${bgPhoto})` }}
      />
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-stone-950/80 via-stone-950/40 to-stone-950/90 pointer-events-none" />

      <div className="relative z-10">
        {/* Action Feedback Banner Toast at top */}
        {feedbackMsg && (
          <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-stone-900/90 border-2 border-amber-500/80 text-amber-300 font-mono text-xs sm:text-sm font-semibold shadow-2xl backdrop-blur-md animate-bounce flex items-center gap-2 max-w-md text-center">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{feedbackMsg}</span>
          </div>
        )}

        {/* Main Salone Header */}
        <SaloneHeader 
          onTriggerAction={(key) => {
            const keyEvent = new KeyboardEvent('keydown', { key });
            window.dispatchEvent(keyEvent);
          }}
          activeMassage={activeMassage}
        />

        {/* Hero Workstation & Salone Mirror */}
        <SaloneMirrorWorkstation 
          onActionFeedback={triggerFeedback}
          activeMassage={activeMassage}
          setActiveMassage={setActiveMassage}
        />

        {/* Rotating Nostalgic Quotes Ticker */}
        <QuotesTicker />

        {/* Authentic Salone Details: Price Board, Rules, Guarantee */}
        <AuthenticWallDetails onActionFeedback={triggerFeedback} />

        {/* Footer Notes */}
        <footer className="w-full text-center py-8 px-4 text-xs font-mono text-amber-300/60 space-y-2">
          <p className="flex items-center justify-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for Indian 90s/2000s Barber Shop Nostalgia • <Coffee className="w-3.5 h-3.5 text-amber-400" /> "Chacha Vibes Only"
          </p>
          <p className="text-[10px] text-stone-500">
            Playlist Source: YouTube PLbmMrWAisRjw • Web Audio FX Synthesizer Included
          </p>
        </footer>

        {/* Fixed Glassmorphism Bottom Music Player */}
        <GlassMusicPlayer onActionFeedback={triggerFeedback} />
      </div>

    </div>
  );
}

