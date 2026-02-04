'use client';

import BarcodeInput from "./components/BarcodeInput";

export default function Home() {

  const handleSearch = (text: string) => {
    console.log(text);
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <section className="max-w-md mx-auto space-y-4">
        <h1 className="text-red-500 font-bold text-2xl text-center">Product Scanner</h1>
        <BarcodeInput onSearch={handleSearch} />
      </section>
    </div>
  );
}
