// Keoto Integration - Sistema de Pagamentos
const KEOTO_API_URL = 'https://api.keoto.com/v1';
const KEOTO_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb21wYW55SWQiOjQzOCwiaWF0IjoxNzYzOTQ4OTM3LCJleHAiOjE3OTU0ODQ5MzcsInN1YiI6Ijc3YjI0NGIwLTA1NjYtNDVmYy05YmUzLTg0OTU0OTlhOGM5MiJ9.Wz4R82cTscaBJ-ig1asLwcFeI6c1p-C0q_TZSOXb99Y';

// Link direto do checkout da Keoto para o plano de R$ 49,90
const KEOTO_CHECKOUT_URL = 'https://checkout.keoto.com/339de384-fea4-4c7f-894b-db638a95fae5';

interface CreateCheckoutParams {
  planId: string;
  billingCycle: 'monthly' | 'yearly';
  customerEmail: string;
  customerName: string;
  businessName: string;
}

export async function createKeotoCheckout(params: CreateCheckoutParams): Promise<string> {
  // Retorna o link direto do checkout da Keoto
  // Este link já está configurado para o plano de R$ 49,90 (mensal e anual)
  return KEOTO_CHECKOUT_URL;
}

export async function verifyKeotoPayment(sessionId: string): Promise<boolean> {
  try {
    const response = await fetch(`${KEOTO_API_URL}/checkout/verify/${sessionId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${KEOTO_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Erro ao verificar pagamento');
    }

    const data = await response.json();
    return data.status === 'paid';
  } catch (error) {
    console.error('Erro ao verificar pagamento:', error);
    return false;
  }
}

export async function cancelKeotoSubscription(subscriptionId: string): Promise<boolean> {
  try {
    const response = await fetch(`${KEOTO_API_URL}/subscriptions/${subscriptionId}/cancel`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${KEOTO_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Erro ao cancelar assinatura');
    }

    return true;
  } catch (error) {
    console.error('Erro ao cancelar assinatura:', error);
    return false;
  }
}
