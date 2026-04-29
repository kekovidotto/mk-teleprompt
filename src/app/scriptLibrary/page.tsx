"use client";

import {
  Menu,
  Play,
  Search,
  Timer,
  MoreVertical,
  Plus,
  FileText,
  FileEdit,
  Eye,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Mock data to display fixed content
const MOCK_SCRIPTS = [
  {
    id: "1",
    title: "Revisão Trimestral de Negócios",
    duration: "08:45",
    preview:
      "Bom dia a todos. Hoje estamos reunidos para discutir nosso crescimento notável nos últimos três meses. Nosso foco estratégico na transformação digital rendeu...",
    modifiedAt: "12 OUT, 2023",
  },
  {
    id: "2",
    title: "Palestra de Abertura - TechConf",
    duration: "15:20",
    preview:
      "O futuro da inteligência artificial não se trata apenas de modelos de linguagem grandes. É sobre como integramos esses sistemas em nossos fluxos de trabalho diários sem...",
    modifiedAt: "08 OUT, 2023",
  },
  {
    id: "3",
    title: "Anúncio de Lançamento de Produto",
    duration: "04:12",
    preview:
      "Bem-vindos à próxima geração de ferramentas criativas. Hoje estamos revelando um produto que levou três anos para ser feito, projetado do zero...",
    modifiedAt: "28 SET, 2023",
  },
  {
    id: "4",
    title: "Atualização Geral Interna",
    duration: "12:30",
    preview:
      "Equipe, obrigado por estarem aqui. Quero começar agradecendo o trabalho duro dedicado ao lançamento recente. Vimos algumas métricas incríveis...",
    modifiedAt: "15 SET, 2023",
  },
];

export default function ScriptLibraryPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredScripts = MOCK_SCRIPTS.filter((script) =>
    script.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="flex min-h-screen flex-col bg-[#131313] text-zinc-100">
      {/* TopAppBar */}
      <header className="fixed top-0 z-50 flex w-full items-center justify-between border-b border-zinc-800 bg-black/80 px-8 py-6 backdrop-blur-md">
        <div className="flex items-center gap-6">
          <button className="text-cyan-400 transition-colors duration-200 hover:text-cyan-300 active:scale-95">
            <Menu className="h-8 w-8" />
          </button>
          <h1 className="text-2xl font-bold tracking-tighter text-cyan-400">
            Teleprompter
          </h1>
        </div>
        <div className="flex items-center gap-6">
          <button className="flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-2 font-bold text-black transition-colors duration-200 hover:bg-cyan-300 active:scale-95">
            <Play className="h-5 w-5 fill-current" />
            <span>Iniciar</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto w-full max-w-6xl flex-grow px-6 pt-32 pb-32">
        {/* Search and Filter Header */}
        <div className="mb-12 space-y-8">
          <div className="flex flex-col gap-3">
            <h2 className="text-4xl font-bold text-zinc-100">
              Biblioteca de Scripts
            </h2>
            <p className="text-lg text-zinc-400">
              Gerencie sua biblioteca de scripts prontos para transmissão.
            </p>
          </div>
          <div className="group relative">
            <div className="pointer-events-none absolute inset-y-0 left-6 flex items-center">
              <Search className="h-6 w-6 text-zinc-500" />
            </div>
            <input
              className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/50 py-5 pr-6 pl-16 text-lg text-zinc-100 shadow-sm transition-all placeholder:text-zinc-500 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none"
              placeholder="Pesquisar scripts..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Script List - Grid on md (tablet+), single column on mobile */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {filteredScripts.map((script) => (
            <div
              key={script.id}
              className="group relative flex cursor-pointer flex-col justify-between rounded-2xl border border-zinc-800 bg-zinc-900 p-8 transition-all hover:border-zinc-700 hover:bg-zinc-800/80"
            >
              <div>
                <div className="mb-4 flex items-start justify-between gap-4">
                  <h3 className="text-2xl font-semibold text-zinc-100 transition-colors group-hover:text-cyan-400">
                    {script.title}
                  </h3>
                  <div className="flex shrink-0 items-center gap-2 rounded-full bg-emerald-400/10 px-4 py-1.5">
                    <Timer className="h-[18px] w-[18px] text-emerald-400" />
                    <span className="text-xs font-semibold tracking-wider text-emerald-400">
                      {script.duration}
                    </span>
                  </div>
                </div>
                <p className="mb-6 line-clamp-3 text-base text-zinc-400">
                  {script.preview}
                </p>
              </div>
              <div className="flex items-center justify-between border-t border-zinc-800/60 pt-6">
                <span className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                  MODIFICADO EM {script.modifiedAt}
                </span>
                <div className="flex gap-2">
                  <button className="rounded-full p-2.5 text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-zinc-200">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredScripts.length === 0 && (
            <div className="col-span-full py-12 text-center text-zinc-500">
              Nenhum script encontrado para "{searchQuery}".
            </div>
          )}
        </div>
      </main>

      {/* FAB for New Script */}
      <button className="fixed right-6 bottom-32 z-40 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-400 text-black shadow-[0_0_30px_rgba(34,211,238,0.3)] transition-all hover:scale-105 hover:bg-cyan-300 active:scale-95 md:right-10">
        <Plus className="h-8 w-8" />
      </button>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around border-t border-zinc-800 bg-[#0a0a0a] px-4 pt-4 pb-8 md:px-12">
        {/* Scripts (Active) */}
        <Link
          href="/scriptLibrary"
          className="flex flex-col items-center justify-center border-t-2 border-cyan-400 pt-3 text-cyan-400 transition-colors active:opacity-80"
          style={{ WebkitTapHighlightColor: "transparent" }}
        >
          <FileText className="h-7 w-7" />
          <span className="mt-2 text-[10px] font-bold tracking-widest uppercase md:text-xs">
            Scripts
          </span>
        </Link>
        {/* Editor */}
        <Link
          href="/scriptEditor"
          className="flex flex-col items-center justify-center border-t-2 border-transparent pt-3 text-zinc-500 transition-colors hover:text-zinc-300 active:opacity-80"
          style={{ WebkitTapHighlightColor: "transparent" }}
        >
          <FileEdit className="h-7 w-7" />
          <span className="mt-2 text-[10px] font-bold tracking-widest uppercase md:text-xs">
            Editor
          </span>
        </Link>
        {/* Prompter */}
        <Link
          href="/teleprompterMode"
          className="flex flex-col items-center justify-center border-t-2 border-transparent pt-3 text-zinc-500 transition-colors hover:text-zinc-300 active:opacity-80"
          style={{ WebkitTapHighlightColor: "transparent" }}
        >
          <Eye className="h-7 w-7" />
          <span className="mt-2 text-[10px] font-bold tracking-widest uppercase md:text-xs">
            Prompter
          </span>
        </Link>
        {/* Settings */}
        <Link
          href="/teleprompterSettings"
          className="flex flex-col items-center justify-center border-t-2 border-transparent pt-3 text-zinc-500 transition-colors hover:text-zinc-300 active:opacity-80"
          style={{ WebkitTapHighlightColor: "transparent" }}
        >
          <Settings className="h-7 w-7" />
          <span className="mt-2 text-[10px] font-bold tracking-widest uppercase md:text-xs">
            Configurações
          </span>
        </Link>
      </nav>

      {/* Backdrop Glow */}
      <div className="pointer-events-none fixed top-0 left-0 z-[-1] h-full w-full overflow-hidden opacity-20">
        <div className="absolute -top-[10%] -right-[10%] h-[60%] w-[60%] rounded-full bg-cyan-400/20 blur-[120px]"></div>
        <div className="absolute -bottom-[10%] -left-[10%] h-[60%] w-[60%] rounded-full bg-emerald-400/10 blur-[120px]"></div>
      </div>
    </div>
  );
}
