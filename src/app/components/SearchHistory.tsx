"use client";

import { useEffect, useEffectEvent, useState } from "react";
import { ProductResult } from "../types/product";
import { Constants } from "../constants/constants";

type Props = {
  onSelect: (barcode: string) => void;
};

export default function SearchHistory({ onSelect }: Props) {
  const [history, setHistory] = useState<ProductResult[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const updateHistory = useEffectEvent((stored: string) => {
    setHistory(JSON.parse(stored));
    setIsLoaded(true);
  });

  useEffect(() => {
    const stored = localStorage.getItem(Constants.STORAGE_KEY);
    if (stored) {
      updateHistory(stored);
    }
  }, []);

  const clearHistory = () => {
    localStorage.removeItem(Constants.STORAGE_KEY);
    setHistory([]);
  };

  if (!isLoaded) {
    return null;
  }

  if (history.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-4 text-center">
        <p className="text-gray-400 text-sm">No hay búsquedas recientes</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-700">
          Historial de búsquedas
        </h3>
        <button
          onClick={clearHistory}
          className="text-xs text-red-500 hover:underline">
          Limpiar
        </button>
      </div>

      <ul className="divide-y">
        {history.map((item) => (
          <li
            key={item.id}
            onClick={() => onSelect(item.id)}
            className="py-2 cursor-pointer hover:bg-gray-50 transition">
            <p className="text-sm font-medium text-gray-800">{item.name}</p>
            <p className="text-xs text-gray-500">
              {item.brand} · S/. {item.price}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
