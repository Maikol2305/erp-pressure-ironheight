import { Sidebar } from '@/components/layout/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Panel de Control</h1>
            <p className="text-gray-500 mt-1">Gestión administrativa centralizada</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">Usuario Demo</p>
              <p className="text-xs text-gray-500">Administrador</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-100 border-2 border-blue-500 flex items-center justify-center text-blue-700 font-bold">
              UD
            </div>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}
