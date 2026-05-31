"use client";

import { useState } from "react";

export function AboutMacApp() {
  return (
    <div className="w-[380px] p-2 flex flex-col items-center">
      <div className="flex gap-4 items-center border-b border-black pb-4 mb-4 w-full">
        <div className="text-4xl"></div>
        <div>
          <h2 className="text-lg font-bold">About This Macintosh</h2>
          <p className="text-[10px]">System Software 7.1.1</p>
          <p className="text-[10px]">© Apple Computer, Inc. 1983-1991</p>
        </div>
      </div>
      <div className="w-full space-y-2 text-[11px]">
        <div className="flex justify-between border-b border-zinc-200 pb-1">
          <span>Processor:</span>
          <span className="font-bold">Motorola 68030 (Simulated)</span>
        </div>
        <div className="flex justify-between border-b border-zinc-200 pb-1">
          <span>Total Memory:</span>
          <span className="font-bold">8,192K</span>
        </div>
        <div className="flex justify-between">
          <span>Largest Unused Block:</span>
          <span className="font-bold">4,096K</span>
        </div>
        <div className="mt-4 p-2 border border-black bg-zinc-100 flex items-center justify-between">
          <span>System Software</span>
          <div className="w-32 h-3 border border-black bg-white">
            <div className="h-full bg-black w-[60%]" />
          </div>
          <span>2,450K</span>
        </div>
      </div>
    </div>
  );
}

export function CalculatorApp() {
  const [display, setDisplay] = useState("0");
  const [formula, setFormula] = useState("");

  const handleInput = (val: string) => {
    if (display === "0" && !isNaN(Number(val))) {
      setDisplay(val);
    } else {
      setDisplay(display + val);
    }
  };

  const clear = () => {
    setDisplay("0");
    setFormula("");
  };

  const calculate = () => {
    try {
      // Basic eval for demo purposes
      const result = eval(display.replace("×", "*").replace("÷", "/"));
      setDisplay(String(result));
    } catch {
      setDisplay("Error");
    }
  };

  const buttons = [
    ["C", "±", "÷", "×"],
    ["7", "8", "9", "-"],
    ["4", "5", "6", "+"],
    ["1", "2", "3", "="],
    ["0", "."]
  ];

  return (
    <div className="w-[180px] bg-[#ddd] p-2 border border-black shadow-[1px_1px_0_#fff]">
      <div className="bg-white border-2 border-black p-1 mb-2 text-right font-mono text-lg overflow-hidden h-8">
        {display}
      </div>
      <div className="grid grid-cols-4 gap-1">
        {buttons.flat().map((btn) => (
          <button
            key={btn}
            onClick={() => {
              if (btn === "C") clear();
              else if (btn === "=") calculate();
              else handleInput(btn);
            }}
            className={`h-8 border border-black bg-white active:bg-black active:text-white text-[12px] font-bold ${btn === "0" ? "col-span-2" : ""}`}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}

export function NotePadApp() {
  const [text, setText] = useState("Welcome to Note Pad.\n\nThis is a simulated System 7 desk accessory.\n\nFeel free to type your ideas here...");
  
  return (
    <div className="w-[300px] h-[350px] bg-[#fff] relative overflow-hidden border border-black">
      {/* Lined Paper effect */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{
          backgroundImage: "repeating-linear-gradient(transparent, transparent 19px, #eee 19px, #eee 20px)",
          backgroundSize: "100% 20px",
          top: "24px"
        }}
      />
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full h-full bg-transparent p-6 outline-none resize-none font-serif text-sm relative z-10 leading-[20px] cursor-text"
        spellCheck={false}
      />
      <div className="absolute bottom-1 right-2 text-[9px] text-zinc-400 z-20">
        Page 1
      </div>
    </div>
  );
}
