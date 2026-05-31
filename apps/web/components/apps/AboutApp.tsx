"use client";

import { profile, details } from "../../app/data";

function Avatar() {
  return (
    <svg width="48" height="48" viewBox="0 0 16 16" className="pixelated-avatar" aria-hidden="true">
      <rect width="16" height="16" fill="#ddd" />
      <rect x="4" y="1" width="8" height="2" fill="#000" />
      <rect x="3" y="2" width="10" height="1" fill="#000" />
      <rect x="3" y="3" width="10" height="7" fill="#ffd5a8" />
      <rect x="2" y="4" width="1" height="5" fill="#ffd5a8" />
      <rect x="13" y="4" width="1" height="5" fill="#ffd5a8" />
      <rect x="5" y="5" width="2" height="2" fill="#fff" />
      <rect x="9" y="5" width="2" height="2" fill="#fff" />
      <rect x="5" y="6" width="1" height="1" fill="#222" />
      <rect x="9" y="6" width="1" height="1" fill="#222" />
      <rect x="7" y="7" width="1" height="1" fill="#c09070" />
      <rect x="5" y="9" width="1" height="1" fill="#000" />
      <rect x="10" y="9" width="1" height="1" fill="#000" />
      <rect x="6" y="10" width="4" height="1" fill="#000" />
      <rect x="6" y="10" width="4" height="2" fill="#ffd5a8" />
      <rect x="4" y="12" width="8" height="4" fill="#999" />
      <rect x="6" y="12" width="4" height="1" fill="#bbb" />
      <rect x="7" y="12" width="2" height="4" fill="#666" />
    </svg>
  );
}

export function AboutApp() {
  return (
    <div className="w-[320px] sm:w-[400px] space-y-4">
      <div className="border border-[#aaa] bg-[#ddd] shadow-[inset_1px_1px_0_#fff,inset_-1px_-1px_0_#aaa]">
        <div className="flex items-center gap-4 border-b border-[#bbb] bg-white p-4">
          <Avatar />
          <div>
            <div className="text-[16px] font-bold">{profile.name}</div>
            <div className="text-[11px] text-[#666]">{profile.role}</div>
            <div className="mt-1 text-[11px] text-[#666]">{profile.location}</div>
          </div>
        </div>
        <div className="grid gap-px bg-[#bbb] md:grid-cols-2">
          {details.map((row) => (
            <div key={row.key} className="flex items-baseline bg-white">
              <div className="min-w-[112px] border-r border-[#bbb] bg-[#ddd] px-3 py-1 text-[11px] font-bold text-[#666]">
                {row.key}
              </div>
              <div className="px-3 py-1 text-[11px] leading-relaxed">{row.value}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="border border-[#aaa] bg-[#ddd] shadow-[inset_1px_1px_0_#fff,inset_-1px_-1px_0_#aaa]">
        <div className="border-b border-[#bbb] bg-[#ddd] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.5px] text-[#666]">
          Bio
        </div>
        <div className="bg-white px-4 py-3 text-[12px] leading-6">{profile.bio}</div>
      </div>
    </div>
  );
}
