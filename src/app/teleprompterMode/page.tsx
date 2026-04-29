"use client";

import {
  X,
  BatteryFull,
  ChevronRight,
  ChevronLeft,
  Minus,
  Plus,
  Pause,
  Play,
  Smartphone,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const SCRIPT_LINES = [
  "Senhoras e senhores, bem-vindos ao futuro da comunicação.",
  "Hoje estamos aqui reunidos para discutir a interseção entre inteligência artificial e criatividade humana.",
  "Esta jornada começou há três anos em uma pequena garagem em São Francisco, com nada além de uma visão e algumas linhas de código.",
  "O que construímos não é apenas uma ferramenta; é uma ponte entre suas ideias mais complexas e o mundo que precisa ouvi-las.",
  "Pense na última vez que você se sentiu verdadeiramente inspirado. Aquela faísca, aquele momento de clareza absoluta.",
];

export default function TeleprompterModePage() {
  const [fontSize, setFontSize] = useState(110);
  const [speed, setSpeed] = useState(145);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeLineIndex] = useState(1); // Fixo para o layout, no real isso mudaria com o scroll

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-black text-zinc-100 font-sans select-none relative max-w-[1024px] mx-auto">
      <style dangerouslySetInnerHTML={{
        __html: `
          .custom-slider-thumb::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 24px;
            height: 24px;
            background: #22d3ee;
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 0 15px rgba(34, 211, 238, 0.6);
          }
        `
      }} />

      {/* Top AppBar */}
      <header className="fixed top-0 left-0 right-0 z-50 mx-auto flex w-full max-w-[1024px] items-center justify-between bg-black/40 px-6 py-4 backdrop-blur-md md:px-8 md:py-6">
        <div className="flex items-center gap-4 md:gap-6">
          <Link
            href="/scriptEditor"
            className="flex h-12 w-12 items-center justify-center rounded-full transition-colors duration-200 hover:bg-zinc-800 active:scale-95"
          >
            <X className="h-8 w-8 text-cyan-400" />
          </Link>
          <div className="flex flex-col">
            <h1 className="text-sm tracking-tight text-cyan-400/70 md:text-base">
              Editor &gt; Modo de Leitura
            </h1>
            <span className="text-[10px] font-semibold tracking-widest text-emerald-400 uppercase md:text-sm">
              Roteiro ao vivo: Apresentação Principal v2
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3 md:gap-4">
          <div className="flex items-center gap-2 rounded-full border border-red-500/30 bg-red-900/20 px-3 py-1.5 md:px-4 md:py-2">
            <div className="h-2 w-2 md:h-2.5 md:w-2.5 animate-pulse rounded-full bg-red-500"></div>
            <span className="text-[10px] font-bold text-red-500 md:text-sm">GRAVANDO</span>
          </div>
          <div className="hidden items-center gap-2 rounded-full bg-zinc-800 px-4 py-2 md:flex">
            <BatteryFull className="h-5 w-5 text-emerald-400" />
            <span className="text-sm font-semibold text-zinc-200">98%</span>
          </div>
        </div>
      </header>

      {/* Reading Progress Indicator (Top) */}
      <div className="fixed top-0 left-0 right-0 z-[60] mx-auto h-[3px] w-full max-w-[1024px] bg-zinc-800">
        <div className="h-full w-1/3 bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,1)]"></div>
      </div>

      {/* Reading Area Canvas */}
      <main className="relative flex h-full flex-col items-center justify-center overflow-hidden px-4 md:px-12">
        {/* Center Reading Indicator */}
        <div className="pointer-events-none absolute left-0 top-1/2 z-10 flex w-full -translate-y-1/2 items-center justify-between px-2 md:px-6">
          <ChevronRight className="h-12 w-12 md:h-16 md:w-16 text-cyan-400/50" />
          <div className="mx-4 md:mx-8 h-[2px] flex-grow bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"></div>
          <ChevronLeft className="h-12 w-12 md:h-16 md:w-16 text-cyan-400/50" />
        </div>

        {/* Script Content */}
        <div className="w-full max-w-5xl space-y-10 md:space-y-20 py-[50vh] text-center" style={{ fontSize: `${fontSize}px` }}>
          {SCRIPT_LINES.map((line, index) => (
            <p
              key={index}
              className={`font-bold leading-[1.1] transition-colors duration-300 ${
                index === activeLineIndex ? "text-cyan-400" : "text-zinc-700"
              }`}
              style={{ fontSize: index === activeLineIndex ? "1em" : "0.85em" }}
            >
              {line}
            </p>
          ))}
        </div>

        {/* Fade Overlays */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background: "linear-gradient(to bottom, #000000 0%, transparent 25%, transparent 75%, #000000 100%)",
          }}
        ></div>
      </main>

      {/* Floating Control Panel */}
      <div className="fixed bottom-6 md:bottom-12 left-1/2 z-50 w-[95%] max-w-3xl -translate-x-1/2">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 rounded-3xl border border-zinc-700/40 bg-zinc-900/90 px-6 py-6 md:px-10 md:py-8 shadow-2xl backdrop-blur-xl">
          
          {/* Font Size Controls */}
          <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto justify-center">
            <button 
              onClick={() => setFontSize(Math.max(40, fontSize - 10))}
              className="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 transition-colors duration-200 hover:bg-zinc-700 active:scale-90"
            >
              <Minus className="h-6 w-6 text-zinc-200" />
            </button>
            <div className="w-14 md:w-16 text-center">
              <span className="text-xl md:text-2xl font-semibold text-zinc-200">{fontSize}</span>
            </div>
            <button 
              onClick={() => setFontSize(Math.min(200, fontSize + 10))}
              className="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 transition-colors duration-200 hover:bg-zinc-700 active:scale-90"
            >
              <Plus className="h-6 w-6 text-zinc-200" />
            </button>
          </div>

          {/* Main Play/Pause (Absolute center on desktop, inline on mobile) */}
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex h-20 w-20 md:h-24 md:w-24 shrink-0 items-center justify-center rounded-full bg-cyan-400 text-black shadow-[0_0_30px_rgba(34,211,238,0.4)] transition-all duration-200 hover:scale-105 active:scale-90"
          >
            {isPlaying ? (
              <Pause className="h-10 w-10 md:h-12 md:w-12 fill-current" />
            ) : (
              <Play className="h-10 w-10 md:h-12 md:w-12 fill-current ml-2" />
            )}
          </button>

          {/* Speed Control */}
          <div className="flex flex-grow flex-col gap-2 md:gap-3 w-full md:w-auto">
            <div className="flex items-center justify-between">
              <span className="text-[10px] md:text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                Velocidade
              </span>
              <span className="text-lg md:text-2xl font-semibold text-cyan-400">{speed} PPM</span>
            </div>
            <div className="relative flex h-8 md:h-10 w-full items-center">
              <input
                className="custom-slider-thumb h-2 w-full cursor-pointer appearance-none rounded-lg bg-zinc-800"
                max="300"
                min="10"
                type="range"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
              />
            </div>
          </div>

          {/* Remote Status (Hidden on mobile to save space, visible on tablet+) */}
          <div className="hidden md:flex items-center gap-4">
            <button className="flex h-14 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 transition-colors duration-200 hover:bg-zinc-700 active:scale-90">
              <Smartphone className="h-7 w-7 text-zinc-200" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
