'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Calendar, 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  Settings, 
  LogOut,
  Bell,
  MessageSquare,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Calendar, label: 'Agenda', href: '/dashboard/agenda' },
  { icon: Users, label: 'Clientes', href: '/dashboard/clientes' },
  { icon: Briefcase, label: 'Serviços', href: '/dashboard/servicos' },
  { icon: MessageSquare, label: 'Mensagens', href: '/dashboard/mensagens' },
  { icon: TrendingUp, label: 'Relatórios', href: '/dashboard/relatorios' },
  { icon: Settings, label: 'Configurações', href: '/dashboard/configuracoes' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AgendAI Pro
            </span>
            <div className="flex items-center gap-1 mt-0.5">
              <Sparkles className="w-3 h-3 text-purple-500" />
              <span className="text-xs text-gray-500 font-medium">Plano Pro</span>
            </div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? 'default' : 'ghost'}
                className={`w-full justify-start gap-3 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        <Button variant="ghost" className="w-full justify-start gap-3 text-gray-700">
          <Bell className="w-5 h-5" />
          <span className="font-medium">Notificações</span>
          <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">3</span>
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-3 text-gray-700 hover:text-red-600">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sair</span>
        </Button>
      </div>
    </aside>
  );
}
