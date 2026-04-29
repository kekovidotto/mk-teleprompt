"use client";

import {
  Menu,
  Play,
  Gauge,
  Type,
  Bold,
  Italic,
  Underline,
  TextSelect,
  Palette,
  Eye,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ScriptEditorPage() {
  const [content, setContent] = useState(
    "O futuro da comunicação digital não é apenas sobre a mensagem, mas sobre a clareza com que ela é entregue. No ambiente de alto risco de hoje, locutores profissionais e executivos corporativos exigem ferramentas que desapareçam em segundo plano, permitindo que seu foco permaneça inteiramente no público.\n\nNossa nova interface de teleprompter segue uma filosofia de foco no escuro, projetada para minimizar a fadiga ocular durante sessões de estúdio prolongadas. Ao priorizar o conteúdo por meio de áreas de segurança horizontais amplas e indicadores de alto contraste, garantimos que cada palavra seja entregue com confiança e calma sob pressão.",
  );

  // Calcula estatísticas básicas (aproximadas para demonstração)
  const wordCount = content
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0).length;
  const readingTimeMins = Math.max(1, Math.ceil(wordCount / 130)); // Média de 130 palavras/minuto

  return (
    <div className="flex min-h-screen flex-col bg-[#131313] font-sans text-zinc-100">
      {/* TopAppBar */}
      <header className="fixed top-0 z-50 flex w-full items-center justify-between border-b border-zinc-800 bg-black/80 px-8 py-5 backdrop-blur-md">
        <div className="flex items-center gap-6">
          <Link
            href="/scriptLibrary"
            className="text-cyan-400 transition-colors duration-200 hover:text-cyan-300 active:scale-95"
          >
            <Menu className="h-6 w-6" />
          </Link>
          <h1 className="text-xl font-semibold tracking-tight text-cyan-400">
            Editor de Script
          </h1>
        </div>
        <div className="flex items-center gap-6">
          <Link
            href="/scriptLibrary"
            className="rounded-lg border border-cyan-400/30 px-6 py-2 text-sm font-semibold text-cyan-400 transition-all duration-200 hover:bg-cyan-400/10 hover:text-cyan-300 active:scale-95"
          >
            Concluir
          </Link>
          <button className="text-zinc-500 transition-colors duration-200 hover:text-cyan-300 active:scale-95">
            <Play className="h-6 w-6 fill-current" />
          </button>
        </div>
      </header>

      {/* Main Content Area / Editor */}
      <main className="mx-auto flex w-full max-w-6xl flex-grow flex-col items-center px-4 pt-28 pb-48 md:px-16">
        {/* Script Stats Chip Row */}
        <div className="mb-10 flex w-full max-w-4xl gap-3">
          <div className="flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/50 px-4 py-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400"></span>
            <span className="text-xs font-semibold tracking-wider text-zinc-500">
              {String(readingTimeMins).padStart(2, "0")}:00 MIN
            </span>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/50 px-4 py-1.5">
            <span className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">
              {wordCount} PALAVRAS
            </span>
          </div>
        </div>

        {/* Text Editor Canvas */}
        <div className="w-full max-w-4xl flex-grow">
          <textarea
            className="h-full min-h-[50vh] w-full resize-none border-none bg-transparent text-[20px] leading-relaxed text-zinc-300 placeholder:text-zinc-700 focus:ring-0 focus:outline-none"
            placeholder="Comece a escrever seu script aqui..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
      </main>

      {/* Floating Formatting Toolbar & Primary Action */}
      <div className="fixed bottom-0 left-0 z-40 w-full">
        {/* Subtle gradient overlay */}
        <div className="pointer-events-none h-40 bg-gradient-to-t from-[#131313] via-[#131313]/80 to-transparent"></div>
        <div className="flex flex-col items-center justify-between gap-6 border-t border-zinc-800 bg-zinc-900/90 px-6 py-6 backdrop-blur-xl md:flex-row md:px-10">
          {/* Metadata/Settings shortcuts */}
          <div className="flex w-full items-center justify-center gap-8 md:w-auto md:justify-start">
            <button className="group flex flex-col items-center text-zinc-500 transition-colors hover:text-cyan-400">
              <Gauge className="h-6 w-6 duration-200 group-hover:scale-110" />
              <span className="mt-1 text-[10px] font-bold tracking-widest uppercase">
                Velocidade
              </span>
            </button>
            <button className="group flex flex-col items-center text-zinc-500 transition-colors hover:text-cyan-400">
              <Type className="h-6 w-6 duration-200 group-hover:scale-110" />
              <span className="mt-1 text-[10px] font-bold tracking-widest uppercase">
                Fonte
              </span>
            </button>
          </div>

          {/* Formatting Controls */}
          <div className="flex items-center gap-1 rounded-2xl border border-zinc-800 bg-black p-1 shadow-xl md:gap-2 md:p-1.5">
            <button className="rounded-xl p-3 text-zinc-400 transition-all hover:bg-zinc-900 hover:text-cyan-400 active:scale-90 md:p-4">
              <Bold className="h-5 w-5" />
            </button>
            <button className="rounded-xl p-3 text-zinc-400 transition-all hover:bg-zinc-900 hover:text-cyan-400 active:scale-90 md:p-4">
              <Italic className="h-5 w-5" />
            </button>
            <button className="rounded-xl p-3 text-zinc-400 transition-all hover:bg-zinc-900 hover:text-cyan-400 active:scale-90 md:p-4">
              <Underline className="h-5 w-5" />
            </button>
            <div className="mx-1 h-8 w-px bg-zinc-800 md:mx-2"></div>
            <button className="rounded-xl p-3 text-zinc-400 transition-all hover:bg-zinc-900 hover:text-cyan-400 active:scale-90 md:p-4">
              <TextSelect className="h-5 w-5" />
            </button>
            <button className="rounded-xl p-3 text-zinc-400 transition-all hover:bg-zinc-900 hover:text-cyan-400 active:scale-90 md:p-4">
              <Palette className="h-5 w-5" />
            </button>
          </div>

          {/* Prominent Primary Action */}
          <Link
            href="/teleprompterMode"
            className="flex w-full items-center justify-center gap-4 rounded-full bg-cyan-400 px-8 py-4 text-xl font-bold text-black shadow-[0_0_40px_rgba(34,211,238,0.25)] transition-all hover:bg-cyan-300 active:scale-95 md:w-auto md:px-10 md:py-5"
          >
            <Eye className="h-8 w-8" />
            <span>Iniciar Prompter</span>
          </Link>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden opacity-[0.04]">
        <div className="absolute top-1/4 -right-20 h-[500px] w-[500px] rounded-full bg-cyan-400 blur-[150px]"></div>
        <div className="absolute bottom-1/4 -left-20 h-[500px] w-[500px] rounded-full bg-emerald-400 blur-[150px]"></div>
      </div>
    </div>
  );
}
