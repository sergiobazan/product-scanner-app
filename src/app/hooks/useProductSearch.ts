"use client";

import { useState } from "react";
import { getProductByBarcode } from "../services/product.service";
import { generatePrice } from "../utils/price";
import { Constants } from "../constants/constants";
import { ProductResult } from "../types/product";

export const useProductSearch = () => {
  const [product, setProduct] = useState<ProductResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveToHistory = (item: ProductResult) => {
    const stored = localStorage.getItem(Constants.STORAGE_KEY);
    const history: ProductResult[] = stored ? JSON.parse(stored) : [];

    const filtered = history.filter((p) => p.id !== item.id);

    const updated = [item, ...filtered].slice(0, Constants.MAX_ITEMS);

    localStorage.setItem(Constants.STORAGE_KEY, JSON.stringify(updated));
  };

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
      saveToHistory(mappedProduct);
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
