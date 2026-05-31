"use client";

import React, { useState, useRef, useEffect } from "react";
import { sounds } from "../utils/sounds";

interface WindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  onClose: (id: string) => void;
  onFocus: (id: string) => void;
  onPositionChange: (id: string, x: number, y: number) => void;
  position: { x: number; y: number };
  zIndex: number;
  isActive: boolean;
}

export const Window: React.FC<WindowProps> = ({
  id,
  title,
  children,
  onClose,
  onFocus,
  onPositionChange,
  position,
  zIndex,
  isActive,
}) => {
  const [ghostPos, setGhostPos] = useState(position);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    sounds.playClick();
    onFocus(id);
    setIsDragging(true);
    dragStartPos.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    setGhostPos(position);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setGhostPos({
          x: e.clientX - dragStartPos.current.x,
          y: e.clientY - dragStartPos.current.y,
        });
      }
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        onPositionChange(id, ghostPos.x, ghostPos.y);
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
  }, [isDragging, ghostPos, id, onPositionChange]);

  return (
    <>
      {/* Ghost Outline during dragging */}
      {isDragging && (
        <div
          className="absolute border-2 border-dotted border-black z-[9999] pointer-events-none"
          style={{
            left: ghostPos.x,
            top: ghostPos.y,
            width: "320px", // Approximate or we could measure actual width
            height: "100px", // Temporary, will look better with proper dimensions
            minWidth: "320px",
          }}
        />
      )}

      {/* Actual Window */}
      <div
        className={`absolute border border-black bg-white shadow-[2px_2px_0px_#000000] transition-shadow ${
          isActive ? "shadow-[4px_4px_0px_#000000]" : ""
        }`}
        style={{
          left: position.x,
          top: position.y,
          zIndex: zIndex,
          minWidth: "320px",
          opacity: isDragging ? 0.8 : 1, // Subtle hint it's being moved
        }}
        onMouseDown={() => onFocus(id)}
      >
        <div
          className={`flex h-7 px-2 items-center border-b border-black cursor-move ${
            isActive ? "bg-mac-lines" : "bg-zinc-200"
          }`}
          onMouseDown={handleMouseDown}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose(id);
            }}
            className="w-4 h-4 bg-white border border-black flex items-center justify-center hover:bg-zinc-100 active:bg-zinc-300"
            title="Close"
          >
            <span className="text-[10px] font-bold">×</span>
          </button>
          <h2 className="bg-white border border-black px-4 mx-auto font-bold text-xs select-none">
            {title}
          </h2>
          <div className="w-4" />
        </div>
        <div className="p-4 max-h-[70vh] overflow-auto">
          {children}
        </div>
      </div>
    </>
  );
};
