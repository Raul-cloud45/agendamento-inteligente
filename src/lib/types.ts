export interface Professional {
  id: string;
  user_id: string;
  business_name: string;
  professional_name: string;
  slug: string;
  phone?: string;
  address?: string;
  created_at: string;
  updated_at: string;
}

export interface ProfessionalSettings {
  id: string;
  professional_id: string;
  working_days: string[];
  working_hours: {
    start: string;
    end: string;
  };
  slot_duration: number;
  min_time_between_slots: number;
  auto_confirm: boolean;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  professional_id: string;
  name: string;
  description?: string;
  price: number;
  duration: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Client {
  id: string;
  professional_id: string;
  name: string;
  phone: string;
  whatsapp?: string;
  email?: string;
  birthday?: string;
  notes?: string;
  status: 'active' | 'inactive' | 'recovered';
  last_visit?: string;
  total_visits: number;
  created_at: string;
  updated_at: string;
}

export interface Appointment {
  id: string;
  professional_id: string;
  client_id: string;
  service_id?: string;
  appointment_date: string;
  appointment_time: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'no_show';
  notes?: string;
  created_at: string;
  updated_at: string;
  client?: Client;
  service?: Service;
}

export interface AutomatedMessage {
  id: string;
  professional_id: string;
  client_id: string;
  appointment_id?: string;
  message_type: 'confirmation' | 'reminder_24h' | 'reminder_2h' | 'feedback' | 'recovery' | 'birthday';
  message_content: string;
  sent_at: string;
  status: 'sent' | 'delivered' | 'failed';
  created_at: string;
}

export interface MessageTemplate {
  id: string;
  professional_id: string;
  template_type: string;
  template_content: string;
  tone: 'formal' | 'casual' | 'friendly' | 'professional';
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ClientRecovery {
  id: string;
  professional_id: string;
  client_id: string;
  days_since_last_visit: number;
  message_sent?: string;
  sent_at?: string;
  response_received: boolean;
  returned: boolean;
  created_at: string;
  updated_at: string;
  client?: Client;
}
