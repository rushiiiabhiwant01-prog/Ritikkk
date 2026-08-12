import React, { useState } from 'react';
import { PRICE_LIST, CHACHA_ADVICES } from '../data/playlist';
import { HelpCircle, Sparkles, CheckCircle, ShieldAlert, Award, Coffee } from 'lucide-react';

interface AuthenticWallDetailsProps {
  onActionFeedback: (msg: string) => void;
}

export const AuthenticWallDetails: React.FC<AuthenticWallDetailsProps> = ({ onActionFeedback }) => {
  const [showAdviceModal, setShowAdviceModal] = useState(false);
  const [currentAdvice, setCurrentAdvice] = useState("");

  const handleAskAdvice = () => {
    const random = CHACHA_ADVICES[Math.floor(Math.random() * CHACHA_ADVICES.length)];
    setCurrentAdvice(random);
    setShowAdviceModal(true);
    onActionFeedback("💡 Chacha Ji's Advice: " + random);
  };

  return (
    <div className="w-full my-6 px-4 sm:px-8 max-w-7xl mx-auto">
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Card 1: Salone Price Board (Chalkboard Style) */}
        <div className="rounded-2xl bg-stone-900 border-4 border-amber-900/60 p-5 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600" />
          
          <div className="flex items-center justify-between border-b border-stone-800 pb-3 mb-3">
            <h4 className="font-yatra text-xl text-amber-300 flex items-center gap-2">
              📋 SALONE PRICE LIST
            </h4>
            <span className="text-[10px] font-mono text-amber-500 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800">
              FIXED RATE 1994
            </span>
          </div>

          <div className="space-y-2.5 font-caveat text-xl">
            {PRICE_LIST.map((item, idx) => (
              <div 
                key={idx} 
                className="flex items-center justify-between border-b border-stone-800/60 pb-1.5 text-stone-200 hover:text-amber-300 transition-colors"
              >
                <span>{item.item}</span>
                <span className="font-bold text-amber-400 text-2xl">{item.price}</span>
              </div>
            ))}
          </div>

          <p className="mt-3 text-[11px] font-mono text-stone-400 text-center italic">
            * Extra ₹5 for Special Aftershave Cream Lotion
          </p>
        </div>

        {/* Card 2: Salone Rules & Authentic Nostalgia Signs */}
        <div className="rounded-2xl bg-gradient-to-br from-amber-950/60 via-stone-900 to-amber-950/80 border-2 border-amber-700/40 p-5 shadow-2xl flex flex-col justify-between">
          
          <div>
            <div className="flex items-center justify-between border-b border-amber-900/50 pb-3 mb-3">
              <h4 className="font-yatra text-xl text-amber-300 flex items-center gap-2">
                📜 SALONE NIYAM / RULES
              </h4>
              <ShieldAlert className="w-5 h-5 text-amber-500" />
            </div>

            <ul className="space-y-2.5 text-xs font-mono text-stone-300">
              <li className="flex items-start gap-2 bg-stone-950/60 p-2 rounded-lg border border-stone-800">
                <span className="text-amber-400 font-bold">1.</span>
                <span><b>Aaj Cash, Kal Udhaar:</b> Strictly no credit allowed without Chacha Ji's permission.</span>
              </li>
              <li className="flex items-start gap-2 bg-stone-950/60 p-2 rounded-lg border border-stone-800">
                <span className="text-amber-400 font-bold">2.</span>
                <span><b>Politics Ban:</b> Chunav / Rajniti pe behas karke aapas me na ladein.</span>
              </li>
              <li className="flex items-start gap-2 bg-stone-950/60 p-2 rounded-lg border border-stone-800">
                <span className="text-amber-400 font-bold">3.</span>
                <span><b>Radio Volume:</b> Radio frequency hamesha 98.3 Kishore Kumar special pe rahegi.</span>
              </li>
            </ul>
          </div>

          {/* Interactive Advice Button */}
          <button
            onClick={handleAskAdvice}
            className="mt-4 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold font-yatra tracking-wider shadow-lg hover:shadow-amber-500/20 transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <HelpCircle className="w-5 h-5" />
            <span>ASK CHACHA JI FOR ADVICE!</span>
          </button>

        </div>

        {/* Card 3: Royal Guarantee & Memory Badges */}
        <div className="rounded-2xl bg-stone-900 border-2 border-amber-700/40 p-5 shadow-2xl flex flex-col justify-between">
          
          <div>
            <div className="flex items-center justify-between border-b border-stone-800 pb-3 mb-3">
              <h4 className="font-yatra text-xl text-amber-300 flex items-center gap-2">
                🏅 CHACHA'S GUARANTEE
              </h4>
              <Award className="w-5 h-5 text-amber-400" />
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-800/40 flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-xs text-amber-200">100% Satisfied Cutting</h5>
                  <p className="text-[11px] text-stone-400 mt-0.5">
                    "Ghar jaane ke baad mummy daante gi nahi, yeh Chacha Ji ka vaada hai!"
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-800/40 flex items-start gap-3">
                <Coffee className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-xs text-amber-200">Free Special Cutting Chai</h5>
                  <p className="text-[11px] text-stone-400 mt-0.5">
                    "Har Shave + Head Massage ke saath Ramu ki Garam Adrak Chai complimentary."
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-stone-800 text-center font-caveat text-xl text-amber-300">
            "Purane Gaane • Purane Dost • Purani Yaadein"
          </div>

        </div>

      </div>

      {/* Advice Popup Modal */}
      {showAdviceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg rounded-2xl bg-stone-900 border-2 border-amber-500 p-6 shadow-2xl text-center">
            
            <div className="w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-400 text-3xl flex items-center justify-center mx-auto mb-3">
              👴🏻
            </div>

            <h3 className="font-yatra text-2xl text-amber-300 mb-1">
              CHACHA JI'S LIFE ADVICE
            </h3>
            
            <div className="my-4 p-4 rounded-xl bg-amber-950/60 border border-amber-700/50">
              <p className="font-caveat text-2xl sm:text-3xl text-amber-100 font-bold">
                "{currentAdvice}"
              </p>
            </div>

            <button
              onClick={() => setShowAdviceModal(false)}
              className="py-2.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold font-mono transition-all cursor-pointer"
            >
              Shukriya Chacha Ji! 🙏
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
