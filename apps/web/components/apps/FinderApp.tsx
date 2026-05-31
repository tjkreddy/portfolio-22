"use client";

import React, { useState, useCallback } from "react";
import { type DesktopSectionId } from "../DesktopIcons";

interface FinderAppProps {
  onOpenApp: (type: any) => void;
}

type FinderItem = {
  id: string;
  label: string;
  type: 'folder' | 'file' | 'app';
  appType?: DesktopSectionId | "terminal" | "calculator" | "notepad" | "about_mac";
  targetPath?: string;
};

const ROOT_ITEMS: FinderItem[] = [
  { id: 'apps-f', label: 'Applications', type: 'folder', targetPath: '/Applications' },
  { id: 'docs-f', label: 'Documents', type: 'folder', targetPath: '/Documents' },
  { id: 'projects-f', label: 'Projects', type: 'app', appType: 'projects' }, // Direct link for now
  { id: 'sys-f', label: 'System Folder', type: 'folder', targetPath: '/System' },
];

const APPS_ITEMS: FinderItem[] = [
  { id: 'calc-a', label: 'Calculator', type: 'app', appType: 'calculator' },
  { id: 'note-a', label: 'Note Pad', type: 'app', appType: 'notepad' },
  { id: 'term-a', label: 'Terminal', type: 'app', appType: 'terminal' },
];

const DOCS_ITEMS: FinderItem[] = [
  { id: 'about-a', label: 'About Me', type: 'app', appType: 'about' },
  { id: 'skills-a', label: 'Skills', type: 'app', appType: 'skills' },
  { id: 'exp-a', label: 'Journey', type: 'app', appType: 'experience' },
  { id: 'cont-a', label: 'Contact', type: 'app', appType: 'contact' },
];

const SYSTEM_ITEMS: FinderItem[] = [
  { id: 'amac-a', label: 'About Mac', type: 'app', appType: 'about_mac' },
];

export function FinderApp({ onOpenApp }: FinderAppProps) {
  const [currentPath, setCurrentPath] = useState('/');
  
  const getItems = () => {
    switch (currentPath) {
      case '/Applications': return APPS_ITEMS;
      case '/Documents': return DOCS_ITEMS;
      case '/System': return SYSTEM_ITEMS;
      default: return ROOT_ITEMS;
    }
  };

  const handleItemClick = (item: FinderItem) => {
    if (item.type === 'folder' && item.targetPath) {
      setCurrentPath(item.targetPath);
    } else if (item.type === 'app' && item.appType) {
      onOpenApp(item.appType);
    }
  };

  return (
    <div className="w-[450px] bg-white min-h-[300px] flex flex-col">
      {/* Finder Header / Toolbar */}
      <div className="h-6 border-b border-black bg-zinc-100 flex items-center px-2 gap-4">
        {currentPath !== '/' && (
          <button 
            onClick={() => setCurrentPath('/')}
            className="border border-black bg-white px-2 py-0.5 text-[9px] font-bold active:bg-black active:text-white"
          >
            BACK
          </button>
        )}
        <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider">
          {currentPath}
        </div>
        <div className="ml-auto text-[9px] text-zinc-400">
          {getItems().length} items
        </div>
      </div>

      {/* Grid of items */}
      <div className="p-4 grid grid-cols-4 gap-6 flex-1 overflow-y-auto">
        {getItems().map((item) => (
          <button
            key={item.id}
            onDoubleClick={() => handleItemClick(item)}
            className="flex flex-col items-center gap-1 group w-16"
          >
            <div className="w-10 h-10 flex items-center justify-center group-active:bg-[#0000aa] rounded-sm">
              {item.type === 'folder' ? <FolderIcon /> : <FileIcon type={item.type} />}
            </div>
            <div className="text-[10px] text-center leading-tight group-active:bg-[#0000aa] group-active:text-white px-1">
              {item.label}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function FolderIcon() {
  return (
    <svg width="32" height="24" viewBox="0 0 32 24" fill="none">
      <path d="M0 4C0 1.79086 1.79086 0 4 0H12L16 4H28C30.2091 4 32 5.79086 32 8V20C32 22.2091 30.2091 24 28 24H4C1.79086 24 0 22.2091 0 20V4Z" fill="white" stroke="black" strokeWidth="1.5"/>
      <path d="M0 8H32" stroke="black" strokeWidth="1.5"/>
    </svg>
  );
}

function FileIcon({ type }: { type: string }) {
  return (
    <svg width="24" height="32" viewBox="0 0 24 32" fill="none">
      <path d="M2 0H16L22 6V30C22 31.1046 21.1046 32 20 32H2C0.895431 32 0 31.1046 0 30V2C0 0.895431 0.895431 0 2 0Z" fill="white" stroke="black" strokeWidth="1.5"/>
      <path d="M16 0V6H22" stroke="black" strokeWidth="1.5"/>
      {type === 'app' && <rect x="4" y="10" width="14" height="14" fill="black" opacity="0.1" />}
    </svg>
  );
}
