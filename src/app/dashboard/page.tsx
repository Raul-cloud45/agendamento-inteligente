'use client';

import { 
  Calendar, 
  DollarSign, 
  Users, 
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { StatsCard } from '@/components/custom/stats-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  // Dados mockados - em produção viriam do banco de dados
  const stats = {
    todayRevenue: 850.00,
    monthRevenue: 12450.00,
    todayAppointments: 8,
    monthAppointments: 156,
    activeClients: 89,
    noShowRate: 5.2,
  };

  const upcomingAppointments = [
    {
      id: '1',
      client: 'Maria Silva',
      service: 'Corte + Escova',
      time: '14:00',
      status: 'confirmed',
      avatar: 'MS',
    },
    {
      id: '2',
      client: 'João Santos',
      service: 'Barba',
      time: '15:00',
      status: 'pending',
      avatar: 'JS',
    },
    {
      id: '3',
      client: 'Ana Costa',
      service: 'Coloração',
      time: '16:30',
      status: 'confirmed',
      avatar: 'AC',
    },
  ];

  const topServices = [
    { name: 'Corte Masculino', count: 45, revenue: 2250.00, color: 'from-blue-500 to-cyan-500' },
    { name: 'Escova', count: 38, revenue: 1900.00, color: 'from-purple-500 to-pink-500' },
    { name: 'Coloração', count: 22, revenue: 3300.00, color: 'from-orange-500 to-red-500' },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Bem-vindo de volta! Aqui está um resumo do seu negócio.</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg">
          <Calendar className="w-4 h-4 mr-2" />
          Novo Agendamento
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Faturamento Hoje"
          value={`R$ ${stats.todayRevenue.toFixed(2).replace('.', ',')}`}
          icon={DollarSign}
          color="from-green-500 to-emerald-500"
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatsCard
          title="Faturamento Mês"
          value={`R$ ${stats.monthRevenue.toFixed(2).replace('.', ',')}`}
          icon={TrendingUp}
          color="from-blue-500 to-cyan-500"
          trend={{ value: 8.3, isPositive: true }}
        />
        <StatsCard
          title="Agendamentos Hoje"
          value={stats.todayAppointments}
          icon={Calendar}
          color="from-purple-500 to-pink-500"
        />
        <StatsCard
          title="Clientes Ativos"
          value={stats.activeClients}
          icon={Users}
          color="from-orange-500 to-red-500"
          trend={{ value: 15.2, isPositive: true }}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Próximos Agendamentos */}
        <Card className="lg:col-span-2 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              Próximos Agendamentos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {appointment.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{appointment.client}</p>
                    <p className="text-sm text-gray-600">{appointment.service}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{appointment.time}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {appointment.status === 'confirmed' ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-xs text-green-600 font-medium">Confirmado</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-4 h-4 text-yellow-500" />
                          <span className="text-xs text-yellow-600 font-medium">Pendente</span>
                        </>
                      )}
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Ver Detalhes
                  </Button>
                </div>
              </div>
            ))}
            <Button variant="ghost" className="w-full text-blue-600 hover:text-blue-700">
              Ver Todos os Agendamentos →
            </Button>
          </CardContent>
        </Card>

        {/* Serviços Mais Vendidos */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              Top Serviços
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {topServices.map((service, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">{service.name}</span>
                  <span className="text-sm text-gray-600">{service.count}x</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${service.color} rounded-full`}
                      style={{ width: `${(service.count / 45) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    R$ {service.revenue.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Calendar className="w-6 h-6" />
              <span className="text-sm">Novo Agendamento</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Users className="w-6 h-6" />
              <span className="text-sm">Adicionar Cliente</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <CheckCircle className="w-6 h-6" />
              <span className="text-sm">Confirmar Horários</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <TrendingUp className="w-6 h-6" />
              <span className="text-sm">Ver Relatórios</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
