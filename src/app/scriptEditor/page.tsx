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
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect, Suspense, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getScriptById, updateScript } from "@/lib/actions";

function ScriptEditor() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");

  const [title, setTitle] = useState("Carregando...");
  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  useEffect(() => {
    if (id) {
      getScriptById(id).then((script) => {
        if (script) {
          setTitle(script.title);
          setContent(script.content);
        } else {
          router.push("/scriptLibrary");
        }
      });
    } else {
      router.push("/scriptLibrary");
    }
  }, [id, router]);

  // Auto-save (debounced)
  useEffect(() => {
    if (!id || title === "Carregando...") return;

    const timeoutId = setTimeout(async () => {
      setIsSaving(true);
      await updateScript(id, title, content);
      setIsSaving(false);
      setLastSaved(new Date());
    }, 1000); // Salva após 1 segundo sem digitar

    return () => clearTimeout(timeoutId);
  }, [title, content, id]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertFormatting = (prefix: string, suffix: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;

    const before = text.substring(0, start);
    const selected = text.substring(start, end);
    const after = text.substring(end);

    const newContent = before + prefix + selected + suffix + after;
    setContent(newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, end + prefix.length);
    }, 0);
  };

  const wordCount = content
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0).length;
  const readingTimeMins = Math.max(1, Math.ceil(wordCount / 130));

  return (
    <div className="flex min-h-screen flex-col bg-[#131313] font-sans text-zinc-100">
      <header className="fixed top-0 z-50 flex w-full items-center justify-between border-b border-zinc-800 bg-black/80 px-8 py-5 backdrop-blur-md">
        <div className="flex flex-1 items-center gap-6">
          <Link
            href="/scriptLibrary"
            className="text-cyan-400 transition-colors duration-200 hover:text-cyan-300 active:scale-95"
          >
            <Menu className="h-6 w-6" />
          </Link>
          <input
            type="text"
            className="w-full max-w-lg bg-transparent text-xl font-semibold tracking-tight text-cyan-400 focus:outline-none placeholder:text-cyan-400/50"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título do Script"
          />
        </div>
        <div className="flex items-center gap-6">
          {isSaving ? (
            <span className="text-xs text-zinc-500 animate-pulse">Salvando...</span>
          ) : lastSaved ? (
            <span className="flex items-center gap-1 text-xs text-emerald-400/70">
              <CheckCircle2 className="h-3 w-3" /> Salvo
            </span>
          ) : null}
          <Link
            href="/scriptLibrary"
            className="rounded-lg border border-cyan-400/30 px-6 py-2 text-sm font-semibold text-cyan-400 transition-all duration-200 hover:bg-cyan-400/10 hover:text-cyan-300 active:scale-95"
          >
            Concluir
          </Link>
          <Link href={id ? `/teleprompterMode?id=${id}` : "#"} className="text-zinc-500 transition-colors duration-200 hover:text-cyan-300 active:scale-95">
            <Play className="h-6 w-6 fill-current" />
          </Link>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-grow flex-col items-center px-4 pt-28 pb-48 md:px-16">
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

        <div className="w-full max-w-4xl flex-grow">
          <textarea
            ref={textareaRef}
            className="h-full min-h-[50vh] w-full resize-none border-none bg-transparent text-[20px] leading-relaxed text-zinc-300 placeholder:text-zinc-700 focus:ring-0 focus:outline-none"
            placeholder="Comece a escrever seu script aqui..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 z-40 w-full">
        <div className="pointer-events-none h-40 bg-gradient-to-t from-[#131313] via-[#131313]/80 to-transparent"></div>
        <div className="flex flex-col items-center justify-between gap-6 border-t border-zinc-800 bg-zinc-900/90 px-6 py-6 backdrop-blur-xl md:flex-row md:px-10">
          <div className="flex w-full items-center justify-center gap-8 md:w-auto md:justify-start">
            <Link href="/teleprompterSettings" className="group flex flex-col items-center text-zinc-500 transition-colors hover:text-cyan-400">
              <Gauge className="h-6 w-6 duration-200 group-hover:scale-110" />
              <span className="mt-1 text-[10px] font-bold tracking-widest uppercase">
                Velocidade
              </span>
            </Link>
            <Link href="/teleprompterSettings" className="group flex flex-col items-center text-zinc-500 transition-colors hover:text-cyan-400">
              <Type className="h-6 w-6 duration-200 group-hover:scale-110" />
              <span className="mt-1 text-[10px] font-bold tracking-widest uppercase">
                Fonte
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-1 rounded-2xl border border-zinc-800 bg-black p-1 shadow-xl md:gap-2 md:p-1.5">
            <button onClick={() => insertFormatting('**', '**')} className="rounded-xl p-3 text-zinc-400 transition-all hover:bg-zinc-900 hover:text-cyan-400 active:scale-90 md:p-4">
              <Bold className="h-5 w-5" />
            </button>
            <button onClick={() => insertFormatting('*', '*')} className="rounded-xl p-3 text-zinc-400 transition-all hover:bg-zinc-900 hover:text-cyan-400 active:scale-90 md:p-4">
              <Italic className="h-5 w-5" />
            </button>
            <button onClick={() => insertFormatting('<u>', '</u>')} className="rounded-xl p-3 text-zinc-400 transition-all hover:bg-zinc-900 hover:text-cyan-400 active:scale-90 md:p-4">
              <Underline className="h-5 w-5" />
            </button>
            <div className="mx-1 h-8 w-px bg-zinc-800 md:mx-2"></div>
            <button onClick={() => insertFormatting('<mark>', '</mark>')} className="rounded-xl p-3 text-zinc-400 transition-all hover:bg-zinc-900 hover:text-cyan-400 active:scale-90 md:p-4">
              <TextSelect className="h-5 w-5" />
            </button>
            <button onClick={() => insertFormatting('<color>', '</color>')} className="rounded-xl p-3 text-zinc-400 transition-all hover:bg-zinc-900 hover:text-cyan-400 active:scale-90 md:p-4">
              <Palette className="h-5 w-5" />
            </button>
          </div>

          <Link
            href={id ? `/teleprompterMode?id=${id}` : "#"}
            className="flex w-full items-center justify-center gap-4 rounded-full bg-cyan-400 px-8 py-4 text-xl font-bold text-black shadow-[0_0_40px_rgba(34,211,238,0.25)] transition-all hover:bg-cyan-300 active:scale-95 md:w-auto md:px-10 md:py-5"
          >
            <Eye className="h-8 w-8" />
            <span>Iniciar Prompter</span>
          </Link>
        </div>
      </div>

      <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden opacity-[0.04]">
        <div className="absolute top-1/4 -right-20 h-[500px] w-[500px] rounded-full bg-cyan-400 blur-[150px]"></div>
        <div className="absolute bottom-1/4 -left-20 h-[500px] w-[500px] rounded-full bg-emerald-400 blur-[150px]"></div>
      </div>
    </div>
  );
}

export default function ScriptEditorPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center bg-[#131313] text-cyan-400">Carregando Editor...</div>}>
      <ScriptEditor />
    </Suspense>
  );
}

