import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Shield, LayoutDashboard, ScanLine, Gift, FileText, Menu, X } from 'lucide-react';

const navItems = [
  { to: '/app', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/app/footprint-lens', label: 'FootprintLens', icon: ScanLine },
  { to: '/app/rewards', label: 'Safe to Earn', icon: Gift },
  { to: '/app/plan-report', label: 'Plan & Report', icon: FileText },
];

const blockShadow = 'shadow-[0_6px_0_#e2e8f0,0_10px_24px_rgba(26,43,69,0.06)]';

export default function Layout() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const NavLinks = () => (
    <nav className="flex flex-col gap-2.5">
      {navItems.map(({ to, label, icon: Icon }) => {
        const active = location.pathname === to;
        return (
          <Link
            key={to}
            to={to}
            onClick={() => setOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
              active
                ? 'bg-[#00b1fc] text-white shadow-[0_5px_0_#0084bd]'
                : 'bg-white text-[#1a2b45] hover:-translate-y-0.5 ' + blockShadow
            }`}
          >
            <Icon className="w-5 h-5" />
            {label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen text-[#1a2b45]">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-full w-64 flex-col p-5 z-30">
        <div className="flex items-center gap-2.5 mb-6 px-2">
          <div className="p-2 rounded-2xl bg-white shadow-[0_5px_0_#e2e8f0]">
            <Shield className="w-7 h-7 text-[#00b1fc]" />
          </div>
          <span className="text-2xl tracking-wide text-[#1a2b45]" style={{ fontFamily: "'Staatliches', cursive" }}>
            Guardify
          </span>
        </div>
        <NavLinks />
        <Link
          to="/"
          className="mt-auto flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-bold text-[#1a2b45] bg-white hover:-translate-y-0.5 transition-all"
        >
          <Shield className="w-4 h-4 text-[#0084bd]" />
          Back to Landing
        </Link>
      </aside>

      {/* Mobile header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 h-16 bg-white/90 backdrop-blur border-b border-[#e2e8f0]">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-white shadow-[0_3px_0_#e2e8f0]">
            <Shield className="w-5 h-5 text-[#00b1fc]" />
          </div>
          <span className="text-xl text-[#1a2b45]" style={{ fontFamily: "'Staatliches', cursive" }}>Guardify</span>
        </div>
        <button onClick={() => setOpen(!open)} className="p-2 text-[#1a2b45]">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-30 bg-black/30" onClick={() => setOpen(false)}>
          <div className="absolute right-0 top-0 h-full w-64 bg-[#f0f4f8] p-5 pt-20" onClick={e => e.stopPropagation()}>
            <NavLinks />
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="lg:ml-64 pt-16 lg:pt-0 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
