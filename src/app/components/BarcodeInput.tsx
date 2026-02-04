'use client';

import { useState } from 'react';

type Props = {
  onSearch: (barcode: string) => void;
  isLoading?: boolean;
};

export default function BarcodeInput({ onSearch, isLoading }: Props) {
  const [barcode, setBarcode] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSearch = () => {
    if (barcode.length < 6 || barcode.length > 13) {
      setError('Ingresa un código válido (6 a 13 dígitos)');
      return;
    }

    setError(null);
    onSearch(barcode);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        Código de barras
      </label>

      <input
        type="text"
        inputMode="numeric"
        placeholder="Ej: 111111111111"
        value={barcode}
        onChange={(e) => setBarcode(e.target.value)}
        className="w-full text-black rounded-lg border border-gray-300 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      <button
        onClick={handleSearch}
        disabled={isLoading}
        className="w-full rounded-lg bg-blue-600 py-2 text-white font-medium transition hover:bg-blue-700 disabled:opacity-50"
      >
        {isLoading ? 'Buscando...' : 'Buscar producto'}
      </button>
    </div>
  );
}
