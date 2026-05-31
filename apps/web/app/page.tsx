"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { type DesktopSectionId, DesktopIcons, type IconState } from "../components/DesktopIcons";
import { profile, stats, details, skills, projects, experience } from "./data";
import { Window } from "../components/Window";
import { BootSequence } from "../components/BootSequence";
import { TerminalApp } from "../components/TerminalApp";
import { sounds } from "../utils/sounds";

// New Extracted Apps
import { AboutApp } from "../components/apps/AboutApp";
import { SkillsApp } from "../components/apps/SkillsApp";
import { ProjectsApp } from "../components/apps/ProjectsApp";
import { ExperienceApp } from "../components/apps/ExperienceApp";
import { ContactApp } from "../components/apps/ContactApp";
import { AboutMacApp, CalculatorApp, NotePadApp } from "../components/apps/DeskAccessories";
import { FinderApp } from "../components/apps/FinderApp";

type WindowState = {
  id: string;
  type: DesktopSectionId | "terminal" | "about_mac" | "calculator" | "notepad" | "trash" | "finder";
  title: string;
  position: { x: number; y: number };
  zIndex: number;
};

const INITIAL_ICONS: IconState[] = [
  {
    id: "mac-hd",
    label: "Macintosh HD",
    type: "finder",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32">
        <rect x="2" y="4" width="28" height="24" rx="2" fill="#fff" stroke="#000" strokeWidth="1.5" />
        <rect x="2" y="4" width="28" height="6" fill="#000" />
        <circle cx="26" cy="7" r="1.5" fill="#fff" />
      </svg>
    ),
    position: { x: 850, y: 40 },
    isTrashed: false,
  },
  {
    id: "about-file",
    label: "About Me",
    type: "about",
    icon: (
      <svg width="24" height="32" viewBox="0 0 24 32">
        <path d="M2 0H16L22 6V30C22 31.1046 21.1046 32 20 32H2C0.895431 32 0 31.1046 0 30V2C0 0.895431 0.895431 0 2 0Z" fill="white" stroke="black" strokeWidth="1.5"/>
        <path d="M16 0V6H22" stroke="black" strokeWidth="1.5"/>
        <rect x="4" y="10" width="16" height="1.5" fill="black" />
        <rect x="4" y="14" width="16" height="1.5" fill="black" />
        <rect x="4" y="18" width="10" height="1.5" fill="black" />
      </svg>
    ),
    position: { x: 770, y: 40 },
    isTrashed: false,
  },
  {
    id: "trash-icon",
    label: "Trash",
    type: "trash",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32">
        <rect x="6" y="8" width="20" height="22" rx="1" fill="#fff" stroke="#000" strokeWidth="1.5" />
        <rect x="4" y="5" width="24" height="4" rx="1" fill="#ddd" stroke="#000" strokeWidth="1.5" />
        <rect x="12" y="2" width="8" height="3" rx="1" fill="#ddd" stroke="#000" strokeWidth="1.5" />
        <line x1="11" y1="12" x2="11" y2="26" stroke="#000" strokeWidth="1" />
        <line x1="16" y1="12" x2="16" y2="26" stroke="#000" strokeWidth="1" />
        <line x1="21" y1="12" x2="21" y2="26" stroke="#000" strokeWidth="1" />
      </svg>
    ),
    position: { x: 850, y: 520 },
    isTrashed: false,
  }
];

