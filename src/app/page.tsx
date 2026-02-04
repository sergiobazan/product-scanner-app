'use client';

import { useState } from "react";
import BarcodeInput from "./components/BarcodeInput";
import { ProductResult } from "./types/product";
import { getProductByBarcode } from "./services/product.service";
import { generatePrice } from "./utils/price";

export default function Home() {
  const [product, setProduct] = useState<ProductResult | null>(null);

  const handleSearch = async (barCode: string) => {
    try {
      const data = await getProductByBarcode(barCode);

      const mappedProduct: ProductResult = {
        id: barCode,
        name: data.product_name || 'Producto sin nombre',
        brand: data.brands || 'Marca desconocida',
        image: data.image_front_url || null,
        category: data.categories || null,
        price: generatePrice(),
      };

      setProduct(mappedProduct);

      console.log("PRODUCT: ", product)

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <section className="max-w-md mx-auto space-y-4">
        <h1 className="text-red-500 font-bold text-2xl text-center">Product Scanner</h1>
        <BarcodeInput onSearch={handleSearch} />
        {product?.name}
      </section>
    </div>
  );
}
