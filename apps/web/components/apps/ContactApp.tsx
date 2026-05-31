"use client";

import { profile } from "../../app/data";

export function ContactApp() {
  const contacts = [
    { id: 'github', title: 'GitHub', value: profile.github, href: `https://${profile.github}` },
    { id: 'linkedin', title: 'LinkedIn', value: profile.linkedin, href: `https://${profile.linkedin}` },
    { id: 'instagram', title: 'Instagram', value: profile.instagram, href: `https://${profile.instagram}` },
  ];
  return (
    <div className="w-[400px] border border-[#666] bg-[#ddd] shadow-[2px_2px_0_#000]">
      <div className="bg-mac-lines h-5 border-b border-black" />
      <div className="p-4 space-y-3 bg-white">
        {contacts.map(c => (
          <div key={c.id} className="flex flex-col gap-1 border-b border-[#eee] pb-2 last:border-0">
            <span className="text-[10px] font-bold uppercase text-[#666]">{c.title}</span>
            <a href={c.href} target="_blank" className="text-[12px] text-[#0000aa] hover:underline font-mono">{c.value}</a>
          </div>
        ))}
      </div>
    </div>
  );
}
