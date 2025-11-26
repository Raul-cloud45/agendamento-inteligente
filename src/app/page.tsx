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
              AgendAI Pro
            </span>
          </div>
          <div className="flex gap-3">
            <Link href="/pricing">
              <Button variant="ghost" className="font-medium">
                Planos
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button variant="ghost" className="font-medium">
                Entrar
              </Button>
            </Link>
            <Link href="/pricing">
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            7 Dias Grátis - Teste Sem Compromisso
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
            <Link href="/pricing">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium shadow-xl h-14 px-8 text-lg">
                Começar Agora
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-medium">
                Ver Planos e Preços
              </Button>
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            ✓ 7 dias grátis ✓ Cancele quando quiser ✓ Suporte dedicado
          </p>
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

      {/* Pricing Preview */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Planos para todos os tamanhos
          </h2>
          <p className="text-xl text-gray-600">
            Comece grátis por 7 dias. Escolha o melhor plano para você.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
          {/* Plano Básico */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 text-center hover:shadow-xl transition-all">
            <h3 className="text-2xl font-bold mb-2">Básico</h3>
            <div className="mb-2">
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-bold text-blue-600">R$ 39,90</span>
                <span className="text-gray-600">/mês</span>
              </div>
            </div>
            <div className="mb-6">
              <span className="text-sm text-green-600 font-semibold">15% desconto anual</span>
              <div className="text-xs text-gray-500 mt-1">R$ 406/ano</div>
            </div>
            <p className="text-gray-600 mb-6">Ideal para começar</p>
            <ul className="space-y-3 text-left mb-8">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-sm">Até 100 agendamentos/mês</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-sm">Até 200 clientes</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-sm">WhatsApp automático</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-sm">Confirmações e lembretes</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-sm">Relatórios básicos</span>
              </li>
            </ul>
            <Link href="/pricing?plan=basic">
              <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:opacity-90 font-semibold">
                Escolher Plano
              </Button>
            </Link>
          </div>

          {/* Plano Pro */}
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-8 rounded-2xl shadow-2xl text-white text-center transform scale-105 relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-yellow-400 text-gray-900 text-sm font-bold rounded-full">
              MAIS POPULAR
            </div>
            <h3 className="text-2xl font-bold mb-2">Pro</h3>
            <div className="mb-2">
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-bold">R$ 49,90</span>
                <span className="text-white/90">/mês</span>
              </div>
            </div>
            <div className="mb-6">
              <span className="text-sm text-yellow-300 font-semibold">20% desconto anual</span>
              <div className="text-xs text-white/70 mt-1">R$ 479/ano</div>
            </div>
            <p className="text-white/90 mb-6">Para crescimento</p>
            <ul className="space-y-3 text-left mb-8">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-white flex-shrink-0" />
                <span className="text-sm">Agendamentos ilimitados</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-white flex-shrink-0" />
                <span className="text-sm">Clientes ilimitados</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-white flex-shrink-0" />
                <span className="text-sm">Mensagens com IA</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-white flex-shrink-0" />
                <span className="text-sm">Recuperação de clientes</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-white flex-shrink-0" />
                <span className="text-sm">Relatórios avançados</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-white flex-shrink-0" />
                <span className="text-sm">Suporte prioritário</span>
              </li>
            </ul>
            <Link href="/pricing?plan=pro">
              <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 font-bold">
                Escolher Plano
              </Button>
            </Link>
          </div>

          {/* Plano Premium */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-purple-200 text-center hover:shadow-xl transition-all">
            <h3 className="text-2xl font-bold mb-2">Premium</h3>
            <div className="mb-2">
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-bold text-purple-600">R$ 54,90</span>
                <span className="text-gray-600">/mês</span>
              </div>
            </div>
            <div className="mb-6">
              <span className="text-sm text-green-600 font-semibold">25% desconto anual</span>
              <div className="text-xs text-gray-500 mt-1">R$ 493/ano</div>
            </div>
            <p className="text-gray-600 mb-6">Solução completa</p>
            <ul className="space-y-3 text-left mb-8">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-sm">Tudo do Pro</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-sm">Multi-profissionais (até 5)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-sm">API de integração</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-sm">White label (sua marca)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-sm">Suporte VIP 24/7</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-sm">Treinamento personalizado</span>
              </li>
            </ul>
            <Link href="/pricing?plan=premium">
              <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white hover:opacity-90 font-bold">
                Escolher Plano
              </Button>
            </Link>
          </div>
        </div>

        <div className="text-center">
          <Link href="/pricing">
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium shadow-xl h-14 px-10 text-lg">
              Ver Comparação Completa
            </Button>
          </Link>
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
          <Link href="/pricing">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-bold h-14 px-10 text-lg shadow-xl">
              Começar Agora
            </Button>
          </Link>
          <p className="text-sm mt-4 opacity-75">
            7 dias grátis • Cancele quando quiser
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2024 AgendAI Pro. Sistema de agendamento inteligente com IA.</p>
        </div>
      </footer>
    </div>
  );
}