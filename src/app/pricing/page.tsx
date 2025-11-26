'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Check, Sparkles, Calendar, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function PricingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  useEffect(() => {
    const planParam = searchParams.get('plan');
    if (planParam) {
      setSelectedPlan(planParam);
    }
  }, [searchParams]);

  const plans = [
    {
      id: 'basic',
      name: 'Básico',
      description: 'Ideal para começar',
      priceMonthly: 39.90,
      priceYearly: 33.83,
      color: 'from-blue-500 to-cyan-500',
      features: [
        'Agendamento online 24/7',
        'Até 50 agendamentos/mês',
        'Até 100 clientes',
        'Até 5 serviços',
        'Confirmações automáticas',
        'Suporte por email',
      ],
      popular: false,
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'Para profissionais em crescimento',
      priceMonthly: 49.90,
      priceYearly: 39.92,
      color: 'from-purple-500 to-pink-500',
      features: [
        'Tudo do plano Básico',
        'Agendamentos ilimitados',
        'Clientes ilimitados',
        'Até 20 serviços',
        'Mensagens com IA',
        'Recuperação de clientes',
        'WhatsApp integrado',
        'Relatórios avançados',
        'Suporte prioritário',
      ],
      popular: true,
    },
    {
      id: 'premium',
      name: 'Premium',
      description: 'Solução completa para seu negócio',
      priceMonthly: 54.90,
      priceYearly: 41.08,
      color: 'from-orange-500 to-red-500',
      features: [
        'Tudo do plano Pro',
        'Serviços ilimitados',
        'Multi-profissionais',
        'API personalizada',
        'Integração avançada',
        'Treinamento personalizado',
        'Suporte VIP 24/7',
        'Personalização completa',
      ],
      popular: false,
    },
  ];

  const getPrice = (plan: typeof plans[0]) => {
    return billingCycle === 'monthly' ? plan.priceMonthly : plan.priceYearly;
  };

  const getSavings = (plan: typeof plans[0]) => {
    if (billingCycle === 'monthly') return 0;
    const yearlyTotal = plan.priceMonthly * 12;
    const yearlyPrice = plan.priceYearly * 12;
    const savings = yearlyTotal - yearlyPrice;
    const percentage = Math.round((savings / yearlyTotal) * 100);
    return percentage;
  };

  const handleSelectPlan = (planId: string) => {
    // Redireciona direto para o checkout da Keoto para o plano de R$ 49,90
    window.location.href = 'https://checkout.keoto.com/339de384-fea4-4c7f-894b-db638a95fae5';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AgendAI Pro
            </span>
          </Link>
          <div className="flex gap-3">
            <Link href="/auth/login">
              <Button variant="ghost" className="font-medium">
                Entrar
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            7 Dias Grátis em Todos os Planos
          </div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Escolha o plano ideal para{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              seu negócio
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comece com 7 dias grátis. Cancele quando quiser. Sem compromisso.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mt-12 mb-12">
          <span className={`text-lg font-medium ${billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-500'}`}>
            Mensal
          </span>
          <button
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
            className={`relative w-16 h-8 rounded-full transition-colors ${
              billingCycle === 'yearly' ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-gray-300'
            }`}
          >
            <div
              className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                billingCycle === 'yearly' ? 'translate-x-8' : 'translate-x-0'
              }`}
            />
          </button>
          <span className={`text-lg font-medium ${billingCycle === 'yearly' ? 'text-gray-900' : 'text-gray-500'}`}>
            Anual
          </span>
          {billingCycle === 'yearly' && (
            <span className="ml-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
              Economize até 25%
            </span>
          )}
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative shadow-xl hover:shadow-2xl transition-all duration-300 ${
                plan.popular ? 'border-2 border-purple-500 scale-105 md:scale-110' : 'border border-gray-200'
              } ${selectedPlan === plan.id ? 'ring-4 ring-blue-500' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold rounded-full shadow-lg">
                  MAIS POPULAR
                </div>
              )}
              <CardHeader className="text-center pb-8 pt-8">
                <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${plan.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold mb-2">{plan.name}</CardTitle>
                <CardDescription className="text-base">{plan.description}</CardDescription>
                <div className="mt-6">
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-4xl font-bold">
                      R$ {getPrice(plan).toFixed(2).replace('.', ',')}
                    </span>
                    <span className="text-gray-600">/{billingCycle === 'monthly' ? 'mês' : 'mês'}</span>
                  </div>
                  {billingCycle === 'yearly' && getSavings(plan) > 0 && (
                    <div className="mt-2 space-y-1">
                      <p className="text-sm text-green-600 font-medium">
                        Economize {getSavings(plan)}% no plano anual
                      </p>
                      <p className="text-xs text-gray-500">
                        R$ {(getPrice(plan) * 12).toFixed(2).replace('.', ',')} cobrado anualmente
                      </p>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${plan.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button
                  onClick={() => handleSelectPlan(plan.id)}
                  className={`w-full h-12 text-base font-semibold bg-gradient-to-r ${plan.color} hover:opacity-90 text-white shadow-lg`}
                >
                  Escolher {plan.name}
                </Button>
                <p className="text-xs text-center text-gray-500">
                  7 dias grátis • Cancele quando quiser
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Section */}
        <div className="mt-20 text-center space-y-8">
          <h3 className="text-2xl font-bold text-gray-900">Por que escolher o AgendAI Pro?</h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="space-y-3">
              <div className="w-12 h-12 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                <Check className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold">7 Dias Grátis</h4>
              <p className="text-sm text-gray-600">
                Teste todas as funcionalidades sem compromisso
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold">Cancele Quando Quiser</h4>
              <p className="text-sm text-gray-600">
                Sem multas ou taxas de cancelamento
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 mx-auto bg-purple-100 rounded-full flex items-center justify-center">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold">Suporte Dedicado</h4>
              <p className="text-sm text-gray-600">
                Equipe pronta para ajudar você a crescer
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2024 AgendAI Pro. Sistema de agendamento inteligente com IA.</p>
        </div>
      </footer>
    </div>
  );
}