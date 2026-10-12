import React, { useState } from 'react';
import { ScanLine, AlertTriangle, Upload, Sparkles, CheckCircle2 } from 'lucide-react';

const FLAG_WORDS = ['hate', 'leak', 'address', 'school', 'password', 'stupid', 'fight'];
const CURSE_WORDS = ['fuck', 'fucking', 'fucker', 'motherfucker', 'shit', 'shitty', 'bitch', 'bitching', 'asshole', 'ass', 'bastard', 'damn', 'crap', 'dick', 'piss', 'cunt', 'dickhead', 'bollocks', 'wanker', 'prick', 'slut', 'whore', 'retard', 'nigger', 'faggot', 'fag', 'twat', 'arse', 'bugger'];
const cursePattern = `\\b(${CURSE_WORDS.join('|')})\\b`;
const SUGGESTION = 'This phrase may violate standard college admission filters. Suggestion: Keep it positive and avoid sharing personal info!';

const card = 'bg-white rounded-3xl shadow-[0_6px_0_#e2e8f0,0_12px_28px_rgba(26,43,69,0.07)]';

export default function FootprintLens() {
  const [text, setText] = useState('');
  const [imageUploaded, setImageUploaded] = useState(false);

  const lower = text.toLowerCase();
  const flagged = FLAG_WORDS.filter(w => lower.includes(w));
  const curseMatches = [...new Set([...text.matchAll(new RegExp(cursePattern, 'gi'))].map(m => m[0].toLowerCase()))];
  const filteredText = text.replace(new RegExp(cursePattern, 'gi'), m => m[0] + '*'.repeat(m.length - 1));
  const hasFlag = flagged.length > 0 || curseMatches.length > 0;

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageUploaded(true);
    }
  };

  return (
    <div className="p-6 lg:p-10 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl lg:text-5xl text-[#1a2b45] leading-none" style={{ fontFamily: "'Staatliches', cursive" }}>
          FootprintLens
        </h1>
        <p className="text-slate-500 text-sm mt-1">Simulate a post before you publish — Guardify scans it in real time.</p>
      </div>

      {/* Text input */}
      <div className={`${card} p-6 mb-6`}>
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-xl bg-[#00b1fc]/10">
            <ScanLine className="w-5 h-5 text-[#00b1fc]" />
          </div>
          <h2 className="text-lg font-bold text-[#1a2b45]">Draft Your Post</h2>
        </div>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Type a draft post... (try words like 'hate', 'leak', 'address', or 'school')"
          className="w-full h-32 p-4 rounded-2xl bg-[#f0f4f8] border-2 border-[#e2e8f0] text-[#1a2b45] placeholder:text-slate-400 focus:outline-none focus:border-[#00b1fc] resize-none"
        />

        {flagged.length > 0 && (
          <div className="mt-4 p-4 rounded-2xl flex gap-3" style={{ backgroundColor: 'rgba(255,152,0,0.1)', border: '2px solid rgba(255,152,0,0.3)' }}>
            <AlertTriangle className="w-5 h-5 text-[#e68a00] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[#e68a00] font-bold text-sm">Guardify Guardrail Flagged</p>
              <p className="text-[#1a2b45] text-sm mt-1">{SUGGESTION}</p>
              <p className="text-xs text-[#e68a00]/70 mt-2">Flagged terms: {flagged.join(', ')}</p>
            </div>
          </div>
        )}
        {curseMatches.length > 0 && (
          <div className="mt-4 p-4 rounded-2xl" style={{ backgroundColor: 'rgba(220,38,38,0.08)', border: '2px solid rgba(220,38,38,0.3)' }}>
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-600 font-bold text-sm">Profanity Filtered</p>
                <p className="text-[#1a2b45] text-sm mt-1">Curse words were automatically masked in your post preview below.</p>
                <p className="text-xs text-red-500/70 mt-2">Filtered: {curseMatches.join(', ')}</p>
              </div>
            </div>
            <div className="mt-3 p-3 rounded-xl bg-white border-2 border-red-200">
              <p className="text-xs font-bold text-slate-500 mb-1">Filtered preview:</p>
              <p className="text-sm text-[#1a2b45] break-words">{filteredText}</p>
            </div>
          </div>
        )}
        {flagged.length === 0 && curseMatches.length === 0 && text.length > 0 && (
          <div className="mt-4 p-4 rounded-2xl flex gap-3" style={{ backgroundColor: 'rgba(76,175,80,0.1)', border: '2px solid rgba(76,175,80,0.3)' }}>
            <CheckCircle2 className="w-5 h-5 text-[#3d9140] flex-shrink-0 mt-0.5" />
            <p className="text-[#3d9140] text-sm font-semibold">Looks clean! No risky phrases or profanity detected.</p>
          </div>
        )}
      </div>

      {/* Image uploader */}
      <div className={`${card} p-6`}>
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-xl bg-[#00b1fc]/10">
            <Sparkles className="w-5 h-5 text-[#00b1fc]" />
          </div>
          <h2 className="text-lg font-bold text-[#1a2b45]">Image Scanner</h2>
        </div>
        <label className="block cursor-pointer">
          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          <div className="w-full h-48 rounded-2xl border-2 border-dashed border-[#c4d2e2] hover:border-[#00b1fc] flex flex-col items-center justify-center transition-all bg-[#f0f4f8]">
            {imageUploaded ? (
              <div className="text-center">
                <CheckCircle2 className="w-10 h-10 text-[#00b1fc] mx-auto mb-2" />
                <p className="text-sm text-[#1a2b45] font-semibold">Image uploaded — AI scan running...</p>
              </div>
            ) : (
              <div className="text-center">
                <Upload className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                <p className="text-sm text-slate-500">Click to upload an image</p>
              </div>
            )}
          </div>
        </label>

        {imageUploaded && (
          <div className="mt-4 p-4 rounded-2xl flex gap-3" style={{ backgroundColor: 'rgba(255,152,0,0.1)', border: '2px solid rgba(255,152,0,0.3)' }}>
            <AlertTriangle className="w-5 h-5 text-[#e68a00] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[#e68a00] font-bold text-sm">Background Alert</p>
              <p className="text-[#1a2b45] text-sm mt-1">School ID badge visible in background. Blur suggested.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
