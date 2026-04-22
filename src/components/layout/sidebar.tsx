import Link from 'next/link';
import { 
  Package, 
  ShoppingCart, 
  TrendingUp, 
  Users, 
  Settings, 
  AlertTriangle,
  ClipboardList
} from 'lucide-react';

const menuItems = [
  { icon: Package, label: 'Inventario', href: '/dashboard/inventory' },
  { icon: ShoppingCart, label: 'Ventas', href: '/dashboard/sales' },
  { icon: ClipboardList, label: 'Compras', href: '/dashboard/purchases' },
  { icon: TrendingUp, label: 'Analíticas', href: '/dashboard/analytics' },
  { icon: Users, label: 'Clientes', href: '/dashboard/clients' },
  { icon: Settings, label: 'Configuración', href: '/dashboard/settings' },
];

export function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-gray-900 text-white flex flex-col p-4 border-r border-gray-800">
      <div className="flex items-center gap-2 mb-10 px-2">
        <div className="bg-blue-600 p-2 rounded-lg">
          <TrendingUp className="text-white" size={24} />
        </div>
        <span className="text-xl font-bold tracking-tight">ERP Ironheight</span>
      </div>
      
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-800 transition-colors text-lg"
          >
            <item.icon size={24} />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
      
      <div className="mt-auto p-4 bg-gray-800 rounded-2xl flex items-center gap-3">
        <div className="bg-yellow-500 p-2 rounded-full">
          <AlertTriangle className="text-gray-900" size={20} />
        </div>
        <div>
          <p className="text-xs text-gray-400">Stock Crítico</p>
          <p className="text-sm font-semibold">3 Alertas</p>
        </div>
      </div>
    </aside>
  );
}
