import React, { useState, useEffect } from 'react';

export default function DotNav({ sections }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observers = sections.map((s, i) => {
      const el = document.getElementById(s.id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(i); },
        { threshold: 0.5 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o && o.disconnect());
  }, [sections]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col gap-3">
      {sections.map((s, i) => (
        <button key={s.id} onClick={() => scrollTo(s.id)} className="group flex items-center gap-2 justify-end">
          <span
            className={`text-xs font-bold transition-all whitespace-nowrap ${
              active === i ? 'opacity-100 text-[#00b1fc]' : 'opacity-0 group-hover:opacity-70 text-[#1a2b45]'
            }`}
          >
            {s.label}
          </span>
          <span
            className={`rounded-full transition-all duration-300 ${
              active === i
                ? 'w-4 h-4 bg-[#00b1fc] shadow-[0_0_0_4px_rgba(0,177,252,0.2)]'
                : 'w-3 h-3 bg-[#1a2b45]/25 group-hover:bg-[#00b1fc]/50'
            }`}
          />
        </button>
      ))}
    </div>
  );
}
