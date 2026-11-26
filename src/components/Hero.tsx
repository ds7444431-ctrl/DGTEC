"use client";
import { motion } from "framer-motion";
export function Hero() {
  return (
    <section className="bg-grid relative overflow-hidden px-5 py-24 text-center">
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-electric/30 blur-[120px]" />
      <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative text-sm uppercase tracking-[0.3em] text-electric">Tudo em Tecnologia</motion.p>
      <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.7 }}
        className="relative mx-auto mt-4 max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl">
        Acessórios e tecnologia para <span className="bg-gradient-to-r from-electric via-sky-300 to-electric bg-[length:200%_100%] bg-clip-text text-transparent animate-shine">levar seu mundo além</span>
      </motion.h1>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="relative mt-8">
        <a href="#catalogo" className="btn-glow inline-block rounded-full px-8 py-3 font-semibold">Ver ofertas</a>
      </motion.div>
      <div className="relative mt-12 flex justify-center gap-6 text-5xl">
        {["🎧", "📱", "⌚", "🎮"].map((e, i) => <span key={e} className="animate-float" style={{ animationDelay: `${i * 0.6}s` }}>{e}</span>)}
      </div>
    </section>
  );
}
