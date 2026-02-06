'use client';

import Image from 'next/image';
import { ProductResult } from '../types/product'; 

type Props = {
  product: ProductResult | null;
  loading: boolean;
  error: string | undefined;
};

export default function ProductCard({ product, loading, error }: Props) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-4 text-center">
        <p className="text-gray-500">Cargando producto...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-4 text-center">
        <p className="text-red-500 font-medium">{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-4 text-center">
        <p className="text-gray-400">No existe producto</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {product.image && (
        <div className="relative w-full h-48 bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain"
          />
        </div>
      )}

      <div className="p-4 space-y-2">
        <h2 className="text-lg font-semibold text-gray-900">
          {product.name}
        </h2>

        <p className="text-sm text-gray-600">
          <span className="font-medium">Marca:</span> {product.brand}
        </p>

        {product.category && (
          <p className="text-sm text-gray-600">
            <span className="font-medium">Categoría:</span> {product.category}
          </p>
        )}

        <p className="text-xl font-bold text-blue-600">
          S/. {product.price}
        </p>
      </div>
    </div>
  );
}
