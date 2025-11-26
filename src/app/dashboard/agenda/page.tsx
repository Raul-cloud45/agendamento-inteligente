'use client';

import { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight,
  Plus,
  Filter,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function AgendaPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'day' | 'week' | 'month'>('day');

  // Horários do dia (8h às 20h)
  const timeSlots = Array.from({ length: 13 }, (_, i) => {
    const hour = i + 8;
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  // Agendamentos mockados
  const appointments = [
    {
      id: '1',
      client: 'Maria Silva',
      service: 'Corte + Escova',
      time: '09:00',
      duration: 60,
      status: 'confirmed',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: '2',
      client: 'João Santos',
      service: 'Barba',
      time: '11:00',
      duration: 30,
      status: 'pending',
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: '3',
      client: 'Ana Costa',
      service: 'Coloração',
      time: '14:00',
      duration: 120,
      status: 'confirmed',
      color: 'from-orange-500 to-red-500',
    },
  ];

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const goToPreviousDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
  };

  const goToNextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Agenda</h1>
          <p className="text-gray-600 mt-1 capitalize">{formatDate(currentDate)}</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg">
          <Plus className="w-4 h-4 mr-2" />
          Novo Agendamento
        </Button>
      </div>

      {/* Controls */}
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Navigation */}
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={goToPreviousDay}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={goToToday}>
                Hoje
              </Button>
              <Button variant="outline" size="sm" onClick={goToNextDay}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
              <Button
                variant={view === 'day' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setView('day')}
                className={view === 'day' ? 'bg-white shadow-sm' : ''}
              >
                Dia
              </Button>
              <Button
                variant={view === 'week' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setView('week')}
                className={view === 'week' ? 'bg-white shadow-sm' : ''}
              >
                Semana
              </Button>
              <Button
                variant={view === 'month' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setView('month')}
                className={view === 'month' ? 'bg-white shadow-sm' : ''}
              >
                Mês
              </Button>
            </div>

            {/* Search and Filter */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Buscar cliente..."
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calendar Grid */}
      <div className="grid lg:grid-cols-4 gap-6">
        {/* Time Slots */}
        <Card className="lg:col-span-3 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-blue-600" />
              Horários do Dia
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {timeSlots.map((time) => {
                const appointment = appointments.find(apt => apt.time === time);
                
                return (
                  <div key={time} className="flex items-stretch gap-4 min-h-[60px]">
                    {/* Time Label */}
                    <div className="w-20 flex-shrink-0 text-sm font-medium text-gray-600 pt-2">
                      {time}
                    </div>

                    {/* Slot */}
                    <div className="flex-1 relative">
                      {appointment ? (
                        <div
                          className={`p-4 rounded-xl bg-gradient-to-r ${appointment.color} text-white shadow-md hover:shadow-lg transition-all cursor-pointer`}
                          style={{ height: `${(appointment.duration / 30) * 30}px` }}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-semibold">{appointment.client}</p>
                              <p className="text-sm opacity-90">{appointment.service}</p>
                              <p className="text-xs opacity-75 mt-1">
                                {appointment.duration} minutos
                              </p>
                            </div>
                            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                              appointment.status === 'confirmed' 
                                ? 'bg-white/20' 
                                : 'bg-yellow-400/30'
                            }`}>
                              {appointment.status === 'confirmed' ? 'Confirmado' : 'Pendente'}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <button className="w-full h-full border-2 border-dashed border-gray-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all flex items-center justify-center text-gray-400 hover:text-blue-600">
                          <Plus className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Sidebar Info */}
        <div className="space-y-6">
          {/* Summary */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Resumo do Dia</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total de Agendamentos</span>
                <span className="text-2xl font-bold text-gray-900">8</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Faturamento Previsto</span>
                <span className="text-2xl font-bold text-green-600">R$ 850</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Horários Livres</span>
                <span className="text-2xl font-bold text-blue-600">5</span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="text-sm font-medium text-green-700">Confirmados</span>
                <span className="text-lg font-bold text-green-700">6</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <span className="text-sm font-medium text-yellow-700">Pendentes</span>
                <span className="text-lg font-bold text-yellow-700">2</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <span className="text-sm font-medium text-red-700">Cancelados</span>
                <span className="text-lg font-bold text-red-700">0</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
