"use client";

import { useEffect, useState } from "react";
import { useProductSearch } from "./hooks/useProductSearch";
import CameraScanner from "./components/CameraScanner";
import Header from "./components/Header";
import SearchSection from "./components/SearchSection";
import SearchHistory from "./components/SearchHistory";
import ProductCard from "./components/ProductCard";
import { saveToHistory } from "./utils/saveToHistory";

export default function Home() {
  const { product, loading, error, search } = useProductSearch();
  const [openScanner, setOpenScanner] = useState(false);

  useEffect(() => {
    if (product) {
      saveToHistory(product);
    }
  }, [product]);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <section className="max-w-md mx-auto space-y-4">
        <Header />

        <SearchSection
          onSearch={search}
          loading={loading}
          onOpenScanner={() => setOpenScanner(true)}
        />

        <ProductCard
          product={product}
          loading={loading}
          error={error?.message}
        />

        <SearchHistory onSelect={search} />

        {openScanner && (
          <CameraScanner
            onDetected={(code) => {
              search(code);
              setOpenScanner(false);
            }}
            onClose={() => setOpenScanner(false)}
          />
        )}
      </section>
    </div>
  );
}
