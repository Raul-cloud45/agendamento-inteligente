// Keoto Integration
// Token de integração da Keoto
const KEOTO_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb21wYW55SWQiOjQzOCwiaWF0IjoxNzYzOTQ4OTM3LCJleHAiOjE3OTU0ODQ5MzcsInN1YiI6Ijc3YjI0NGIwLTA1NjYtNDVmYy05YmUzLTg0OTU0OTlhOGM5MiJ9.Wz4R82cTscaBJ-ig1asLwcFeI6c1p-C0q_TZSOXb99Y';

// Mapeamento de planos para IDs da Keoto
const KEOTO_PLAN_IDS: Record<string, string> = {
  basic: 'plan_basic_id', // Substitua pelos IDs reais dos planos na Keoto
  professional: 'plan_professional_id',
  premium: 'plan_premium_id',
};

export interface CheckoutData {
  planId: string;
  billingCycle: 'monthly' | 'yearly';
  customerEmail: string;
  customerName: string;
  businessName: string;
}

/**
 * Cria uma sessão de checkout na Keoto
 * @param data Dados do checkout
 * @returns URL de redirecionamento para o checkout da Keoto
 */
export async function createKeotoCheckout(data: CheckoutData): Promise<string> {
  try {
    const response = await fetch('https://api.keoto.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${KEOTO_TOKEN}`,
      },
      body: JSON.stringify({
        planId: KEOTO_PLAN_IDS[data.planId] || KEOTO_PLAN_IDS.professional,
        billingCycle: data.billingCycle,
        customer: {
          email: data.customerEmail,
          name: data.customerName,
          metadata: {
            businessName: data.businessName,
          },
        },
        successUrl: `${window.location.origin}/onboarding?checkout=success`,
        cancelUrl: `${window.location.origin}/auth/register?checkout=cancelled`,
      }),
    });

    if (!response.ok) {
      throw new Error('Erro ao criar sessão de checkout');
    }

    const result = await response.json();
    return result.checkoutUrl;
  } catch (error) {
    console.error('Erro na integração com Keoto:', error);
    throw error;
  }
}

/**
 * Verifica o status de uma assinatura na Keoto
 * @param subscriptionId ID da assinatura
 * @returns Status da assinatura
 */
export async function getSubscriptionStatus(subscriptionId: string) {
  try {
    const response = await fetch(`https://api.keoto.com/v1/subscriptions/${subscriptionId}`, {
      headers: {
        'Authorization': `Bearer ${KEOTO_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error('Erro ao verificar status da assinatura');
    }

    return await response.json();
  } catch (error) {
    console.error('Erro ao verificar assinatura:', error);
    throw error;
  }
}

/**
 * Cancela uma assinatura na Keoto
 * @param subscriptionId ID da assinatura
 */
export async function cancelSubscription(subscriptionId: string) {
  try {
    const response = await fetch(`https://api.keoto.com/v1/subscriptions/${subscriptionId}/cancel`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${KEOTO_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error('Erro ao cancelar assinatura');
    }

    return await response.json();
  } catch (error) {
    console.error('Erro ao cancelar assinatura:', error);
    throw error;
  }
}
