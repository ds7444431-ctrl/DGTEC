"use client";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "./Providers";

export function Header({ whatsapp }: { whatsapp: string }) {
  const { count, setOpen } = useStore();
  return (
    <motion.header initial={{ y: -70 }} animate={{ y: 0 }} transition={{ type: "spring", stiffness: 120, damping: 18 }}
      className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between border-b border-white/10 bg-deep/70 px-5 backdrop-blur-xl">
      <Link href="/" className="text-2xl font-extrabold tracking-tight">DG <span className="text-electric">TEC</span></Link>
      <nav className="hidden gap-6 text-sm text-tech md:flex">
        <Link className="transition hover:text-white" href="/#catalogo">Produtos</Link>
      </nav>
      <div className="flex items-center gap-3">
        {whatsapp && (
          <a href={`https://wa.me/${whatsapp}?text=${encodeURIComponent("Olá! Vim pelo site da DG TEC e tenho uma dúvida.")}`}
            target="_blank" rel="noopener noreferrer"
            className="hidden rounded-full border border-electric/50 px-4 py-1.5 text-sm transition hover:bg-electric/20 sm:block">WhatsApp</a>
        )}
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => setOpen(true)} aria-label="Abrir carrinho"
          className="relative rounded-full bg-white/10 px-4 py-2 text-sm transition hover:bg-electric/30">
          🛒 Carrinho
          <AnimatePresence mode="popLayout">
            {count > 0 && (
              <motion.span key={count} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-electric px-1 text-xs font-bold">{count}</motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.header>
  );
}
