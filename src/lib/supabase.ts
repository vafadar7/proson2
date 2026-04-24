import { createClient } from '@supabase/supabase-js';
import type { Product, Category } from '../data/products';
import type { FilterDef } from '../store/useStore';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Supabase məlumatları tapılmadı! .env faylını yoxlayın.');
}

export const supabase = createClient(supabaseUrl || '', supabaseKey || '');

// ===== PRODUCTS =====

export async function loadAdminProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Məhsulları yükləmə xətası:', error);
    return [];
  }

  return data?.map((p: any) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    originalPrice: p.original_price,
    image: p.image,
    category: p.category,
    specs: p.specs || {},
    badge: p.badge,
    isNew: p.is_new,
    isBestseller: p.is_bestseller,
    description: p.description || '',
    filterValues: p.filter_values || {},
  })) || [];
}

export async function fetchProductsFromSupabase(): Promise<Product[]> {
  return loadAdminProducts();
}

// ===== CATEGORIES =====

export async function fetchCustomCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('is_custom', true);

  if (error) {
    console.error('Categories fetch xətası:', error);
    return [];
  }

  return data?.map((c: any) => ({
    id: c.id,
    name: c.name,
    filters: c.filters || [],
  })) || [];
}

// ===== FILTERS =====

export async function fetchFilters(): Promise<FilterDef[]> {
  const { data, error } = await supabase
    .from('filters')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Filter fetch xətası:', error);
    return [];
  }

  return data?.map((f: any) => ({
    id: f.id,
    name: f.name,
    key: f.key,
    type: f.type,
    options: f.options || [],
    categoryId: f.category_id,
  })) || [];
}

// ===== SYNC ALL DATA =====

export async function syncAllData() {
  const [products, categories, filters] = await Promise.all([
    fetchProductsFromSupabase(),
    fetchCustomCategories(),
    fetchFilters(),
  ]);

  return { products, categories, filters };
}
