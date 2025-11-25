'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, getProfessionalProfile, getProfessionalSubscription, signOut } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Users, MessageSquare, TrendingUp, Settings, LogOut, Loader2, Sparkles, Crown } from 'lucide-react';
import type { Professional, ProfessionalSubscription } from '@/lib/types';

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [professional, setProfessional] = useState<Professional | null>(null);
  const [subscription, setSubscription] = useState<ProfessionalSubscription | null>(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        const user = await getCurrentUser();
        if (!user) {
          router.push('/auth/login');
          return;
        }

        const profile = await getProfessionalProfile(user.id);
        setProfessional(profile);

        if (profile) {
          const sub = await getProfessionalSubscription(profile.id);
          setSubscription(sub);
        }
      } catch (error) {
        console.error('Erro ao carregar perfil:', error);
        router.push('/auth/login');
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [router]);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const getTrialDaysRemaining = () => {
    if (!subscription?.trial_ends_at) return 0;
    const trialEnd = new Date(subscription.trial_ends_at);
    const now = new Date();
    const diffTime = trialEnd.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  const trialDays = getTrialDaysRemaining();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">{professional?.business_name}</h1>
              <p className="text-sm text-gray-600">{professional?.professional_name}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleSignOut}>
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Trial Banner */}
      {subscription?.status === 'trial' && trialDays > 0 && (
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5" />
                <span className="font-medium">
                  Você está no período de teste grátis! {trialDays} {trialDays === 1 ? 'dia restante' : 'dias restantes'}
                </span>
              </div>
              <Button size="sm" variant="secondary" className="bg-white text-green-600 hover:bg-gray-100">
                Ver Planos
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Bem-vindo de volta! 👋</h2>
          <p className="text-gray-600">Aqui está um resumo do seu negócio hoje</p>
        </div>

        {/* Subscription Card */}
        {subscription && (
          <Card className="mb-8 border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">
                      Plano {subscription.plan?.name}
                    </CardTitle>
                    <CardDescription>
                      {subscription.status === 'trial' 
                        ? `Teste grátis - ${trialDays} dias restantes`
                        : `Ciclo ${subscription.billing_cycle === 'monthly' ? 'mensal' : 'anual'}`
                      }
                    </CardDescription>
                  </div>
                </div>
                <Button variant="outline" className="border-purple-300 hover:bg-purple-100">
                  Gerenciar Plano
                </Button>
              </div>
            </CardHeader>
          </Card>
        )}

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: 'Agendamentos Hoje',
              value: '0',
              icon: Calendar,
              color: 'from-blue-500 to-cyan-500',
            },
            {
              title: 'Total de Clientes',
              value: '0',
              icon: Users,
              color: 'from-purple-500 to-pink-500',
            },
            {
              title: 'Mensagens Enviadas',
              value: '0',
              icon: MessageSquare,
              color: 'from-green-500 to-emerald-500',
            },
            {
              title: 'Taxa de Comparecimento',
              value: '0%',
              icon: TrendingUp,
              color: 'from-orange-500 to-red-500',
            },
          ].map((stat, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105">
            <CardHeader>
              <CardTitle>Configurar Perfil</CardTitle>
              <CardDescription>
                Configure seus serviços, horários e informações
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                Configurar Agora
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105">
            <CardHeader>
              <CardTitle>Ver Agenda</CardTitle>
              <CardDescription>
                Gerencie seus agendamentos e horários
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                Abrir Agenda
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105">
            <CardHeader>
              <CardTitle>Mensagens IA</CardTitle>
              <CardDescription>
                Configure mensagens automáticas inteligentes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                Configurar Mensagens
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Setup Guide */}
        <Card className="mt-8 shadow-lg border-2 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">🚀</span>
              Primeiros Passos
            </CardTitle>
            <CardDescription>
              Complete estas etapas para começar a receber agendamentos
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div className="flex-1">
                <h4 className="font-semibold mb-1">Configure seu perfil</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Adicione seus serviços, preços e horários de atendimento
                </p>
                <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                  Configurar Perfil
                </Button>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg opacity-60">
              <div className="w-8 h-8 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div className="flex-1">
                <h4 className="font-semibold mb-1">Conecte o WhatsApp</h4>
                <p className="text-sm text-gray-600">
                  Ative mensagens automáticas para seus clientes
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg opacity-60">
              <div className="w-8 h-8 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div className="flex-1">
                <h4 className="font-semibold mb-1">Compartilhe seu link</h4>
                <p className="text-sm text-gray-600">
                  Divulgue seu link de agendamento para seus clientes
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
