'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, MessageSquare, Users, TrendingUp, CheckCircle, ArrowRight, Play, X } from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: 'Bem-vindo ao AgendaPro! 🎉',
      description: 'Vamos fazer um tour rápido pelas principais funcionalidades',
      icon: Calendar,
      color: 'from-blue-500 to-cyan-500',
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            O AgendaPro é sua solução completa para gerenciar agendamentos com inteligência artificial. 
            Em poucos minutos, você estará pronto para receber seus primeiros agendamentos!
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">⚡ Rápido de Configurar</h4>
              <p className="text-sm text-blue-700">Configure seu perfil e serviços em menos de 5 minutos</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-2">🤖 IA Integrada</h4>
              <p className="text-sm text-purple-700">Mensagens automáticas personalizadas para cada cliente</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Agendamento Online 24/7',
      description: 'Seus clientes podem agendar a qualquer hora',
      icon: Calendar,
      color: 'from-green-500 to-emerald-500',
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            Você terá um link personalizado que pode compartilhar com seus clientes. 
            Eles poderão ver sua agenda em tempo real e agendar o melhor horário.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg border-2 border-dashed border-gray-300">
            <p className="text-sm text-gray-600 mb-2">Exemplo do seu link:</p>
            <p className="font-mono text-blue-600 font-semibold">agendapro.com/seunegocio</p>
          </div>
          <ul className="space-y-2 mt-4">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-700">Clientes veem apenas horários disponíveis</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-700">Sincronização automática com sua agenda</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-700">Confirmação instantânea por WhatsApp</span>
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: 'WhatsApp Automático com IA',
      description: 'Confirmações e lembretes personalizados',
      icon: MessageSquare,
      color: 'from-purple-500 to-pink-500',
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            Nossa IA cria mensagens naturais e personalizadas para cada cliente. 
            Você pode revisar e editar antes de enviar, ou deixar tudo no automático.
          </p>
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
            <p className="text-sm font-semibold text-purple-900 mb-2">Exemplo de mensagem gerada pela IA:</p>
            <p className="text-sm text-gray-700 italic">
              "Oi João! 👋 Tudo bem? Só passando pra confirmar seu horário amanhã às 14h para corte + barba. 
              Qualquer coisa, é só me avisar! Até lá! ✂️"
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">24h</p>
              <p className="text-xs text-gray-600">Antes do horário</p>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">2h</p>
              <p className="text-xs text-gray-600">Lembrete final</p>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">80%</p>
              <p className="text-xs text-gray-600">Menos faltas</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Recuperação de Clientes',
      description: 'IA identifica e reconquista clientes sumidos',
      icon: Users,
      color: 'from-orange-500 to-red-500',
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            A IA analisa seu histórico e identifica clientes que não agendam há tempo. 
            Ela cria mensagens personalizadas para reconquistar cada um deles.
          </p>
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <p className="text-sm font-semibold text-orange-900 mb-2">Exemplo de recuperação:</p>
            <p className="text-sm text-gray-700 italic">
              "E aí Maria! 😊 Faz tempo que não te vejo por aqui! Tô com uma promoção especial 
              pra clientes antigos: 20% off em qualquer serviço. Que tal agendar? Tô com saudade! 💇‍♀️"
            </p>
          </div>
          <ul className="space-y-2 mt-4">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-700">IA identifica o melhor momento para contatar</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-700">Mensagens personalizadas para cada cliente</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-700">Você aprova antes de enviar</span>
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: 'Relatórios e Insights',
      description: 'Acompanhe o crescimento do seu negócio',
      icon: TrendingUp,
      color: 'from-indigo-500 to-blue-500',
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            Tenha acesso a relatórios completos sobre seu negócio: faturamento, 
            taxa de comparecimento, horários mais procurados e muito mais.
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">📊 Faturamento</h4>
              <p className="text-sm text-blue-700">Acompanhe sua receita diária, semanal e mensal</p>
            </div>
            <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
              <h4 className="font-semibold text-indigo-900 mb-2">📈 Crescimento</h4>
              <p className="text-sm text-indigo-700">Veja a evolução do seu negócio ao longo do tempo</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-purple-900 mb-2">⏰ Horários</h4>
              <p className="text-sm text-purple-700">Identifique os horários mais procurados</p>
            </div>
            <div className="p-4 bg-pink-50 rounded-lg border border-pink-200">
              <h4 className="font-semibold text-pink-900 mb-2">👥 Clientes</h4>
              <p className="text-sm text-pink-700">Analise o comportamento dos seus clientes</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Pronto para Começar! 🚀',
      description: 'Vamos configurar seu perfil e criar seus primeiros serviços',
      icon: CheckCircle,
      color: 'from-green-500 to-emerald-500',
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            Você está pronto para começar a usar o AgendaPro! Nos próximos passos, vamos:
          </p>
          <div className="space-y-3 mt-6">
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Configurar seu Perfil</h4>
                <p className="text-sm text-gray-600">Nome do negócio, horários de funcionamento e foto</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg">
              <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Adicionar Serviços</h4>
                <p className="text-sm text-gray-600">Crie seus serviços com preços e duração</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Conectar WhatsApp</h4>
                <p className="text-sm text-gray-600">Integre seu WhatsApp para enviar mensagens automáticas</p>
              </div>
            </div>
          </div>
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white">
            <p className="font-semibold mb-2">🎁 Lembre-se:</p>
            <p className="text-sm">
              Você tem 7 dias grátis para testar todas as funcionalidades. 
              Não será cobrado nada durante este período!
            </p>
          </div>
        </div>
      ),
    },
  ];

  const currentStepData = steps[currentStep];
  const Icon = currentStepData.icon;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push('/dashboard');
    }
  };

  const handleSkip = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl shadow-2xl">
        <CardHeader className="relative">
          <button
            onClick={handleSkip}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center justify-center mb-4">
            <div className={`w-16 h-16 bg-gradient-to-br ${currentStepData.color} rounded-2xl flex items-center justify-center shadow-lg`}>
              <Icon className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-center">
            {currentStepData.title}
          </CardTitle>
          <CardDescription className="text-center text-base">
            {currentStepData.description}
          </CardDescription>
          
          {/* Progress Bar */}
          <div className="flex gap-2 mt-6">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 flex-1 rounded-full transition-all ${
                  index <= currentStep
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600'
                    : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {currentStepData.content}

          <div className="flex gap-3 pt-6">
            {currentStep > 0 && (
              <Button
                variant="outline"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="flex-1"
              >
                Voltar
              </Button>
            )}
            <Button
              onClick={handleNext}
              className={`flex-1 bg-gradient-to-r ${currentStepData.color} hover:opacity-90 text-white font-medium shadow-lg`}
            >
              {currentStep === steps.length - 1 ? (
                <>
                  Ir para o Dashboard
                  <ArrowRight className="ml-2 w-4 h-4" />
                </>
              ) : (
                <>
                  Próximo
                  <ArrowRight className="ml-2 w-4 h-4" />
                </>
              )}
            </Button>
          </div>

          <div className="text-center">
            <button
              onClick={handleSkip}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Pular tutorial
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
