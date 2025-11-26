import type { Metadata } from "next";
import "@fontsource/inter";
import "./globals.css";

export const metadata: Metadata = {
  title: "AgendAI Pro - Sistema Inteligente de Agendamentos",
  description: "Sistema completo de agendamento com IA, confirmação automática por WhatsApp e recuperação de clientes. Ideal para profissionais de beleza, saúde e serviços.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="font-inter antialiased">
        {children}
      </body>
    </html>
  );
}
