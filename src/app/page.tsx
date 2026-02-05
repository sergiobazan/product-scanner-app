"use client";

import { useState } from "react";
import { useProductSearch } from "./hooks/useProductSearch";
import CameraScanner from "./components/CameraScanner";
import Header from "./components/Header";
import SearchSection from "./components/SearchSection";
import SearchHistory from "./components/SearchHistory";
import ProductCard from "./components/ProductCard";

export default function Home() {
  const { product, loading, error, search } = useProductSearch();
  const [openScanner, setOpenScanner] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <section className="max-w-md mx-auto space-y-4">
        <Header />

        <SearchSection
          onSearch={search}
          loading={loading}
          onOpenScanner={() => setOpenScanner(true)}
        />

        <ProductCard product={product} loading={loading} error={error} />

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
