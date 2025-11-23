'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, MessageSquare, Users, TrendingUp, Sparkles, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AgendaPro
            </span>
          </div>
          <div className="flex gap-3">
            <Link href="/auth/login">
              <Button variant="ghost" className="font-medium">
                Entrar
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium shadow-lg">
                Começar Grátis
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            Sistema com Inteligência Artificial
          </div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Agendamento Inteligente com{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              IA e WhatsApp
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Automatize confirmações, recupere clientes sumidos e evite faltas com mensagens personalizadas por IA
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/auth/register">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium shadow-xl h-14 px-8 text-lg">
                Começar Agora - Grátis
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-medium">
              Ver Demonstração
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Tudo que você precisa em um só lugar
          </h2>
          <p className="text-xl text-gray-600">
            Sistema completo para profissionais que querem crescer
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: Calendar,
              title: 'Agendamento Online',
              description: 'Seus clientes agendam pelo link personalizado 24/7',
              color: 'from-blue-500 to-cyan-500',
            },
            {
              icon: MessageSquare,
              title: 'WhatsApp Automático',
              description: 'Confirmações e lembretes enviados automaticamente',
              color: 'from-green-500 to-emerald-500',
            },
            {
              icon: Sparkles,
              title: 'Mensagens com IA',
              description: 'IA cria mensagens naturais e personalizadas',
              color: 'from-purple-500 to-pink-500',
            },
            {
              icon: Users,
              title: 'Recuperação de Clientes',
              description: 'IA identifica e reconquista clientes sumidos',
              color: 'from-orange-500 to-red-500',
            },
            {
              icon: TrendingUp,
              title: 'Relatórios Completos',
              description: 'Acompanhe faturamento, taxa de comparecimento e mais',
              color: 'from-indigo-500 to-blue-500',
            },
            {
              icon: CheckCircle,
              title: 'Evite Faltas',
              description: 'Lembretes inteligentes reduzem no-show em até 80%',
              color: 'from-teal-500 to-green-500',
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:scale-105"
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 shadow-lg`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 md:p-16 text-center text-white shadow-2xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Pronto para transformar seu negócio?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Junte-se a centenas de profissionais que já automatizaram seus agendamentos
          </p>
          <Link href="/auth/register">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-bold h-14 px-10 text-lg shadow-xl">
              Criar Conta Grátis
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2024 AgendaPro. Sistema de agendamento inteligente com IA.</p>
        </div>
      </footer>
    </div>
  );
}
