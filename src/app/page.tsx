'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TrendingUp, Mail, Lock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulación de envío de credenciales por email con Resend
    setTimeout(() => {
      window.location.href = '/dashboard/inventory';
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-3xl border border-gray-100 shadow-2xl overflow-hidden">
        <div className="bg-blue-600 p-10 text-white text-center">
          <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
            <TrendingUp size={32} />
          </div>
          <h1 className="text-3xl font-black tracking-tight">ERP Ironheight</h1>
          <p className="text-blue-100 mt-2 font-medium">Control total de tu negocio</p>
        </div>
        
        <form onSubmit={handleLogin} className="p-10 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-base font-bold text-gray-700">Correo Electrónico</Label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <Input 
                id="email"
                type="email"
                placeholder="usuario@empresa.com"
                className="h-14 pl-12 text-lg border-gray-200 focus:ring-blue-500 rounded-xl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="pass" className="text-base font-bold text-gray-700">Contraseña</Label>
              <Link href="#" className="text-sm text-blue-600 font-bold hover:underline">¿Olvidaste tu contraseña?</Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <Input 
                id="pass"
                type="password"
                placeholder="••••••••"
                className="h-14 pl-12 text-lg border-gray-200 focus:ring-blue-500 rounded-xl"
                required
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white text-xl font-black rounded-xl shadow-lg shadow-blue-100 transition-all flex gap-3"
            disabled={isLoading}
          >
            {isLoading ? 'Iniciando sesión...' : 'Ingresar al Portal'}
            {!isLoading && <ArrowRight size={24} />}
          </Button>

          <p className="text-center text-gray-500 text-sm mt-4">
            Al ingresar, aceptas nuestros <Link href="#" className="font-bold underline">Términos de Servicio</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
