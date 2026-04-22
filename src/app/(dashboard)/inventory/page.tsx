'use client';

import { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Plus, 
  Download, 
  AlertTriangle, 
  Search,
  MoreVertical,
  Edit2,
  Trash2
} from 'lucide-react';
import { Input } from '@/components/ui/input';

const mockInventory = [
  { id: '1', sku: 'FER-001', name: 'Martillo de Forja 2kg', costNeto: 12000, quantity: 5, minStock: 10, valueUnit: 25000 },
  { id: '2', sku: 'FER-002', name: 'Alicate Universal 8"', costNeto: 4500, quantity: 24, minStock: 15, valueUnit: 9500 },
  { id: '3', sku: 'FER-003', name: 'Destornillador Phillips PH2', costNeto: 1800, quantity: 3, minStock: 20, valueUnit: 4200 },
  { id: '4', sku: 'FER-004', name: 'Llave Inglesa 12"', costNeto: 7200, quantity: 18, minStock: 10, valueUnit: 15900 },
];

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const calculateIva = (neto: number) => Math.round(neto * 1.19);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <Input 
            placeholder="Buscar por nombre o SKU..." 
            className="pl-10 h-12 text-lg border-gray-200 focus:ring-blue-500 rounded-xl"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="h-12 px-6 gap-2 border-gray-200 hover:bg-gray-50 rounded-xl font-semibold">
            <Download size={20} />
            Exportar Excel
          </Button>
          <Button className="h-12 px-6 gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-200">
            <Plus size={20} />
            Nuevo Producto
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow>
              <TableHead className="py-5 font-bold text-gray-700 text-base">SKU</TableHead>
              <TableHead className="font-bold text-gray-700 text-base">Producto</TableHead>
              <TableHead className="font-bold text-gray-700 text-base text-right">Costo Neto</TableHead>
              <TableHead className="font-bold text-gray-700 text-base text-right">Costo con IVA</TableHead>
              <TableHead className="font-bold text-gray-700 text-base text-right">Venta Unidad</TableHead>
              <TableHead className="font-bold text-gray-700 text-base text-center">Stock</TableHead>
              <TableHead className="font-bold text-gray-700 text-base">Estado</TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockInventory.map((item) => {
              const isLowStock = item.quantity <= item.minStock;
              return (
                <TableRow key={item.id} className={`hover:bg-gray-50/50 transition-colors ${isLowStock ? 'bg-red-50/30' : ''}`}>
                  <TableCell className="font-mono text-gray-600 font-bold">{item.sku}</TableCell>
                  <TableCell className="font-semibold text-gray-900 text-lg">{item.name}</TableCell>
                  <TableCell className="text-right text-gray-600 font-medium text-lg">
                    ${item.costNeto.toLocaleString('es-CL')}
                  </TableCell>
                  <TableCell className="text-right text-gray-900 font-bold text-lg">
                    ${calculateIva(item.costNeto).toLocaleString('es-CL')}
                  </TableCell>
                  <TableCell className="text-right text-blue-700 font-extrabold text-lg">
                    ${item.valueUnit.toLocaleString('es-CL')}
                  </TableCell>
                  <TableCell className="text-center">
                    <span className={`text-xl font-black ${isLowStock ? 'text-red-600' : 'text-gray-900'}`}>
                      {item.quantity}
                    </span>
                    <span className="text-xs text-gray-400 block mt-0.5">Mín: {item.minStock}</span>
                  </TableCell>
                  <TableCell>
                    {isLowStock ? (
                      <Badge variant="destructive" className="h-8 px-3 gap-1.5 text-sm uppercase tracking-wider font-black bg-red-600">
                        <AlertTriangle size={14} />
                        Bajo Stock
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="h-8 px-3 text-sm uppercase tracking-wider font-bold bg-green-100 text-green-700">
                        Óptimo
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" className="h-10 w-10 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                        <Edit2 size={20} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-10 w-10 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                        <Trash2 size={20} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
