"use client";

import { useEffect, useState } from "react";
import { sounds } from "../utils/sounds";

interface BootSequenceProps {
  onComplete: () => void;
}

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Checking memory...");

  useEffect(() => {
    sounds.playChime();
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    const statusTimer = setTimeout(() => setStatus("Starting System 7..."), 1000);
    const welcomeTimer = setTimeout(() => setStatus("Welcome to Macintosh"), 2000);

    return () => {
      clearInterval(timer);
      clearTimeout(statusTimer);
      clearTimeout(welcomeTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#D6D6D6] text-black cursor-wait">
      <div className="mb-8 flex h-24 w-20 flex-col items-center justify-center border-2 border-black bg-white shadow-[4px_4px_0px_#000]">
        <div className="mb-1 text-2xl">☺</div>
        <div className="text-[10px] font-bold">Happy Mac</div>
      </div>
      
      <div className="mb-4 text-sm font-bold uppercase tracking-widest">{status}</div>
      
      <div className="h-6 w-64 border-2 border-black bg-white p-0.5 shadow-[2px_2px_0px_#000]">
        <div 
          className="h-full bg-black transition-all duration-100 ease-linear" 
          style={{ width: `${progress}%` }} 
        />
      </div>
      
      <div className="mt-8 text-[10px] text-zinc-600">
        © 1991 Apple Computer, Inc.
      </div>
    </div>
  );
}
