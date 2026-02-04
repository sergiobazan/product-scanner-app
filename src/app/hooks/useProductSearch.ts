"use client";

import { useState } from "react";
import { getProductByBarcode } from "../services/product.service";
import { generatePrice } from "../utils/price";

export type ProductResult = {
  id: string;
  name: string;
  brand: string;
  image: string | null;
  category: string | null;
  price: number;
};

export const useProductSearch = () => {
  const [product, setProduct] = useState<ProductResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (barcode: string) => {
    try {
      setLoading(true);
      setError(null);

      const data = await getProductByBarcode(barcode);

      const mappedProduct: ProductResult = {
        id: barcode,
        name: data.product_name || "Producto sin nombre",
        brand: data.brands || "Marca desconocida",
        image: data.image_front_url || null,
        category: data.categories || null,
        price: generatePrice(),
      };

      setProduct(mappedProduct);
    } catch (err) {
      console.error(err);
      setProduct(null);
      setError("Producto no encontrado");
    } finally {
      setLoading(false);
    }
  };

  return {
    product,
    loading,
    error,
    search,
  };
};
