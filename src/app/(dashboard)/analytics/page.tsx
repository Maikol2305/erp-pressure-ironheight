'use client';

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingBag,
  ArrowUpRight,
  ArrowDownRight,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const salesData = [
  { name: 'Lun', sales: 4000, profit: 2400 },
  { name: 'Mar', sales: 3000, profit: 1398 },
  { name: 'Mie', sales: 2000, profit: 9800 },
  { name: 'Jue', sales: 2780, profit: 3908 },
  { name: 'Vie', sales: 1890, profit: 4800 },
  { name: 'Sab', sales: 2390, profit: 3800 },
  { name: 'Dom', sales: 3490, profit: 4300 },
];

const stats = [
  { label: 'Ventas del Mes', value: '$4.250.000', change: '+12.5%', icon: DollarSign, color: 'blue', trend: 'up' },
  { label: 'Órdenes Nuevas', value: '156', change: '+5.2%', icon: ShoppingBag, color: 'green', trend: 'up' },
  { label: 'Ganancia Neta', value: '$1.840.000', change: '-2.1%', icon: TrendingUp, color: 'purple', trend: 'down' },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Resumen de Rendimiento</h2>
          <p className="text-gray-500">Visualiza el crecimiento de tu negocio en tiempo real</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-xl border-gray-200">Hoy</Button>
          <Button variant="outline" className="rounded-xl border-gray-200">Esta Semana</Button>
          <Button className="rounded-xl bg-blue-600">Este Mes</Button>
          <Button variant="outline" className="rounded-xl border-gray-200 ml-4 gap-2">
            <Download size={18} />
            Exportar Reporte
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl bg-${stat.color}-100 text-${stat.color}-600`}>
                <stat.icon size={24} />
              </div>
              <div className={`flex items-center gap-1 text-sm font-bold ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change}
                {stat.trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
              </div>
            </div>
            <p className="text-gray-500 font-medium">{stat.label}</p>
            <h3 className="text-3xl font-black text-gray-900 mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Ventas Semanales</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                />
                <Area type="monotone" dataKey="sales" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Comparativa Ganancias vs Ventas</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                />
                <Bar dataKey="sales" fill="#2563eb" radius={[6, 6, 0, 0]} barSize={20} />
                <Bar dataKey="profit" fill="#10b981" radius={[6, 6, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
