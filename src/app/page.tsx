"use client";

import { useState } from "react";
import BarcodeInput from "./components/BarcodeInput";
import ProductCard from "./components/ProductCard";
import SearchHistory from "./components/SearchHistory";
import { useProductSearch } from "./hooks/useProductSearch";
import CameraScanner from "./components/CameraScanner";

export default function Home() {
  const { product, loading, error, search } = useProductSearch();
  const [openScanner, setOpenScanner] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <section className="max-w-md mx-auto space-y-4">
        <h1 className="text-red-500 font-bold text-2xl text-center">
          Product Scanner
        </h1>
        <BarcodeInput onSearch={search} isLoading={loading} />
        <button
          onClick={() => setOpenScanner(true)}
          className="w-full bg-blue-600 text-white py-2 rounded-lg">
          Escanear con cámara
        </button>

        {openScanner && (
          <CameraScanner
            onDetected={(code) => {
              search(code);
              setOpenScanner(false);
            }}
            onClose={() => setOpenScanner(false)}
          />
        )}
        <ProductCard product={product} loading={loading} error={error} />
        <SearchHistory onSelect={search} />
      </section>
    </div>
  );
}
