"use client";

import { useState } from "react";
import { projects } from "../../app/data";

export function ProjectsApp() {
  const [selected, setSelected] = useState(projects[0]);
  return (
    <div className="w-[600px] space-y-4">
      <div className="grid grid-cols-3 gap-2">
        {projects.map(p => (
          <button
            key={p.id}
            onClick={() => setSelected(p)}
            className={`border p-2 text-center text-[10px] ${selected.id === p.id ? "bg-[#0000aa] text-white border-[#000080]" : "bg-white border-transparent hover:bg-zinc-100"}`}
          >
            <div className="mx-auto mb-1 h-8 w-8 border border-black bg-white" />
            {p.title}
          </button>
        ))}
      </div>
      <div className="border border-[#aaa] bg-[#ddd] shadow-[inset_1px_1px_0_#fff,inset_-1px_-1px_0_#aaa]">
        <div className="border-b border-[#bbb] bg-[#bbb] px-3 py-1 text-[11px] font-bold uppercase text-[#666]">{selected.title}</div>
        <div className="bg-white p-4">
          <div className="text-[10px] font-bold text-[#666] mb-1">{selected.type}</div>
          <div className="text-[12px] leading-6 mb-3">{selected.description}</div>
          <div className="flex flex-wrap gap-1">
            {selected.tags.map(t => (
              <span key={t} className="border border-[#666] bg-[#ddd] px-2 py-0.5 text-[9px] font-bold">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
