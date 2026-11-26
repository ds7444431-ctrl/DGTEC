"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "./Providers";
import { brl } from "@/lib/format";

export function CartDrawer({ whatsapp }: { whatsapp: string }) {
  const { items, open, setOpen, setQty, remove, total, clear } = useStore();
  const msg = () => {
    const lines = items.map((i) => `• ${i.qty}x ${i.name} — ${brl(i.price * i.qty)}`);
    return `Olá! Quero finalizar meu pedido na DG TEC:\n\n${lines.join("\n")}\n\nTotal: ${brl(total)}`;
  };
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div className="fixed inset-0 z-50 bg-black/60" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} />
          <motion.aside role="dialog" aria-label="Carrinho" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-white/10 bg-navy p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">Seu carrinho</h2>
              <button onClick={() => setOpen(false)} aria-label="Fechar" className="text-2xl text-tech hover:text-white">×</button>
            </div>
            <div className="flex-1 space-y-3 overflow-y-auto">
              {items.length === 0 && <p className="mt-10 text-center text-tech">Seu carrinho está vazio.</p>}
              <AnimatePresence initial={false}>
                {items.map((i) => (
                  <motion.div key={i.id} layout initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
                    className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
                    <span className="text-3xl">{i.emoji}</span>
                    <div className="flex-1 text-sm">
                      <p className="font-medium">{i.name}</p>
                      <p className="text-electric">{brl(i.price)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setQty(i.id, i.qty - 1)} className="h-7 w-7 rounded-full bg-white/10 hover:bg-electric/40" aria-label="Diminuir">−</button>
                      <span className="w-5 text-center">{i.qty}</span>
                      <button onClick={() => setQty(i.id, i.qty + 1)} className="h-7 w-7 rounded-full bg-white/10 hover:bg-electric/40" aria-label="Aumentar">+</button>
                    </div>
                    <button onClick={() => remove(i.id)} className="text-tech hover:text-red-400" aria-label="Remover">🗑</button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            {items.length > 0 && (
              <div className="mt-4 space-y-3 border-t border-white/10 pt-4">
                <div className="flex justify-between text-lg font-bold"><span>Total</span><span>{brl(total)}</span></div>
                {whatsapp ? (
                  <a href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(msg())}`} target="_blank" rel="noopener noreferrer"
                    className="btn-glow block rounded-xl py-3 text-center font-semibold">Finalizar pelo WhatsApp</a>
                ) : <p className="text-xs text-tech">Configure NEXT_PUBLIC_WHATSAPP no .env para finalizar pelo WhatsApp.</p>}
                <button onClick={() => setOpen(false)} className="w-full rounded-xl border border-white/20 py-2 text-sm hover:bg-white/10">Continuar comprando</button>
                <button onClick={clear} className="w-full text-xs text-tech hover:text-white">Esvaziar carrinho</button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
