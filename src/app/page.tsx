"use client";

import BarcodeInput from "./components/BarcodeInput";
import ProductCard from "./components/ProductCard";
import { useProductSearch } from "./hooks/useProductSearch";

export default function Home() {
  const { product, loading, error, search } = useProductSearch();

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <section className="max-w-md mx-auto space-y-4">
        <h1 className="text-red-500 font-bold text-2xl text-center">
          Product Scanner
        </h1>
        <BarcodeInput onSearch={search} isLoading={loading} />
        <ProductCard product={product} loading={loading} error={error} />
      </section>
    </div>
  );
}
