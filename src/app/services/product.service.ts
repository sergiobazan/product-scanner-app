const BASE_URL = process.env.NEXT_PUBLIC_OPENFOOD_API_URL;

export const getProductByBarcode = async (barcode: string) => {
  const response = await fetch(`${BASE_URL}/${barcode}.json`);

  if (!response.ok) {
    throw new Error("Error al consultar el producto");
  }

  const data = await response.json();

  if (!data || data.status !== 1) {
    throw new Error("Producto no encontrado");
  }

  return data.product;
};
