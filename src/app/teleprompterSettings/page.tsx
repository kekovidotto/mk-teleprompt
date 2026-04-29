"use client";

import {
  Menu,
  Play,
  FlipHorizontal,
  Moon,
  Type,
  ChevronRight,
  CircleHelp,
  Info,
  Gauge,
  ExternalLink,
  FileText,
  FileEdit,
  Eye,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function TeleprompterSettingsPage() {
  const [mirroring, setMirroring] = useState(true);
  const [theme, setTheme] = useState("dark");
  const [speed, setSpeed] = useState(145);

  return (
    <div className="flex min-h-screen flex-col bg-[#131313] font-sans text-zinc-100 pb-32 antialiased">
      <style dangerouslySetInnerHTML={{
        __html: `
          .settings-slider-thumb::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 32px;
            height: 32px;
            background: #22d3ee;
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3), 0 0 15px rgba(34, 211, 238, 0.5);
          }
        `
      }} />

      {/* TopAppBar */}
      <header className="fixed top-0 z-50 flex w-full items-center justify-between border-b border-zinc-800 bg-black/80 px-8 py-5 backdrop-blur-md">
        <div className="flex items-center gap-6">
          <Link href="/scriptLibrary" className="cursor-pointer text-cyan-400 transition-colors duration-200 hover:text-cyan-300 active:scale-95">
            <Menu className="h-7 w-7" />
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight text-cyan-400">
            Configurações
          </h1>
        </div>
        <Link href="/teleprompterMode" className="cursor-pointer text-cyan-400 transition-colors duration-200 hover:text-cyan-300 active:scale-95">
          <Play className="h-7 w-7 fill-current" />
        </Link>
      </header>

      <main className="mx-auto w-full max-w-5xl px-6 md:px-8 pt-28">
        {/* Two Column Grid for Tablet Layout */}
        <div className="grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-2">
          
          {/* Column 1: Configuration & About */}
          <div className="space-y-10">
            {/* Display Configuration Section */}
            <section>
              <h2 className="mb-6 text-2xl font-semibold text-zinc-100">
                Configuração de Tela
              </h2>
              <div className="space-y-4">
                {/* Mirroring Setting */}
                <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
                  <div className="flex items-center gap-4">
                    <FlipHorizontal className="h-6 w-6 text-zinc-500" />
                    <div>
                      <p className="text-base text-zinc-100">Espelhamento</p>
                      <p className="text-xs font-semibold text-zinc-400 mt-0.5">
                        Inverter texto para espelhos de hardware
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      className="peer sr-only"
                      checked={mirroring}
                      onChange={(e) => setMirroring(e.target.checked)}
                    />
                    <div className="peer h-7 w-14 rounded-full bg-zinc-700 after:absolute after:left-[2px] after:top-[2px] after:h-6 after:w-6 after:rounded-full after:border after:border-zinc-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-cyan-400 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"></div>
                  </label>
                </div>

                {/* Theme Setting */}
                <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
                  <div className="flex items-center gap-4">
                    <Moon className="h-6 w-6 text-zinc-500" />
                    <div>
                      <p className="text-base text-zinc-100">Tema</p>
                      <p className="text-xs font-semibold text-zinc-400 mt-0.5">
                        Modo de redução de fadiga ocular
                      </p>
                    </div>
                  </div>
                  <div className="flex rounded-lg bg-zinc-800 p-1.5">
                    <button
                      onClick={() => setTheme("dark")}
                      className={`rounded px-4 py-1.5 text-xs font-semibold transition-colors ${
                        theme === "dark" ? "bg-black text-cyan-400" : "text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      Escuro
                    </button>
                    <button
                      onClick={() => setTheme("light")}
                      className={`rounded px-4 py-1.5 text-xs font-semibold transition-colors ${
                        theme === "light" ? "bg-black text-cyan-400" : "text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      Claro
                    </button>
                  </div>
                </div>

                {/* Font Picker */}
                <div className="flex cursor-pointer items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 transition-colors hover:bg-zinc-800">
                  <div className="flex items-center gap-4">
                    <Type className="h-6 w-6 text-zinc-500" />
                    <div>
                      <p className="text-base text-zinc-100">Fonte</p>
                      <p className="text-xs font-semibold text-zinc-400 mt-0.5">
                        Atual: Inter Semi-Bold
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-6 w-6 text-zinc-500" />
                </div>
              </div>
            </section>

            {/* About & Help Section */}
            <section>
              <h2 className="mb-6 text-2xl font-semibold text-zinc-100">
                Suporte e Versão
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="group cursor-pointer rounded-xl border border-zinc-800 bg-zinc-800/50 p-6 transition-colors hover:border-cyan-400">
                  <CircleHelp className="mb-4 h-8 w-8 text-emerald-400" />
                  <h3 className="mb-1 text-lg font-bold text-zinc-100">
                    Central de Ajuda
                  </h3>
                  <p className="text-xs font-semibold text-zinc-400">
                    Tutoriais e guias de configuração.
                  </p>
                </div>
                <div className="group cursor-pointer rounded-xl border border-zinc-800 bg-zinc-800/50 p-6 transition-colors hover:border-cyan-400">
                  <Info className="mb-4 h-8 w-8 text-emerald-400" />
                  <h3 className="mb-1 text-lg font-bold text-zinc-100">
                    Sobre o App
                  </h3>
                  <p className="text-xs font-semibold text-zinc-400">
                    Versão 4.2.1-stable. Build 882.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Column 2: Playback & Visuals */}
          <div className="space-y-10">
            {/* Playback Section */}
            <section>
              <h2 className="mb-6 text-2xl font-semibold text-zinc-100">
                Mecanismo de Reprodução
              </h2>
              <div className="space-y-8 rounded-xl border border-zinc-800 bg-zinc-900/50 p-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Gauge className="h-6 w-6 text-zinc-500" />
                    <p className="text-base text-zinc-100">
                      Velocidade de rolagem
                    </p>
                  </div>
                  <span className="text-4xl font-semibold text-cyan-400">
                    {speed} <span className="text-sm font-semibold text-zinc-400">PPM</span>
                  </span>
                </div>
                
                <div className="relative flex h-12 w-full items-center">
                  <input
                    type="range"
                    min="10"
                    max="300"
                    value={speed}
                    onChange={(e) => setSpeed(Number(e.target.value))}
                    className="settings-slider-thumb absolute z-10 h-2 w-full cursor-pointer appearance-none rounded-lg bg-transparent"
                  />
                  {/* Custom Track Backgrounds underneath the invisible native track */}
                  <div className="absolute h-2 w-full rounded-full bg-zinc-700 pointer-events-none"></div>
                  <div 
                    className="absolute h-2 rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)] pointer-events-none"
                    style={{ width: `${((speed - 10) / 290) * 100}%` }}
                  ></div>
                </div>

                <div className="flex justify-between text-xs font-semibold tracking-widest text-zinc-500 uppercase">
                  <span>Lento</span>
                  <span>Rápido</span>
                </div>
              </div>
            </section>

            {/* Aesthetic Visual Element */}
            <div className="relative h-64 overflow-hidden rounded-2xl border border-zinc-800">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJ8RCJ0YDZWGCwBb3cbF7q39naylJIyHWZ4sKlf0aMyuJU6phNxjbyVjQMKyEaJsX2GtMSDeIvWdE1_12vblgykIHP0gX0FKz2-UL2-N7_Mv2XQyMJVqtDGgfPfMrx9zhRmxBNUAbfOn9J-CVpWuxEdndwPtCgigrpcxvLdZjARjvApAg_7LbG6L2CcLSMak5_oTI5FlGfpVpVWEsnGxnufUUOWpG2MAZe3yN35X0XreDQKRzx6KgsO60Ss0iUa-1pTRJnYiEcZNA"
                alt="Studio setup"
                className="h-full w-full object-cover opacity-40 mix-blend-luminosity"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              <div className="absolute bottom-6 left-8 right-8">
                <p className="mb-2 text-xs font-semibold tracking-[0.2em] text-cyan-400 uppercase">
                  Excelência em Transmissão
                </p>
                <p className="text-2xl font-bold text-zinc-100">
                  Projetado para o Foco.
                </p>
              </div>
            </div>

            {/* Footer Links */}
            <div className="space-y-5 pt-4">
              <div className="flex cursor-pointer items-center justify-between py-2 text-zinc-400 transition-colors hover:text-zinc-100">
                <span className="text-base">Política de Privacidade</span>
                <ExternalLink className="h-5 w-5" />
              </div>
              <div className="flex cursor-pointer items-center justify-between py-2 text-zinc-400 transition-colors hover:text-zinc-100">
                <span className="text-base">Termos de Serviço</span>
                <ExternalLink className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around border-t border-zinc-800 bg-[#0a0a0a] px-4 md:px-12 pt-4 pb-8">
        <Link
          href="/scriptLibrary"
          className="group flex cursor-pointer flex-col items-center justify-center pt-3 text-zinc-600 transition-colors hover:text-zinc-300 border-t-2 border-transparent"
        >
          <FileText className="h-7 w-7" />
          <span className="mt-2 text-[10px] md:text-[11px] font-bold tracking-[0.15em] uppercase">
            Scripts
          </span>
        </Link>
        <Link
          href="/scriptEditor"
          className="group flex cursor-pointer flex-col items-center justify-center pt-3 text-zinc-600 transition-colors hover:text-zinc-300 border-t-2 border-transparent"
        >
          <FileEdit className="h-7 w-7" />
          <span className="mt-2 text-[10px] md:text-[11px] font-bold tracking-[0.15em] uppercase">
            Editor
          </span>
        </Link>
        <Link
          href="/teleprompterMode"
          className="group flex cursor-pointer flex-col items-center justify-center pt-3 text-zinc-600 transition-colors hover:text-zinc-300 border-t-2 border-transparent"
        >
          <Eye className="h-7 w-7" />
          <span className="mt-2 text-[10px] md:text-[11px] font-bold tracking-[0.15em] uppercase">
            Prompter
          </span>
        </Link>
        <Link
          href="/teleprompterSettings"
          className="flex flex-col items-center justify-center border-t-2 border-cyan-400 px-2 md:px-6 pt-3 text-cyan-400"
        >
          <Settings className="h-7 w-7" />
          <span className="mt-2 text-[10px] md:text-[11px] font-bold tracking-[0.15em] uppercase">
            Ajustes
          </span>
        </Link>
      </nav>
    </div>
  );
}