export default function Home() {
  const [booted, setBooted] = useState(false);
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [clock, setClock] = useState("12:00 PM");

  // Desktop Icons State
  const [icons, setIcons] = useState<IconState[]>(INITIAL_ICONS);

  useEffect(() => {
    const updateClock = () => {
      setClock(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    };
    updateClock();
    const timer = window.setInterval(updateClock, 10_000);
    return () => window.clearInterval(timer);
  }, []);

  const openWindow = useCallback((type: WindowState["type"]) => {
    if (type === "trash") return; // Trash doesn't open a window yet
    setWindows((prev) => {
      if (prev.find((w) => w.type === type)) {
        setActiveWindowId(prev.find((w) => w.type === type)!.id);
        return prev;
      }
      const id = Math.random().toString(36).substr(2, 9);
      const newWindow: WindowState = {
        id,
        type,
        title: type.charAt(0).toUpperCase() + type.slice(1).replace("_", " "),
        position: { x: 120 + prev.length * 20, y: 50 + prev.length * 20 },
        zIndex: prev.length + 10,
      };
      setActiveWindowId(id);
      return [...prev, newWindow];
    });
  }, []);

  const closeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
    if (activeWindowId === id) setActiveWindowId(null);
  }, [activeWindowId]);

  const focusWindow = useCallback((id: string) => {
    setWindows((prev) => {
      const maxZ = Math.max(0, ...prev.map((w) => w.zIndex));
      return prev.map((w) =>
        w.id === id ? { ...w, zIndex: maxZ + 1 } : w
      );
    });
    setActiveWindowId(id);
  }, []);

  const handlePositionChange = useCallback((id: string, x: number, y: number) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, position: { x, y } } : w)));
  }, []);

  const handleIconMove = useCallback((id: string, x: number, y: number) => {
    setIcons(prev => prev.map(icon => {
      if (icon.id === id) {
        // Trash Detection Logic
        const trash = prev.find(i => i.type === "trash");
        if (trash && id !== trash.id) {
          const dist = Math.sqrt(Math.pow(x - trash.position.x, 2) + Math.pow(y - trash.position.y, 2));
          if (dist < 40) {
            sounds.playTrash();
            return { ...icon, position: { x, y }, isTrashed: true };
          }
        }
        return { ...icon, position: { x, y } };
      }
      return icon;
    }));
  }, []);

  if (!booted) {
    return <BootSequence onComplete={() => setBooted(true)} />;
  }

  return (
    <main className="h-screen w-screen bg-[#1b1b1b] flex items-center justify-center p-4 overflow-hidden selection:bg-[#000080] selection:text-white">
      <div className="relative w-full max-w-[1000px] h-full max-h-[750px] bg-[#f0e1bf] p-4 sm:p-6 rounded-[30px] sm:rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.6),inset_0_2px_4px_rgba(255,255,255,0.8),inset_0_-4px_8px_rgba(0,0,0,0.3)] flex flex-col items-center shrink-0">
        <div className="absolute top-4 sm:top-8 left-1/2 -translate-x-1/2 w-32 sm:w-48 h-1 sm:h-1.5 bg-[#d9c8a2] rounded-full shadow-inner" />
        <div className="absolute bottom-4 sm:bottom-8 right-8 sm:right-12 w-8 sm:w-12 h-2 sm:h-3 bg-[#d9c8a2] rounded-full shadow-inner" />
        
        <div className="relative w-full h-full bg-[#1b1b1b] rounded-[8px] sm:rounded-[12px] p-2 sm:p-3 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden">
          <div className="relative flex-1 bg-[#556677] overflow-hidden rounded-[4px] border border-black cursor-default">
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />

            {/* Menu Bar */}
            <header className="absolute top-0 left-0 right-0 z-[1000] h-6 border-b border-black bg-[#ddd] text-[11px] font-bold text-black shadow-[0_1px_0_#bbb]">
              <div className="flex h-full items-stretch">
                <button className="flex w-[38px] items-center justify-center border-r border-[#aaa] text-[16px] text-black hover:bg-black hover:text-white group">
                  
                  <div className="absolute top-full left-0 hidden group-hover:block min-w-[160px] border border-black bg-[#ddd] p-1 shadow-[2px_2px_0_#000] z-[1001] text-black">
                    <div onClick={() => openWindow("about_mac")} className="px-2 py-1 hover:bg-black hover:text-white text-left font-normal cursor-default text-black">
                      About This Macintosh...
                    </div>
                    <div className="h-px bg-black my-1" />
                    <div onClick={() => openWindow("calculator")} className="px-2 py-1 hover:bg-black hover:text-white text-left font-normal cursor-default text-black">
                      Calculator
                    </div>
                    <div onClick={() => openWindow("notepad")} className="px-2 py-1 hover:bg-black hover:text-white text-left font-normal cursor-default text-black">
                      Note Pad
                    </div>
                    <div className="h-px bg-black my-1" />
                    {["Control Panels", "Scrapbook", "Puzzle"].map(item => (
                      <div key={item} className="px-2 py-1 hover:bg-black hover:text-white text-left font-normal cursor-default opacity-50 text-black">
                        {item}
                      </div>
                    ))}
                  </div>
                </button>
                {[
                  ["File", "New Window · Open · Close"],
                  ["Edit", "Undo · Cut · Copy · Paste"],
                  ["View", "by Icon · by Name"],
                  ["Special", "Clean Up Desktop · Empty Trash · Restart · Shut Down"],
                ].map(([label, hint]) => (
                  <button
                    key={label}
                    className="relative flex items-center px-3 hover:bg-black hover:text-white group text-black"
                  >
                    {label}
                    <div className="absolute top-full left-0 hidden group-hover:block min-w-[140px] border border-black bg-[#ddd] p-1 shadow-[2px_2px_0_#000] z-[1001] text-black">
                      {hint.split(" · ").map(item => (
                        <div 
                          key={item} 
                          className="px-2 py-1 hover:bg-black hover:text-white text-left font-normal cursor-default text-black"
                          onClick={() => {
                            if (item === "Restart") {
                              setWindows([]);
                              setIcons(INITIAL_ICONS);
                              setBooted(false);
                            }
                            if (item === "Empty Trash") {
                              sounds.playTrash();
                              setIcons(prev => prev.filter(i => !i.isTrashed));
                            }
                            if (item === "Clean Up Desktop") {
                              setIcons(prev => prev.map((icon, i) => ({ ...icon, position: { x: 850, y: 40 + i * 80 } })));
                            }
                            if (item === "Shut Down") {
                              if (confirm("Are you sure you want to shut down?")) window.location.reload();
                            }
                          }}
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </button>
                ))}
                <div className="ml-auto flex items-center gap-3 border-l border-[#aaa] px-4 text-[11px]">
                  <span>{clock}</span>
                </div>
              </div>
            </header>

            {/* Desktop Icons Manager */}
            <DesktopIcons 
              icons={icons} 
              onIconSelect={openWindow} 
              onIconMove={handleIconMove} 
            />

            {/* Windows Layer */}
            {windows.map((win) => (
              <Window
                key={win.id}
                id={win.id}
                title={win.title}
                position={win.position}
                zIndex={win.zIndex}
                isActive={activeWindowId === win.id}
                onClose={closeWindow}
                onFocus={focusWindow}
                onPositionChange={handlePositionChange}
              >
                {win.type === "about" && <AboutApp />}
                {win.type === "skills" && <SkillsApp />}
                {win.type === "projects" && <ProjectsApp />}
                {win.type === "experience" && <ExperienceApp />}
                {win.type === "contact" && <ContactApp />}
                {win.type === "terminal" && <TerminalApp onClose={() => closeWindow(win.id)} />}

                {win.type === "finder" && <FinderApp onOpenApp={openWindow} />}
                {win.type === "calculator" && <CalculatorApp />}
                {win.type === "notepad" && <NotePadApp />}
                {win.type === "about_mac" && <AboutMacApp />}
              </Window>
            ))}

            <footer className="absolute bottom-0 left-0 right-0 h-4 bg-[#ddd] border-t border-[#bbb] text-[9px] px-2 flex items-center text-zinc-600">
              <span>System 7.1.1 — {profile.name}</span>
              <span className="ml-4">Memory: 8,192K</span>
            </footer>
          </div>
        </div>
      </div>
    </main>
  );
}
