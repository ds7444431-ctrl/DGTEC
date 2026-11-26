import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "@/components/Providers";
import { Header } from "@/components/Header";
import { CartDrawer } from "@/components/CartDrawer";

export const metadata: Metadata = {
  title: { default: "DG TEC — Tudo em Tecnologia", template: "%s | DG TEC" },
  description: "Acessórios para celular, áudio, gamer, informática e casa inteligente na DG TEC.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const wa = process.env.NEXT_PUBLIC_WHATSAPP ?? "";
  return (
    <html lang="pt-BR">
      <body>
        <Providers>
          <Header whatsapp={wa} />
          <CartDrawer whatsapp={wa} />
          <main className="pt-16">{children}</main>
          <footer className="mt-24 border-t border-white/10 bg-navy px-6 py-10 text-sm text-tech">
            <p className="text-lg font-bold text-white">DG <span className="text-electric">TEC</span> — Tudo em Tecnologia</p>
            <p className="mt-2">© {new Date().getFullYear()} DG TEC. Todos os direitos reservados.</p>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
