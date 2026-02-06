import { Constants } from "../constants/constants";
import { ProductResult } from "../types/product";

export const saveToHistory = (item: ProductResult) => {
  const stored = localStorage.getItem(Constants.STORAGE_KEY);

  const history: ProductResult[] = stored ? JSON.parse(stored) : [];

  const filtered = history.filter((p) => p.id !== item.id);

  const updated = [item, ...filtered].slice(0, Constants.MAX_ITEMS);

  localStorage.setItem(Constants.STORAGE_KEY, JSON.stringify(updated));
};
