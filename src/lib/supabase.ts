import { createClient } from '@supabase/supabase-js';
import type { Product } from '../data/products';

// Yeni kodlar buradan oxunur
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Əgər boşdursa xəta versin (ağ səhifənin qarşısını almaq üçün)
if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Supabase məlumatları tapılmadı! .env faylını yoxlayın.');
  throw new Error('Supabase URL və ya Key tapılmadı!');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// ProductsSection üçün export (async funksiya)
export async function loadAdminProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Məhsulları yükləmə xətası:', error);
    return [];
  }

  // Database-dən gələn snake_case məlumatları Product tipinə çevir
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
  })) || [];
}