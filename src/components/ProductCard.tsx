
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "./Providers";
import { brl } from "@/lib/format";

export type P = {
  id: string;
  name: string;
  brand: string;
  price: number;
  promoPrice: number | null;
  stock: number;
  emoji: string;
  isDemo: boolean;
  foto?: string;
  models?: Record<string, string[]>;
  cat?: string;
};

const CAPINHAS = [
  { nome: "Preta", foto: "/DG_TEC_capinhas/iphone_preta.jpg" },
  { nome: "Roxa", foto: "/DG_TEC_capinhas/iphone_roxa.jpg" },
  {
    nome: "Transparente fosca",
    foto: "/DG_TEC_capinhas/iphone_transparente_fosca_magsafe.jpg",
  },
  {
    nome: "Transparente MagSafe",
    foto: "/DG_TEC_capinhas/iphone_transparente_magsafe.jpg",
  },
  { nome: "Vermelha", foto: "/DG_TEC_capinhas/iphone_vermelha.jpg" },
];

const SAMSUNG = [
  { nome: "Azul", foto: "/DG_TEC_capinhas/samsung_azul.jpg" },
  { nome: "Preta", foto: "/DG_TEC_capinhas/samsung_preta.jpg" },
  { nome: "Rosa", foto: "/DG_TEC_capinhas/samsung_rosa.jpg" },
  {
    nome: "Transparente",
    foto: "/DG_TEC_capinhas/samsung_transparente.jpg",
  },
  {
    nome: "Transparente fosca",
    foto: "/DG_TEC_capinhas/samsung_transparente_fosca.jpg",
  },
];

export function ProductCard({ p, i = 0 }: { p: P; i?: number }) {
  const store = useStore();
  const [quantidade, setQuantidade] = useState(1);
  const [modelo, setModelo] = useState("");
  const [cor, setCor] = useState(0);
  const [adicionado, setAdicionado] = useState(false);

  const ehCapinha = p.id === "capinhas";
  const fotos = ehCapinha ? [...CAPINHAS, ...SAMSUNG] : [];
  const fotoAtual = ehCapinha ? fotos[cor]?.foto : p.foto;
  const preco = p.promoPrice ?? p.price;
  const modelos = p.models ? Object.values(p.models).flat() : [];

  function adicionar() {
    if (modelos.length > 0 && !modelo) {
      alert("Escolha o modelo do celular primeiro.");
      return;
    }

    const produto = {
      ...p,
      price: preco,
      foto: fotoAtual || p.foto,
      name: modelo ? `${p.name} - ${modelo}` : p.name,
    };

    for (let n = 0; n < quantidade; n++) {
      store.add(produto);
    }

    setAdicionado(true);
    setTimeout(() => setAdicionado(false), 1800);
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, delay: Math.min(i * 0.04, 0.25) }}
      whileHover={{ y: -7, scale: 1.015 }}
      className="group overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-lg transition-shadow hover:shadow-2xl"
    >
      <div className="relative aspect-square overflow-hidden bg-zinc-800">
        <AnimatePresence mode="wait">
          {fotoAtual ? (
            <motion.img
              key={fotoAtual}
              src={fotoAtual}
              alt={`${p.name} ${ehCapinha ? fotos[cor]?.nome : ""}`}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.3 }}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <motion.div
              key="emoji"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex h-full items-center justify-center text-7xl"
            >
              {p.emoji}
            </motion.div>
          )}
        </AnimatePresence>

        {p.promoPrice !== null && (
          <span className="absolute left-3 top-3 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white">
            OFERTA
          </span>
        )}
      </div>

      {ehCapinha && (
        <div className="flex flex-wrap justify-center gap-2 px-3 pt-3">
          {fotos.map((item, index) => (
            <button
              key={item.foto}
              type="button"
              title={item.nome}
              onClick={() => setCor(index)}
              className={`h-8 w-8 overflow-hidden rounded-full border-2 transition-all ${
                cor === index
                  ? "scale-110 border-white ring-2 ring-blue-500"
                  : "border-zinc-600 hover:border-white"
              }`}
            >
              <img
                src={item.foto}
                alt={item.nome}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      <div className="space-y-3 p-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">
            {p.brand}
          </p>
          <h3 className="mt-1 min-h-12 font-semibold text-white">
            {p.name}
          </h3>
        </div>

        {modelos.length > 0 && (
          <select
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-zinc-800 px-3 py-2 text-sm text-white outline-none focus:border-blue-500"
          >
            <option value="">Escolha o modelo</option>
            {modelos.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        )}

        <div className="flex items-center justify-between gap-2">
          <div>
            {p.promoPrice !== null && (
              <p className="text-xs text-zinc-500 line-through">
                {brl(p.price)}
              </p>
            )}
            <p className="text-xl font-bold text-white">{brl(preco)}</p>
          </div>

          <div className="flex items-center gap-2 rounded-lg bg-zinc-800 px-2 py-1">
            <button
              type="button"
              onClick={() => setQuantidade((q) => Math.max(1, q - 1))}
              className="px-2 text-lg text-white"
            >
              −
            </button>
            <span className="text-sm text-white">{quantidade}</span>
            <button
              type="button"
              onClick={() => setQuantidade((q) => Math.min(p.stock, q + 1))}
              className="px-2 text-lg text-white"
            >
              +
            </button>
          </div>
        </div>

        <motion.button
          type="button"
          whileTap={{ scale: 0.96 }}
          onClick={adicionar}
          disabled={p.stock <= 0}
          className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {adicionado
            ? "✓ Adicionado!"
            : p.stock <= 0
              ? "Sem estoque"
              : "Adicionar ao carrinho"}
        </motion.button>
      </div>
    </motion.article>
  );
}
