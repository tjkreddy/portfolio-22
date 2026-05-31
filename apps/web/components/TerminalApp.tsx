"use client";

import React, { useState, useRef, useEffect } from "react";
import { profile, projects, experience } from "../app/data";

interface TerminalAppProps {
  onClose?: () => void;
}

export function TerminalApp({ onClose }: TerminalAppProps) {
  const [history, setHistory] = useState<string[]>([
    "System 7.1.1 (Go Edition)",
    "Connecting to jugal@macintosh...",
    "Connection established. Type 'help' for commands.",
    "",
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    let response: string[] = [`> ${cmd}`];

    switch (cleanCmd) {
      case "help":
        response.push(
          "Available commands:",
          "  ls        - List directory contents (apps/projects)",
          "  cat [file]- Display file content",
          "  whoami    - Display current user info",
          "  clear     - Clear terminal history",
          "  exit      - Close the terminal"
        );
        break;
      case "ls":
        response.push("bio.txt", "projects/", "experience/", "stats.log");
        break;
      case "whoami":
        response.push(`${profile.name}`, `${profile.role}`, `${profile.location}`);
        break;
      case "clear":
        setHistory([]);
        return;
      case "exit":
        if (onClose) onClose();
        return;
      case "ls projects":
        response.push(...projects.map(p => `drw-r--r--  ${p.title}.app`));
        break;
      case "cat bio.txt":
        response.push(profile.bio);
        break;
      case "cat stats.log":
        response.push("TOEFL: 98 (Archived)", "PPL Split: 6-day", "Vim Usage: 100%");
        break;
      default:
        if (cleanCmd.startsWith("cat ")) {
          const file = cleanCmd.split(" ")[1];
          response.push(`cat: ${file}: No such file or directory`);
        } else if (cleanCmd !== "") {
          response.push(`command not found: ${cleanCmd}`);
        }
    }
    setHistory([...history, ...response, ""]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
    setInput("");
  };

  return (
    <div className="flex flex-col h-[400px] w-[600px] bg-black text-[#00FF00] font-mono text-sm">
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-zinc-700"
      >
        {history.map((line, i) => (
          <div key={i} className="min-h-[1.25rem] whitespace-pre-wrap">
            {line}
          </div>
        ))}
        <form onSubmit={handleSubmit} className="flex">
          <span className="mr-2">❯</span>
          <input
            autoFocus
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent outline-none border-none text-[#00FF00]"
          />
        </form>
      </div>
    </div>
  );
}
