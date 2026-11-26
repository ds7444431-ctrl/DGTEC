"use client";
import { createContext, useContext, useEffect, useState, useCallback } from "react";

export type CartItem = { id: string; name: string; price: number; qty: number; emoji: string };
type Ctx = {
  items: CartItem[]; open: boolean; setOpen: (v: boolean) => void;
  add: (i: Omit<CartItem, "qty">) => void; remove: (id: string) => void; setQty: (id: string, q: number) => void;
  clear: () => void; count: number; total: number;
  favs: string[]; toggleFav: (id: string) => void;
};
const C = createContext<Ctx | null>(null);
export const useStore = () => { const c = useContext(C); if (!c) throw new Error("Providers ausente"); return c; };

const load = <T,>(k: string, d: T): T => { try { return JSON.parse(localStorage.getItem(k) ?? "") as T; } catch { return d; } };

export function Providers({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [favs, setFavs] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => { setItems(load("dgtec:cart", [])); setFavs(load("dgtec:favs", [])); setReady(true); }, []);
  useEffect(() => { if (ready) localStorage.setItem("dgtec:cart", JSON.stringify(items)); }, [items, ready]);
  useEffect(() => { if (ready) localStorage.setItem("dgtec:favs", JSON.stringify(favs)); }, [favs, ready]);

  const add = useCallback((i: Omit<CartItem, "qty">) => {
    setItems((p) => p.some((x) => x.id === i.id) ? p.map((x) => x.id === i.id ? { ...x, qty: x.qty + 1 } : x) : [...p, { ...i, qty: 1 }]);
    setOpen(true);
  }, []);
  const remove = (id: string) => setItems((p) => p.filter((x) => x.id !== id));
  const setQty = (id: string, q: number) => setItems((p) => q <= 0 ? p.filter((x) => x.id !== id) : p.map((x) => x.id === id ? { ...x, qty: q } : x));
  const toggleFav = (id: string) => setFavs((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);

  const count = items.reduce((s, i) => s + i.qty, 0);
  const total = items.reduce((s, i) => s + i.qty * i.price, 0);
  return <C.Provider value={{ items, open, setOpen, add, remove, setQty, clear: () => setItems([]), count, total, favs, toggleFav }}>{children}</C.Provider>;
}
