"use client";

import React, { useState, useRef, useEffect, ReactNode } from "react";
import { sounds } from "../utils/sounds";
export type DesktopSectionId =
  | "about"
  | "skills"
  | "projects"
  | "experience"
  | "contact";

export type IconState = {
  id: string;
  label: string;
  type: DesktopSectionId | "terminal" | "trash" | "finder";
  icon: ReactNode;
  position: { x: number; y: number };
  isTrashed: boolean;
};

interface DesktopIconsProps {
  icons: IconState[];
  onIconSelect: (type: any) => void;
  onIconMove: (id: string, x: number, y: number) => void;
}

export function DesktopIcons({ icons, onIconSelect, onIconMove }: DesktopIconsProps) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {icons.filter(icon => !icon.isTrashed).map((icon) => (
        <DraggableIcon
          key={icon.id}
          icon={icon}
          onSelect={() => onIconSelect(icon.type)}
          onMove={(x, y) => onIconMove(icon.id, x, y)}
        />
      ))}
    </div>
  );
}

function DraggableIcon({ icon, onSelect, onMove }: { icon: IconState; onSelect: () => void; onMove: (x: number, y: number) => void }) {
  const [pos, setPos] = useState(icon.position);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const lastClickTime = useRef(0);

  // Sync internal position when prop changes (e.g. from Clean Up Desktop)
  useEffect(() => {
    setPos(icon.position);
  }, [icon.position]);

  const handleMouseDown = (e: React.MouseEvent) => {
    const now = Date.now();
    if (now - lastClickTime.current < 300) {
      onSelect();
    }
    lastClickTime.current = now;

    setIsDragging(true);
    dragStartPos.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPos({
          x: e.clientX - dragStartPos.current.x,
          y: e.clientY - dragStartPos.current.y,
        });
      }
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        // Snap to grid (64px)
        const snappedX = Math.round(pos.x / 64) * 64;
        const snappedY = Math.round(pos.y / 64) * 64;
        setPos({ x: snappedX, y: snappedY });
        onMove(snappedX, snappedY);
      }
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, pos, onMove]);

  return (
    <div
      className={`absolute pointer-events-auto flex flex-col items-center gap-1 p-1 group cursor-default ${isDragging ? "opacity-50" : ""}`}
      style={{ left: pos.x, top: pos.y, width: "64px" }}
      onMouseDown={handleMouseDown}
    >
      <div className="flex h-[42px] w-[42px] items-center justify-center group-active:bg-[#0000aa] rounded-[2px]">
        {icon.icon}
      </div>
      <div className="max-w-[64px] px-1 py-0.5 text-[10px] leading-tight text-white text-center drop-shadow-[1px_1px_1px_rgba(0,0,0,0.9)] group-active:bg-[#0000aa]">
        {icon.label}
      </div>
    </div>
  );
}
