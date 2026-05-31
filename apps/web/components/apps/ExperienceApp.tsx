"use client";

import { experience } from "../../app/data";

export function ExperienceApp() {
  return (
    <div className="w-[550px] border border-[#aaa] bg-[#ddd] shadow-[inset_1px_1px_0_#fff,inset_-1px_-1px_0_#aaa]">
      <div className="grid grid-cols-[140px_100px_1fr] border-b-2 border-[#aaa] bg-[#ddd] text-[10px] font-bold uppercase text-[#666]">
        <div className="px-2 py-1">Company</div>
        <div className="px-2 py-1">Date</div>
        <div className="px-2 py-1">Role</div>
      </div>
      <div className="bg-white">
        {experience.map(item => (
          <div key={item.id} className="grid grid-cols-[140px_100px_1fr] border-b border-[#eee] text-[11px]">
            <div className="px-2 py-2 border-r border-[#eee] font-bold">{item.company}</div>
            <div className="px-2 py-2 border-r border-[#eee]">{item.date}</div>
            <div className="px-2 py-2">{item.role}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
