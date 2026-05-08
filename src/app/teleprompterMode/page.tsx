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
import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getScriptById, getSettings, updateSettings } from "@/lib/actions";

const FONTS = [
  { name: 'Arial', value: 'Arial, Helvetica, sans-serif' },
  { name: 'Verdana', value: 'Verdana, Geneva, sans-serif' },
  { name: 'Tahoma', value: 'Tahoma, Geneva, sans-serif' },
  { name: 'Trebuchet', value: '"Trebuchet MS", Helvetica, sans-serif' },
];

function TeleprompterMode() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");

  const [title, setTitle] = useState("Carregando...");
  const [lines, setLines] = useState<string[]>([]);
  const [fontSize, setFontSize] = useState(110);
  const [fontFamily, setFontFamily] = useState(FONTS[0].value);
  const [speed, setSpeed] = useState(145); // Words per minute aproximado
  const [mirroring, setMirroring] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | undefined>(undefined);
  const lastTimeRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    async function loadData() {
      if (id) {
        const script = await getScriptById(id);
        if (script) {
          setTitle(script.title);
          // Dividir conteúdo em parágrafos/linhas
          const contentLines = script.content.split("\n").filter((l) => l.trim() !== "");
          setLines(contentLines.length > 0 ? contentLines : ["Nenhum conteúdo no script."]);
        } else {
          router.push("/scriptLibrary");
          return;
        }
      } else {
        router.push("/scriptLibrary");
        return;
      }

      const settings = await getSettings();
      if (settings) {
        setFontSize(settings.fontSize);
        setSpeed(settings.speed);
        setMirroring(settings.mirroring);
        setTheme(settings.theme);
        if (settings.fontFamily) setFontFamily(settings.fontFamily);
      }
      setIsLoaded(true);
    }
    loadData();
  }, [id, router]);

  // Salvar configurações alteradas
  useEffect(() => {
    if (!isLoaded) return;
    const timeoutId = setTimeout(() => {
      updateSettings({ speed, fontSize, fontFamily });
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [speed, fontSize, fontFamily, isLoaded]);

  // Lógica de Scroll Automático
  // Ajuste do fator de cálculo para uma sensação de velocidade mais calibrada
  const scrollSpeedPixelsPerSecond = speed * (fontSize / 25); 

  const animateScroll = (time: number) => {
    if (lastTimeRef.current != undefined) {
      const deltaTime = time - lastTimeRef.current;
      if (isPlaying && containerRef.current) {
        const scrollAmount = (scrollSpeedPixelsPerSecond * deltaTime) / 1000;
        containerRef.current.scrollBy(0, scrollAmount);
      }
    }
    lastTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animateScroll);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animateScroll);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying, speed, fontSize]); // Re-bind se as dependências de cálculo mudarem

  if (!isLoaded) {
    return <div className="flex h-screen items-center justify-center bg-black text-cyan-400">Carregando Prompter...</div>;
  }

  return (
    <div className="flex h-screen flex-col bg-black text-zinc-100 font-sans select-none relative w-full overflow-hidden">
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
          /* Esconder scrollbar nativa para dar aspecto de app nativo */
          ::-webkit-scrollbar {
            width: 0px;
            background: transparent;
          }
        `
      }} />

      {/* Container de Rolagem Separado */}
      <div 
        ref={containerRef}
        onClick={() => { if (isPlaying) setIsPlaying(false); }}
        onTouchStart={() => { if (isPlaying) setIsPlaying(false); }}
        onWheel={() => { if (isPlaying) setIsPlaying(false); }}
        className={`absolute inset-0 overflow-y-auto overflow-x-hidden ${mirroring ? 'scale-x-[-1]' : ''}`}
      >
        <main className="relative flex flex-col items-center px-4 md:px-12 w-full max-w-[1024px] mx-auto">
          {/* Script Content */}
          <div className="w-full max-w-5xl space-y-10 md:space-y-20 pt-[50vh] pb-[60vh] text-center" style={{ fontSize: `${fontSize}px`, fontFamily }}>
            {lines.map((line, index) => (
              <p
                key={index}
                className="font-bold leading-[1.3] text-zinc-100 transition-colors duration-300"
              >
                {line}
              </p>
            ))}
          </div>
        </main>
      </div>

      {/* Top AppBar */}
      <header className={`fixed top-0 left-0 right-0 z-50 mx-auto flex w-full max-w-[1024px] items-center justify-between bg-black/40 px-6 py-4 backdrop-blur-md md:px-8 md:py-6 transition-all duration-500 ease-in-out ${isPlaying ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100 pointer-events-auto'}`}>
        <div className="flex items-center gap-4 md:gap-6">
          <Link
            href={id ? `/scriptEditor?id=${id}` : "/scriptLibrary"}
            className="flex h-12 w-12 items-center justify-center rounded-full transition-colors duration-200 hover:bg-zinc-800 active:scale-95"
          >
            <X className="h-8 w-8 text-cyan-400" />
          </Link>
          <div className="flex flex-col">
            <h1 className="text-sm tracking-tight text-cyan-400/70 md:text-base">
              Modo de Leitura
            </h1>
            <span className="text-[10px] font-semibold tracking-widest text-emerald-400 uppercase md:text-sm">
              {title}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3 md:gap-4">
          <div className="flex items-center gap-2 rounded-full border border-red-500/30 bg-red-900/20 px-3 py-1.5 md:px-4 md:py-2">
            <div className="h-2 w-2 md:h-2.5 md:w-2.5 animate-pulse rounded-full bg-red-500"></div>
            <span className="text-[10px] font-bold text-red-500 md:text-sm">GRAVANDO</span>
          </div>
        </div>
      </header>

      {/* Reading Progress Indicator (Top) */}
      <div className="fixed top-0 left-0 right-0 z-[60] mx-auto h-[3px] w-full max-w-[1024px] bg-zinc-800">
        <div className="h-full w-1/3 bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,1)]"></div>
      </div>

      {/* Center Reading Indicator (Fixed on screen) */}
      <div className="pointer-events-none fixed left-0 right-0 top-1/2 z-10 flex w-full -translate-y-1/2 items-center justify-between px-2 md:px-6 max-w-[1024px] mx-auto">
        <ChevronRight className="h-12 w-12 md:h-16 md:w-16 text-cyan-400/50" />
        <div className="mx-4 md:mx-8 h-[2px] flex-grow bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"></div>
        <ChevronLeft className="h-12 w-12 md:h-16 md:w-16 text-cyan-400/50" />
      </div>

      {/* Floating Control Panel */}
      <div className={`fixed bottom-6 md:bottom-12 left-1/2 z-50 w-[95%] max-w-3xl -translate-x-1/2 transition-all duration-500 ease-in-out ${isPlaying ? 'translate-y-24 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100 pointer-events-auto'}`}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 rounded-3xl border border-zinc-700/40 bg-zinc-900/90 px-6 py-6 md:px-10 md:py-8 shadow-2xl backdrop-blur-xl">
          
          {/* Typography Controls */}
          <div className="flex flex-col items-center gap-3 w-full md:w-auto">
            <button 
              onClick={() => {
                const currentIndex = FONTS.findIndex(f => f.value === fontFamily);
                const nextIndex = (currentIndex + 1) % FONTS.length;
                setFontFamily(FONTS[nextIndex].value);
              }}
              className="flex items-center justify-center gap-2 rounded-full border border-zinc-700 bg-zinc-800 px-4 py-1.5 text-[10px] md:text-xs font-semibold text-cyan-400 transition-colors hover:bg-zinc-700 active:scale-95 uppercase tracking-widest w-full md:w-auto"
            >
              FONTE: {FONTS.find(f => f.value === fontFamily)?.name || 'Arial'}
            </button>
            <div className="flex items-center gap-2 md:gap-4 justify-center">
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
          </div>

          {/* Main Play/Pause */}
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
                max="800"
                min="10"
                type="range"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TeleprompterModePage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center bg-black text-cyan-400">Carregando Prompter...</div>}>
      <TeleprompterMode />
    </Suspense>
  );
}

