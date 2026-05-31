"use client";

import { skills } from "../../app/data";

export function SkillsApp() {
  const skillGroups = [
    { title: "Languages", rows: skills.languages },
    { title: "Frameworks", rows: skills.frameworks },
    { title: "Infrastructure", rows: skills.infrastructure },
  ];

  return (
    <div className="w-[500px] space-y-4">
      <div className="grid gap-3 md:grid-cols-2">
        {skillGroups.map((group) => (
          <div key={group.title} className="border border-[#aaa] bg-[#ddd] shadow-[inset_1px_1px_0_#fff,inset_-1px_-1px_0_#aaa]">
            <div className="border-b border-[#bbb] bg-[#bbb] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.5px] text-[#666]">
              {group.title}
            </div>
            <div className="bg-white p-3">
              <div className="flex flex-wrap gap-2">
                {group.rows.map((row) => (
                  <div key={row.name} className="border border-black bg-[#eee] px-2 py-1 text-[11px] shadow-[1px_1px_0_#000]">
                    <span className="font-bold">{row.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="border border-[#aaa] bg-[#ddd] shadow-[inset_1px_1px_0_#fff,inset_-1px_-1px_0_#aaa]">
        <div className="border-b border-[#bbb] bg-[#bbb] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.5px] text-[#666]">
          Design Principles
        </div>
        <div className="bg-white p-3 flex flex-wrap gap-2">
          {skills.design.map(d => (
            <span key={d} className="border border-[#666] bg-[#ddd] px-2 py-1 text-[10px] font-bold uppercase">{d}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
