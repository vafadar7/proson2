import { create } from 'zustand';
import type { Product, Category } from '../data/products';

export interface FilterDef {
  id: string;
  name: string;
  key: string;
  type: 'select' | 'checkbox' | 'range';
  options: string[];
  categoryId?: string;
}

interface StoreState {
  // Data
  products: Product[];
  adminProducts: Product[];
  customCategories: Category[];
  filters: FilterDef[];

  // Loading
  isLoading: boolean;

  // Actions
  setProducts: (products: Product[]) => void;
  setAdminProducts: (products: Product[]) => void;
  addAdminProduct: (product: Product) => void;
  updateAdminProduct: (product: Product) => void;
  removeAdminProduct: (id: string) => void;

  setCustomCategories: (categories: Category[]) => void;
  addCustomCategory: (category: Category) => void;
  removeCustomCategory: (id: string) => void;

  setFilters: (filters: FilterDef[]) => void;
  addFilter: (filter: FilterDef) => void;
  removeFilter: (id: string) => void;

  setIsLoading: (loading: boolean) => void;

  // Computed
  allCategories: Category[];
  allProducts: Product[];
  getFiltersByCategory: (categoryId: string) => FilterDef[];
}

import { categories as defaultCategories } from '../data/products';

export const useStore = create<StoreState>((set, get) => ({
  products: [],
  adminProducts: [],
  customCategories: [],
  filters: [],
  isLoading: true,

  setProducts: (products) => set({ products }),

  setAdminProducts: (adminProducts) => set({ adminProducts }),

  addAdminProduct: (product) =>
    set((state) => ({
      adminProducts: [product, ...state.adminProducts],
    })),

  updateAdminProduct: (product) =>
    set((state) => ({
      adminProducts: state.adminProducts.map((p) =>
        p.id === product.id ? product : p
      ),
    })),

  removeAdminProduct: (id) =>
    set((state) => ({
      adminProducts: state.adminProducts.filter((p) => p.id !== id),
    })),

  setCustomCategories: (customCategories) => set({ customCategories }),

  addCustomCategory: (category) =>
    set((state) => ({
      customCategories: [...state.customCategories, category],
    })),

  removeCustomCategory: (id) =>
    set((state) => ({
      customCategories: state.customCategories.filter((c) => c.id !== id),
    })),

  setFilters: (filters) => set({ filters }),

  addFilter: (filter) =>
    set((state) => ({
      filters: [...state.filters, filter],
    })),

  removeFilter: (id) =>
    set((state) => ({
      filters: state.filters.filter((f) => f.id !== id),
    })),

  setIsLoading: (isLoading) => set({ isLoading }),

  get allCategories() {
    return [...defaultCategories, ...get().customCategories];
  },

  get allProducts() {
    return [...get().products, ...get().adminProducts];
  },

  getFiltersByCategory: (categoryId: string) => {
    const state = get();
    // Return filters specifically for this category + global filters (no categoryId)
    return state.filters.filter(
      (f) => f.categoryId === categoryId || !f.categoryId
    );
  },
}));
