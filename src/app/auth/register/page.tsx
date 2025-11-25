'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { signUp } from '@/lib/auth';
import { createKeotoCheckout } from '@/lib/keoto';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Loader2, Sparkles, AlertCircle, CheckCircle } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    professionalName: '',
    businessName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<string>('professional');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  useEffect(() => {
    const plan = searchParams.get('plan');
    const billing = searchParams.get('billing');
    if (plan) setSelectedPlan(plan);
    if (billing === 'yearly' || billing === 'monthly') setBillingCycle(billing);
  }, [searchParams]);

  const planNames: Record<string, string> = {
    basic: 'Básico',
    professional: 'Profissional',
    premium: 'Premium',
  };

  const planPrices: Record<string, { monthly: number; yearly: number }> = {
    basic: { monthly: 49.90, yearly: 39.90 },
    professional: { monthly: 79.90, yearly: 59.90 },
    premium: { monthly: 149.90, yearly: 127.90 },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    if (formData.password.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres');
      return;
    }

    setLoading(true);

    try {
      // 1. Criar conta no Supabase
      await signUp(
        formData.email,
        formData.password,
        formData.professionalName,
        formData.businessName
      );

      // 2. Criar sessão de checkout na Keoto
      const checkoutUrl = await createKeotoCheckout({
        planId: selectedPlan,
        billingCycle: billingCycle,
        customerEmail: formData.email,
        customerName: formData.professionalName,
        businessName: formData.businessName,
      });

      // 3. Redirecionar para o checkout da Keoto
      window.location.href = checkoutUrl;
    } catch (err: any) {
      setError(err.message || 'Erro ao criar conta. Tente novamente.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Calendar className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Criar Conta
          </CardTitle>
          <CardDescription className="text-base">
            Comece a gerenciar seus agendamentos com IA
          </CardDescription>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            7 Dias Grátis - Cancele Quando Quiser
          </div>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {/* Plano Selecionado */}
            <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Plano Selecionado:</span>
                <Link href="/pricing" className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                  Alterar
                </Link>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-gray-900">
                  {planNames[selectedPlan]}
                </span>
                <span className="text-lg text-gray-600">
                  R$ {planPrices[selectedPlan][billingCycle].toFixed(2).replace('.', ',')}/{billingCycle === 'monthly' ? 'mês' : 'mês'}
                </span>
              </div>
              <p className="text-xs text-gray-600 mt-1">
                {billingCycle === 'yearly' ? 'Cobrança anual' : 'Cobrança mensal'}
              </p>
            </div>

            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="professionalName">Seu Nome</Label>
              <Input
                id="professionalName"
                type="text"
                placeholder="João Silva"
                value={formData.professionalName}
                onChange={(e) => setFormData({ ...formData, professionalName: e.target.value })}
                required
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessName">Nome do Negócio</Label>
              <Input
                id="businessName"
                type="text"
                placeholder="Barbearia do João"
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                required
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="h-11"
                minLength={6}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Senha</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
                className="h-11"
                minLength={6}
              />
            </div>

            {/* Informações sobre o Checkout */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg space-y-2">
              <div className="flex items-center gap-2 text-blue-700 font-medium">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">Próximo Passo: Pagamento Seguro</span>
              </div>
              <p className="text-xs text-blue-600">
                Após criar sua conta, você será redirecionado para o checkout seguro da Keoto para adicionar seu método de pagamento.
              </p>
              <p className="text-xs text-blue-600 font-medium">
                Você não será cobrado nos próximos 7 dias. Cancele a qualquer momento sem custos.
              </p>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium shadow-lg"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Criando conta...
                </>
              ) : (
                'Criar Conta e Ir para Pagamento'
              )}
            </Button>
            <div className="text-center text-sm text-gray-600">
              Já tem uma conta?{' '}
              <Link href="/auth/login" className="text-blue-600 hover:text-blue-700 font-medium">
                Faça login
              </Link>
            </div>
            <p className="text-xs text-center text-gray-500">
              Ao continuar, você concorda com nossos Termos de Serviço e Política de Privacidade
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
