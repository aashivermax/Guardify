import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ScanLine, Gift, FileText, Zap, Check, Lock, ArrowRight, AlertTriangle, ChevronDown } from 'lucide-react';
import DotNav from '@/components/DotNav';
import Gauge from '@/components/Gauge';

const sections = [
{ id: 'hero', label: 'Home' },
{ id: 'reputation', label: 'Reputation' },
{ id: 'footprint', label: 'FootprintLens' },
{ id: 'rewards', label: 'Rewards' },
{ id: 'parents', label: 'For Parents' },
{ id: 'cta', label: 'Get Started' }];


const card = 'bg-white rounded-[2rem] shadow-[0_8px_0_#e2e8f0,0_16px_40px_rgba(26,43,69,0.08)]';

function CTAButton({ to, children, color = '#00b1fc', shadow = '#0084bd' }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white transition-all hover:-translate-y-0.5 active:translate-y-1"
      style={{ background: `linear-gradient(180deg, ${color}dd, ${color})`, boxShadow: `0 6px 0 ${shadow}` }}>
      
      {children}
      <ArrowRight className="w-5 h-5" />
    </Link>);

}

export default function Landing() {
  return (
    <div className="min-h-screen text-[#1a2b45]">
      <DotNav sections={sections} />

      {/* HERO */}
      <section id="hero" className="min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center">
        <div className="mb-6 p-4 rounded-3xl bg-white shadow-[0_8px_0_#e2e8f0,0_16px_40px_rgba(26,43,69,0.1)]">
          <img src="https://media.base44.com/images/public/6a565d29347b8ccef0d3fe68/984857bc5_1784052508648-2f831b6f-489e-4d6c-a0e6-6510517d170b-removebg-preview.png"

          alt="Guardify shield"
          className="w-40 h-40 object-contain" />
          
        </div>
        <h1 className="text-6xl sm:text-8xl text-[#1a2b45] mb-4" style={{ fontFamily: "'Staatliches', cursive" }}>
          Guardify
        </h1>
        <p className="text-xl sm:text-2xl text-[#1a2b45] font-bold max-w-xl mb-2">
          Your digital reputation, guarded & gamified.
        </p>
        <p className="text-slate-500 max-w-lg mb-8">The browser extension that helps students post smarter, stay safe, and earn real rewards, one scan at a time.

        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <CTAButton to="/app" color="#4caf50" shadow="#3d9140">
            Enter the App
          </CTAButton>
        </div>
        <div className="mt-16 flex flex-col items-center text-slate-400 animate-bounce">
          <span className="text-xs font-bold uppercase tracking-widest mb-1">Scroll to explore</span>
          <ChevronDown className="w-5 h-5" />
        </div>
      </section>

      {/* REPUTATION */}
      <section id="reputation" className="min-h-screen flex items-center px-6 py-20">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-10 items-center w-full">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00b1fc]/10 text-[#00b1fc] text-xs font-bold mb-4">
              <Shield className="w-4 h-4" /> 01 — Reputation
            </div>
            <h2 className="text-4xl sm:text-5xl text-[#1a2b45] mb-4" style={{ fontFamily: "'Staatliches', cursive" }}>
              Your Reputation, Visualized
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Guardify scans your posts, images, and web presence to build a real-time <b>Digital Reputation Score</b> — like a credit score for your online self.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Run a Deep Audit anytime and watch your score climb as you build a cleaner footprint.
            </p>
          </div>
          <div className={`${card} overflow-hidden`}>
            <div className="bg-[#00b1fc] px-6 py-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-white" />
              <span className="text-white font-bold" style={{ fontFamily: "'Staatliches', cursive" }}>Reputation Gauge</span>
            </div>
            <div className="p-8 flex flex-col items-center">
              <Gauge score={88} label="Good Standing" />
              <p className="text-center text-sm text-slate-500 mt-4">Based on recent activity across platforms.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTPRINTLENS */}
      <section id="footprint" className="min-h-screen flex items-center px-6 py-20">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-10 items-center w-full">
          <div className={`${card} p-6 order-2 lg:order-1`}>
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-xl bg-[#00b1fc]/10"><ScanLine className="w-5 h-5 text-[#00b1fc]" /></div>
              <span className="font-bold text-[#1a2b45]">Draft Post</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#f0f4f8] border-2 border-[#e2e8f0] text-slate-400 text-sm mb-3 min-h-[80px]">
              "I hate that the leak about my school address is everywhere..."
            </div>
            <div className="p-4 rounded-2xl flex gap-3" style={{ backgroundColor: 'rgba(255,152,0,0.1)', border: '2px solid rgba(255,152,0,0.3)' }}>
              <AlertTriangle className="w-5 h-5 text-[#e68a00] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[#e68a00] font-bold text-sm">Guardify Guardrail Flagged</p>
                <p className="text-[#1a2b45] text-sm mt-1">This phrase may violate college admission filters. Keep it positive!</p>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00b1fc]/10 text-[#00b1fc] text-xs font-bold mb-4">
              <ScanLine className="w-4 h-4" /> 02 — FootprintLens
            </div>
            <h2 className="text-4xl sm:text-5xl text-[#1a2b45] mb-4" style={{ fontFamily: "'Staatliches', cursive" }}>
              Think Before You Post
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Type a draft and Guardify flags risky phrases in real time — college-admission filters, personal info leaks, even school IDs hiding in your photos.
            </p>
            <p className="text-slate-600 leading-relaxed">
              It's a safety net that teaches better habits, one post at a time.
            </p>
          </div>
        </div>
      </section>

      {/* REWARDS */}
      <section id="rewards" className="min-h-screen flex items-center px-6 py-20">
        <div className="max-w-5xl mx-auto w-full">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00b1fc]/10 text-[#00b1fc] text-xs font-bold mb-4">
              <Gift className="w-4 h-4" /> 03 — Rewards
            </div>
            <h2 className="text-4xl sm:text-5xl text-[#1a2b45] mb-3" style={{ fontFamily: "'Staatliches', cursive" }}>
              Stay Safe, Earn Rewards
            </h2>
            <p className="text-slate-600 max-w-lg mx-auto">
              Every safe post earns points. Cash them in for the stuff you actually want.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5 max-w-3xl mx-auto">
            {[
            { emoji: '🌯', brand: 'Chipotle', cost: '500 pts', grad: 'linear-gradient(180deg,#a3321a,#7a0a1f)' },
            { emoji: '☕', brand: 'Starbucks', cost: '500 pts', grad: 'linear-gradient(180deg,#1a7a45,#0d4d2e)' },
            { emoji: '🎮', brand: 'Roblox', cost: '400 pts', grad: 'linear-gradient(180deg,#6b1290,#3a0a5e)' }].
            map((r) =>
            <div key={r.brand} className={`${card} overflow-hidden hover:-translate-y-1.5 transition-all`}>
                <div className="h-28 flex items-center justify-center text-5xl" style={{ background: r.grad }}>{r.emoji}</div>
                <div className="p-4 text-center">
                  <p className="font-bold text-[#1a2b45]">{r.brand}</p>
                  <p className="text-sm text-[#00b1fc] font-bold">{r.cost}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* PARENTS */}
      <section id="parents" className="min-h-screen flex items-center px-6 py-20">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-10 items-center w-full">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00b1fc]/10 text-[#00b1fc] text-xs font-bold mb-4">
              <FileText className="w-4 h-4" /> 04 — For Parents
            </div>
            <h2 className="text-4xl sm:text-5xl text-[#1a2b45] mb-4" style={{ fontFamily: "'Staatliches', cursive" }}>
              For Parents, Too
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              The <b>Weekly Sync</b> gives parents a high-level safety summary — red flags prevented and conversation starters — without ever reading a single private message.
            </p>
            <div className="flex items-center gap-3 p-4 rounded-2xl border-2 border-[#4caf50]/30 bg-[#4caf50]/5">
              <Lock className="w-5 h-5 text-[#3d9140] flex-shrink-0" />
              <p className="text-sm text-[#1a2b45]">
                <span className="text-[#3d9140] font-bold">Privacy Promise:</span> No private messages are ever tracked, stored, or shared.
              </p>
            </div>
          </div>
          <div className={`${card} overflow-hidden`}>
            <div className="bg-[#00b1fc] px-6 py-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-white" />
              <span className="text-white font-bold" style={{ fontFamily: "'Staatliches', cursive" }}>The Weekly Sync</span>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-4 rounded-2xl border-2 border-[#4caf50]/30 bg-[#4caf50]/5 text-center">
                  <p className="text-4xl text-[#3d9140]" style={{ fontFamily: "'Staatliches', cursive" }}>2</p>
                  <p className="text-xs text-slate-500 font-semibold">Red Flags Prevented</p>
                </div>
                <div className="p-4 rounded-2xl border-2 border-[#00b1fc]/30 bg-[#00b1fc]/5 text-center">
                  <p className="text-4xl text-[#00b1fc]" style={{ fontFamily: "'Staatliches', cursive" }}>14</p>
                  <p className="text-xs text-slate-500 font-semibold">Safe Posts</p>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-[#f0f4f8] border-2 border-[#e2e8f0]">
                <p className="text-xs font-bold text-[#00b1fc] mb-1">Conversation Starter</p>
                <p className="text-sm text-[#1a2b45] italic">"I'm proud of how you handled that post today, want to talk about it?"</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center">
        <div className="p-4 rounded-3xl bg-white shadow-[0_8px_0_#e2e8f0,0_16px_40px_rgba(26,43,69,0.1)] mb-6">
          <Shield className="w-14 h-14 text-[#00b1fc]" />
        </div>
        <h2 className="text-5xl sm:text-7xl text-[#1a2b45] mb-4" style={{ fontFamily: "'Staatliches', cursive" }}>
          Ready to Guardify?
        </h2>
        <p className="text-slate-600 max-w-md mb-8">
          Free forever. Upgrade to Family for $9.99/mo anytime. Your reputation is worth it.
        </p>
        <CTAButton to="/app" color="#4caf50" shadow="#3d9140">
          Enter the App
        </CTAButton>
        <p className="mt-10 text-xs text-slate-400">No credit card needed for Free Tier · Cancel anytime</p>
      </section>
    </div>);

}
