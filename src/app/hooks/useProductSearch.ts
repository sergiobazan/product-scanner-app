"use client";

import { useState } from "react";
import { getProductByBarcode } from "../services/product.service";
import { useQuery } from "@tanstack/react-query";
import { generatePrice } from "../utils/price";

export const useProductSearch = () => {
  const [barcode, setBarcode] = useState<string | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["product", barcode],
    queryFn: () => getProductByBarcode(barcode!),
    enabled: !!barcode,
    staleTime: 1000 * 60 * 5,
  });

  const product = data
    ? {
        id: barcode!,
        name: data.product_name || "Sin nombre",
        brand: data.brands || "Sin marca",
        image: data.image_front_url || null,
        category: data.categories || null,
        price: generatePrice(),
      }
    : null;

  const search = (code: string) => {
    setBarcode(code);
  };

  return {
    product,
    loading: isLoading,
    error,
    search,
  };
};
