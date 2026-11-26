"use client";

import { useMemo, useState } from "react";
import { categories, products } from "@/data/products";
import { ProductCard } from "./ProductCard";

export function Catalog() {
  const [cat, setCat] = useState("todas");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("padrao");

  const list = useMemo(() => {
    const t = q.trim().toLowerCase();

    const resultado = products.filter((p) => {
      const categoriaOk = cat === "todas" || p.cat === cat;

      const buscaOk =
        !t ||
        p.name.toLowerCase().includes(t) ||
        p.brand.toLowerCase().includes(t) ||
        Object.values(p.models ?? {})
          .flat()
          .some((m) => m.toLowerCase().includes(t));

      return categoriaOk && buscaOk;
    });

    const price = (p: (typeof resultado)[number]) =>
      p.promoPrice ?? p.price;

    if (sort === "menor") {
      resultado.sort((a, b) => price(a) - price(b));
    }

    if (sort === "maior") {
      resultado.sort((a, b) => price(b) - price(a));
    }

    return resultado;
  }, [cat, q, sort]);

  return (
    <section id="catalogo" className="mx-auto max-w-6xl px-5 pt-16">
      <h2 className="mb-5 text-3xl font-bold">Nossos produtos</h2>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar produto..."
          className="flex-1 rounded-xl border border-white/15 bg-navy px-4 py-2 outline-none focus:border-electric"
        />

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-xl border border-white/15 bg-navy px-4 py-2"
        >
          <option value="padrao">Ordenar</option>
          <option value="menor">Menor preço</option>
          <option value="maior">Maior preço</option>
        </select>
      </div>

      <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setCat("todas")}
          className={`whitespace-nowrap rounded-full border px-4 py-2 ${
            cat === "todas"
              ? "border-electric bg-electric"
              : "border-white/15 hover:border-electric"
          }`}
        >
          Todas
        </button>

        {categories.map((c) => (
          <button
            key={c.slug}
            onClick={() => setCat(c.slug)}
            className={`whitespace-nowrap rounded-full border px-4 py-2 ${
              cat === c.slug
                ? "border-electric bg-electric"
                : "border-white/15 hover:border-electric"
            }`}
          >
            {c.emoji} {c.name}
          </button>
        ))}
      </div>

      {list.length === 0 && (
        <p className="text-tech">Nenhum produto encontrado.</p>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((p, i) => (
          <ProductCard key={p.id} p={p} i={i} />
        ))}
      </div>
    </section>
  );
}