// Tipos do AgendAI Pro

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  businessName: string;
  businessType: string;
  plan: 'basic' | 'professional' | 'premium';
  createdAt: Date;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number; // em minutos
  price: number;
  image?: string;
  available: boolean;
  color: string;
}

export interface Client {
  id: string;
  name: string;
  email?: string;
  phone: string;
  avatar?: string;
  totalAppointments: number;
  totalSpent: number;
  lastVisit?: Date;
  notes?: string;
  noShowCount: number;
  createdAt: Date;
}

export interface Appointment {
  id: string;
  clientId: string;
  client: Client;
  serviceId: string;
  service: Service;
  date: Date;
  startTime: string;
  endTime: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no-show';
  notes?: string;
  reminderSent: boolean;
  confirmationSent: boolean;
  createdAt: Date;
}

export interface DashboardStats {
  todayRevenue: number;
  monthRevenue: number;
  todayAppointments: number;
  monthAppointments: number;
  activeClients: number;
  noShowRate: number;
  topServices: Array<{
    service: Service;
    count: number;
    revenue: number;
  }>;
  topClients: Array<{
    client: Client;
    count: number;
    revenue: number;
  }>;
}

export interface TimeSlot {
  time: string;
  available: boolean;
  appointmentId?: string;
}

export interface BusinessHours {
  dayOfWeek: number; // 0-6 (domingo-sábado)
  isOpen: boolean;
  openTime: string;
  closeTime: string;
}
