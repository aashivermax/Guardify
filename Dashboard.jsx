import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Shield, ScanLine, Image as ImageIcon, Globe, Zap, Check, AlertTriangle } from 'lucide-react';
import Gauge from '@/components/Gauge';

const statuses = [
{ icon: ScanLine, label: 'Text Scan', value: 'Safe', tone: 'good', note: 'No offensive language or harmful content detected.' },
{ icon: ImageIcon, label: 'Image Scan', value: '1', tone: 'warn', note: '1 potential issue flagged for review.' },
{ icon: Globe, label: 'Web Footprint', value: 'Clean', tone: 'good', note: 'Minimal public exposure of sensitive information.' }];


const tone = {
  good: { color: '#4caf50', bg: 'rgba(76,175,80,0.12)', chip: '#3d9140' },
  warn: { color: '#ff9800', bg: 'rgba(255,152,0,0.12)', chip: '#e68a00' }
};

const card = 'bg-white rounded-3xl shadow-[0_6px_0_#e2e8f0,0_12px_28px_rgba(26,43,69,0.07)]';
const platforms = ['instagram', 'tiktok', 'twitter', 'snapchat'];

export default function Dashboard() {
  const [score, setScore] = useState(88);
  const [scanning, setScanning] = useState(false);
  const [auditDone, setAuditDone] = useState(false);
  const [handles, setHandles] = useState(null);
  const [editingHandles, setEditingHandles] = useState(false);
  const [draftHandles, setDraftHandles] = useState({ instagram: '', tiktok: '', twitter: '', snapchat: '' });

  useEffect(() => {
    base44.auth.me().
    then((me) => {
      const h = me?.social_handles || {};
      setHandles(h);
      setDraftHandles(Object.fromEntries(platforms.map((p) => [p, h[p] || ''])));
    }).
    catch(() => setHandles({}));
  }, []);

  const connectedCount = handles ? Object.values(handles).filter((v) => v).length : 0;
  const handleList = handles ? Object.entries(handles).filter(([, v]) => v) : [];

  const saveHandles = async () => {
    const cleaned = Object.fromEntries(
      Object.entries(draftHandles).map(([k, v]) => [k, v.replace('@', '').trim()]).filter(([, v]) => v)
    );
    setHandles(cleaned);
    setEditingHandles(false);
    try {await base44.auth.updateMe({ social_handles: cleaned });} catch {}
  };

  const runAudit = () => {
    setScanning(true);
    setAuditDone(false);
    setTimeout(() => {
      setScore((prev) => Math.min(prev + 3, 96));
      setScanning(false);
      setAuditDone(true);
    }, 2800);
  };

  const label = score >= 85 ? 'Good Standing' : score >= 70 ? 'Fair' : 'At Risk';

  return (
    <div className="p-6 lg:p-10 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 rounded-3xl bg-white shadow-[0_6px_0_#e2e8f0,0_10px_24px_rgba(26,43,69,0.07)]">
          <Shield className="w-9 h-9 text-[#00b1fc]" />
        </div>
        <div>
          <h1 className="text-4xl lg:text-5xl text-[#1a2b45] leading-none" style={{ fontFamily: "'Staatliches', cursive" }}>
            Digital Reputation
          </h1>
          <p className="text-slate-500 text-sm mt-1">How you appear online is in good hands with Guardify.</p>
        </div>
      </div>

      {/* Main grid */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Gauge card */}
        <div className={`${card} overflow-hidden`}>
          <div className="bg-[#00b1fc] px-6 py-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-white" />
            <h2 className="text-white font-bold text-lg" style={{ fontFamily: "'Staatliches', cursive" }}>
              Reputation Gauge
            </h2>
          </div>
          <div className="p-8 flex flex-col items-center">
            <Gauge score={score} label={label} scanning={scanning} />
            <p className="text-center text-sm text-slate-500 mt-5 max-w-xs">
              Your score is based on recent activity across platforms.
            </p>
          </div>
        </div>

        {/* Status modules */}
        <div className="flex flex-col gap-4">
          {statuses.map(({ icon: Icon, label: lbl, value, tone: t, note }) => {
            const s = tone[t];
            return (
              <div key={lbl} className={`${card} p-5 flex items-center gap-4`}>
                <div className="p-3 rounded-2xl flex-shrink-0" style={{ backgroundColor: s.bg, color: s.color }}>
                  {t === 'good' ? <Check className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm text-slate-500">{lbl}:</span>
                    <span className="text-lg font-bold" style={{ color: s.chip }}>{value}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{note}</p>
                </div>
                <Icon className="w-5 h-5 text-slate-300 flex-shrink-0" />
              </div>);

          })}
        </div>
      </div>

      {/* Deep Audit */}
      <div className={`${card} p-8 relative overflow-hidden`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 mb-5">
          <div>
            <h2 className="text-3xl text-[#1a2b45] mb-1" style={{ fontFamily: "'Staatliches', cursive" }}>Deep Audit</h2>
            <p className="text-slate-500 text-sm max-w-md">Scans your connected public profiles, text, images, and web presence.</p>
          </div>
          <div className="relative">
            {scanning &&
            <>
                <span className="absolute inset-0 rounded-2xl bg-[#4caf50]/40 animate-ping" />
                <span className="absolute inset-0 rounded-2xl bg-[#4caf50]/30 animate-pulse" />
              </>
            }
            <button
              onClick={runAudit}
              disabled={scanning || connectedCount === 0}
              className="relative flex items-center gap-2 px-7 py-4 rounded-2xl font-bold text-white transition-all active:translate-y-1 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                background: scanning ? '#5fbb63' : 'linear-gradient(180deg,#5fbb63,#4caf50)',
                boxShadow: scanning ? '0 4px 0 #3d9140' : '0 6px 0 #3d9140'
              }}>
              
              {scanning ?
              <>
                  <ScanLine className="w-5 h-5 animate-pulse" />
                  Scanning...
                </> :

              <>
                  <Zap className="w-5 h-5" />
                  Run Deep Audit
                </>
              }
            </button>
          </div>
        </div>

        {/* Connected profiles */}
        <div className="border-t-2 border-[#e2e8f0] pt-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-bold text-[#1a2b45]">Connected Profiles</span>
            {handles && !editingHandles &&
            <button onClick={() => setEditingHandles(true)} className="text-xs font-bold text-[#00b1fc] hover:underline">
                {connectedCount > 0 ? 'Edit' : '+ Add handles'}
              </button>
            }
          </div>

          {handles === null ?
          <p className="text-sm text-slate-400">Loading profiles...</p> :
          editingHandles ?
          <div className="space-y-3">
              {platforms.map((p) =>
            <div key={p} className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-500 w-20 capitalize">{p}</span>
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">@</span>
                    <input
                  value={draftHandles[p]}
                  onChange={(e) => setDraftHandles((d) => ({ ...d, [p]: e.target.value.replace('@', '') }))}
                  className="w-full pl-7 pr-3 py-2 rounded-xl bg-[#f0f4f8] border-2 border-[#e2e8f0] text-sm text-[#1a2b45] focus:outline-none focus:border-[#00b1fc]"
                  placeholder="username" />
                
                  </div>
                </div>
            )}
              <div className="flex gap-2 pt-1">
                <button
                onClick={saveHandles}
                className="px-5 py-2 rounded-xl text-sm font-bold text-white bg-[#00b1fc] shadow-[0_4px_0_#0084bd] active:translate-y-0.5">
                
                  Save
                </button>
                <button
                onClick={() => {
                  setEditingHandles(false);
                  setDraftHandles(Object.fromEntries(platforms.map((p) => [p, handles[p] || ''])));
                }}
                className="px-5 py-2 rounded-xl text-sm font-bold text-[#1a2b45] bg-[#e2e8f0]">
                
                  Cancel
                </button>
              </div>
            </div> :
          connectedCount === 0 ?
          <p className="text-sm text-slate-500">No profiles connected yet. Click "Add handles" to link your public socials.</p> :

          <div className="flex flex-wrap gap-2">
              {handleList.map(([platform, h]) =>
            <span key={platform} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#00b1fc]/10 text-[#00b1fc] text-sm font-bold">
                  <span className="text-xs text-[#0084bd] capitalize">{platform}</span>
                  @{h}
                </span>
            )}
            </div>
          }
        </div>

        {scanning &&
        <div className="mt-6">
            <div className="h-2.5 rounded-full bg-[#e2e8f0] overflow-hidden">
              <div className="h-full rounded-full animate-pulse" style={{ width: '70%', background: 'linear-gradient(90deg,#00b1fc,#4caf50)' }} />
            </div>
            <p className="text-xs text-[#00b1fc] mt-2 font-semibold animate-pulse">
              Scanning {handleList.map(([, h]) => `@${h}`).join(', ')} — analyzing posts, images & web presence...
            </p>
          </div>
        }
        {auditDone && !scanning &&
        <div className="mt-4 flex items-center gap-2 text-[#3d9140] text-sm font-semibold">
            <Check className="w-4 h-4" />
            Audit complete — your score improved!
          </div>
        }
      </div>
    </div>);

}
