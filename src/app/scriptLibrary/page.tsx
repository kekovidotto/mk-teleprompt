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
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getScripts, createScript, deleteScript } from "@/lib/actions";

// Tipo correspondente à tabela
type Script = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

export default function ScriptLibraryPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [scripts, setScripts] = useState<Script[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const loadScripts = async () => {
    setIsLoading(true);
    const data = await getScripts();
    setScripts(data as Script[]);
    setIsLoading(false);
  };

  useEffect(() => {
    loadScripts();
  }, []);

  const handleCreateNew = async () => {
    const newScript = await createScript();
    if (newScript) {
      router.push(`/scriptEditor?id=${newScript.id}`);
    }
  };

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const success = await deleteScript(id);
    if (success) {
      setScripts(scripts.filter((s) => s.id !== id));
    }
    setOpenMenuId(null);
  };

  const toggleMenu = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    if (openMenuId === id) {
      setOpenMenuId(null);
    } else {
      setOpenMenuId(id);
    }
  };

  const filteredScripts = scripts.filter((script) =>
    script.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const calculateDuration = (content: string) => {
    if (!content) return "00:00";
    const wordCount = content.trim().split(/\s+/).filter((w) => w.length > 0).length;
    const readingTimeMins = Math.max(1, Math.ceil(wordCount / 130));
    return `${String(readingTimeMins).padStart(2, "0")}:00`;
  };

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

        {/* Script List */}
        {isLoading ? (
          <div className="py-12 text-center text-zinc-500 animate-pulse">Carregando scripts...</div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {filteredScripts.map((script) => (
              <div
                key={script.id}
                onClick={() => router.push(`/scriptEditor?id=${script.id}`)}
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
                        {calculateDuration(script.content)}
                      </span>
                    </div>
                  </div>
                  <p className="mb-6 line-clamp-3 text-base text-zinc-400">
                    {script.content ? script.content : "Nenhum conteúdo..."}
                  </p>
                </div>
                <div className="flex items-center justify-between border-t border-zinc-800/60 pt-6">
                  <span className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                    MODIFICADO EM {new Date(script.updatedAt).toLocaleDateString("pt-BR")}
                  </span>
                  <div className="relative">
                    <button
                      onClick={(e) => toggleMenu(e, script.id)}
                      className="rounded-full p-2.5 text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-zinc-200"
                    >
                      <MoreVertical className="h-5 w-5" />
                    </button>
                    {/* Menu de opções */}
                    {openMenuId === script.id && (
                      <>
                        <div 
                          className="fixed inset-0 z-40" 
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenMenuId(null);
                          }} 
                        />
                        <div className="absolute right-0 top-full mt-2 w-32 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 shadow-2xl z-50">
                          <button
                            onClick={(e) => handleDelete(e, script.id)}
                            className="flex w-full items-center gap-2 px-4 py-3 text-sm font-semibold text-red-400 transition-colors hover:bg-zinc-800 relative z-50"
                          >
                            <Trash2 className="h-4 w-4" />
                            Excluir
                          </button>
                        </div>
                      </>
                    )}
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
        )}
      </main>

      {/* FAB for New Script */}
      <button
        onClick={handleCreateNew}
        className="fixed right-6 bottom-32 z-40 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-400 text-black shadow-[0_0_30px_rgba(34,211,238,0.3)] transition-all hover:scale-105 hover:bg-cyan-300 active:scale-95 md:right-10"
      >
        <Plus className="h-8 w-8" />
      </button>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around border-t border-zinc-800 bg-[#0a0a0a] px-4 pt-4 pb-8 md:px-12">
        <Link
          href="/scriptLibrary"
          className="flex flex-col items-center justify-center border-t-2 border-cyan-400 pt-3 text-cyan-400 transition-colors active:opacity-80"
        >
          <FileText className="h-7 w-7" />
          <span className="mt-2 text-[10px] font-bold tracking-widest uppercase md:text-xs">
            Scripts
          </span>
        </Link>
        <Link
          href="/scriptEditor"
          className="flex flex-col items-center justify-center border-t-2 border-transparent pt-3 text-zinc-500 transition-colors hover:text-zinc-300 active:opacity-80"
        >
          <FileEdit className="h-7 w-7" />
          <span className="mt-2 text-[10px] font-bold tracking-widest uppercase md:text-xs">
            Editor
          </span>
        </Link>
        <Link
          href="/teleprompterMode"
          className="flex flex-col items-center justify-center border-t-2 border-transparent pt-3 text-zinc-500 transition-colors hover:text-zinc-300 active:opacity-80"
        >
          <Eye className="h-7 w-7" />
          <span className="mt-2 text-[10px] font-bold tracking-widest uppercase md:text-xs">
            Prompter
          </span>
        </Link>
        <Link
          href="/teleprompterSettings"
          className="flex flex-col items-center justify-center border-t-2 border-transparent pt-3 text-zinc-500 transition-colors hover:text-zinc-300 active:opacity-80"
        >
          <Settings className="h-7 w-7" />
          <span className="mt-2 text-[10px] font-bold tracking-widest uppercase md:text-xs">
            Ajustes
          </span>
        </Link>
      </nav>

      <div className="pointer-events-none fixed top-0 left-0 z-[-1] h-full w-full overflow-hidden opacity-20">
        <div className="absolute -top-[10%] -right-[10%] h-[60%] w-[60%] rounded-full bg-cyan-400/20 blur-[120px]"></div>
        <div className="absolute -bottom-[10%] -left-[10%] h-[60%] w-[60%] rounded-full bg-emerald-400/10 blur-[120px]"></div>
      </div>
    </div>
  );
}
