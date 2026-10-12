import React, { useState } from 'react';
import { Shield, Check, Zap, FileText, MessageCircle, ShieldCheck, Lock } from 'lucide-react';

const card = 'bg-white rounded-3xl shadow-[0_6px_0_#e2e8f0,0_12px_28px_rgba(26,43,69,0.07)]';

export default function PlanReport() {
  const [plan, setPlan] = useState('free');

  return (
    <div className="p-6 lg:p-10 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl lg:text-5xl text-[#1a2b45] leading-none" style={{ fontFamily: "'Staatliches', cursive" }}>
          Plan & Parent Portal
        </h1>
        <p className="text-slate-500 text-sm mt-1">Manage your plan and preview the weekly parent report.</p>
      </div>

      {/* Plan switcher */}
      <div className={`${card} p-6 mb-8`}>
        <div className="grid sm:grid-cols-2 gap-4">
          <button
            onClick={() => setPlan('free')}
            className={`text-left p-5 rounded-2xl border-2 transition-all ${plan === 'free' ? 'border-[#00b1fc] bg-[#00b1fc]/5' : 'border-[#e2e8f0] bg-[#f0f4f8] hover:-translate-y-0.5'}`}>
            
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-lg text-[#1a2b45]">Free Tier</span>
              {plan === 'free' && <Check className="w-5 h-5 text-[#00b1fc]" />}
            </div>
            <p className="text-3xl text-[#1a2b45] mb-1" style={{ fontFamily: "'Staatliches', cursive" }}>$0/mo</p>
            <p className="text-sm text-slate-500">5 scans/mo left this month</p>
          </button>

          <button
            onClick={() => setPlan('family')}
            className={`text-left p-5 rounded-2xl border-2 transition-all relative overflow-hidden ${plan === 'family' ? 'border-[#4caf50] bg-[#4caf50]/5' : 'border-[#e2e8f0] bg-[#f0f4f8] hover:-translate-y-0.5'}`}>
            
            <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-[#4caf50] text-white text-xs font-bold">
              BEST
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-lg text-[#1a2b45] flex items-center gap-2">
                Family Plan <Zap className="w-4 h-4 text-[#4caf50]" />
              </span>
              {plan === 'family' && <Check className="w-5 h-5 text-[#4caf50]" />}
            </div>
            <p className="text-3xl text-[#1a2b45] mb-1" style={{ fontFamily: "'Staatliches', cursive" }}>$9.99/mo</p>
            <p className="text-sm text-slate-500">Unlimited scans + parent reports</p>
          </button>
        </div>
      </div>

      {/* Weekly Sync Report */}
      <div className={`${card} overflow-hidden`}>
        <div className="bg-[#00b1fc] px-6 py-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-white" />
          <h2 className="text-white text-2xl" style={{ fontFamily: "'Staatliches', cursive" }}>The Weekly Sync</h2>
        </div>
        <div className="p-6 lg:p-8">
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div className="p-5 rounded-2xl border-2 border-[#4caf50]/30 bg-[#4caf50]/5">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-5 h-5 text-[#3d9140]" />
                <span className="text-sm text-slate-500 font-semibold">Red Flags Prevented</span>
              </div>
              <p className="text-5xl text-[#3d9140] leading-none" style={{ fontFamily: "'Staatliches', cursive" }}>2</p>
              <p className="text-xs text-slate-500 mt-1">This Week</p>
            </div>
            <div className="p-5 rounded-2xl border-2 border-[#00b1fc]/30 bg-[#00b1fc]/5">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-5 h-5 text-[#00b1fc]" />
                <span className="text-sm text-slate-500 font-semibold">Safe Posts Published</span>
              </div>
              <p className="text-5xl text-[#00b1fc] leading-none" style={{ fontFamily: "'Staatliches', cursive" }}>14</p>
              <p className="text-xs text-slate-500 mt-1">This Week</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl border-2 border-[#e2e8f0] bg-[#f0f4f8]">
            <div className="flex items-center gap-2 mb-3">
              <MessageCircle className="w-5 h-5 text-[#00b1fc]" />
              <h3 className="font-bold text-[#1a2b45]">Conversation Starter Guideline</h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed mb-3">
              This week, your teen encountered 2 potentially risky posts. Here's a way to start a supportive conversation:
            </p>
            <div className="p-4 rounded-xl bg-white border-2 border-[#00b1fc]/20">
              <p className="text-sm text-[#1a2b45] italic">"Hey, I noticed you almost shared something personal online today. I'm proud of how you handled it, want to talk about what made you think twice?"

              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3 p-4 rounded-2xl border-2 border-[#4caf50]/30 bg-[#4caf50]/5">
            <Lock className="w-5 h-5 text-[#3d9140] flex-shrink-0" />
            <p className="text-sm text-[#1a2b45]">
              <span className="text-[#3d9140] font-bold">Privacy Promise:</span> Guardify never tracks private messages. This report contains only high-level safety insights — no message content is ever stored or shared.
            </p>
          </div>
        </div>
      </div>
    </div>);

}
