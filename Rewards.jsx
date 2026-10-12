import React, { useState } from 'react';
import { Gift, CheckCircle2 } from 'lucide-react';

const rewards = [
  { brand: 'Chipotle', desc: '$5 Gift Card', cost: 500, emoji: '🌯', grad: 'linear-gradient(180deg,#a3321a,#7a0a1f)' },
  { brand: 'Starbucks', desc: '$5 Gift Card', cost: 500, emoji: '☕', grad: 'linear-gradient(180deg,#1a7a45,#0d4d2e)' },
  { brand: 'Roblox', desc: '400 Robux', cost: 400, emoji: '🎮', grad: 'linear-gradient(180deg,#6b1290,#3a0a5e)' },
];

const card = 'bg-white rounded-3xl shadow-[0_6px_0_#e2e8f0,0_12px_28px_rgba(26,43,69,0.07)]';

export default function Rewards() {
  const [points, setPoints] = useState(450);
  const [redeemed, setRedeemed] = useState(null);

  const redeem = (brand, cost) => {
    if (points < cost) return;
    setPoints(p => p - cost);
    setRedeemed(brand);
    setTimeout(() => setRedeemed(null), 3500);
  };

  const nextMilestone = 500;
  const progress = Math.min((points / nextMilestone) * 100, 100);

  return (
    <div className="p-6 lg:p-10 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl lg:text-5xl text-[#1a2b45] leading-none" style={{ fontFamily: "'Staatliches', cursive" }}>
          Safe to Earn
        </h1>
        <p className="text-slate-500 text-sm mt-1">Stay safe online, earn real rewards.</p>
      </div>

      {/* Points balance */}
      <div className={`${card} overflow-hidden mb-6`}>
        <div className="bg-[#00b1fc] px-6 py-5 flex items-center justify-between">
          <div>
            <p className="text-white/80 text-sm font-semibold">Your Balance</p>
            <p className="text-5xl text-white leading-none" style={{ fontFamily: "'Staatliches', cursive" }}>
              {points} <span className="text-xl">pts</span>
            </p>
          </div>
          <div className="p-3 rounded-2xl bg-white/20">
            <Gift className="w-8 h-8 text-white" />
          </div>
        </div>
        <div className="p-6">
          <div className="flex justify-between text-xs text-slate-500 font-semibold mb-2">
            <span>Progress to next reward</span>
            <span>{points} / {nextMilestone}</span>
          </div>
          <div className="h-3.5 rounded-full bg-[#e2e8f0] overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${progress}%`, background: 'linear-gradient(90deg,#00b1fc,#4caf50)' }}
            />
          </div>
        </div>
      </div>

      {redeemed && (
        <div className="mb-6 p-4 rounded-2xl flex items-center gap-3" style={{ backgroundColor: 'rgba(76,175,80,0.12)', border: '2px solid rgba(76,175,80,0.3)' }}>
          <CheckCircle2 className="w-5 h-5 text-[#3d9140]" />
          <p className="text-[#3d9140] font-bold">Reward Redeemed! Code sent to email.</p>
        </div>
      )}

      {/* Reward grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {rewards.map(({ brand, desc, cost, emoji, grad }) => {
          const canAfford = points >= cost;
          return (
            <div key={brand} className={`${card} overflow-hidden hover:-translate-y-1.5 transition-all`}>
              <div className="h-32 flex items-center justify-center text-6xl" style={{ background: grad }}>
                {emoji}
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-[#1a2b45] mb-1">{brand}</h3>
                <p className="text-sm text-slate-500 mb-4">{desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[#00b1fc] font-bold">{cost} pts</span>
                  <button
                    onClick={() => redeem(brand, cost)}
                    disabled={!canAfford}
                    className="px-5 py-2.5 rounded-xl text-sm font-bold transition-all active:translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={
                      canAfford
                        ? { background: '#00b1fc', color: '#fff', boxShadow: '0 4px 0 #0084bd' }
                        : { background: '#e2e8f0', color: '#94a3b8' }
                    }
                  >
                    {canAfford ? 'Redeem' : 'Not enough'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
