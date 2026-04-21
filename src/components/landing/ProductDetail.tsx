import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowLeft, Truck, Shield, RotateCcw, CheckCircle2 } from 'lucide-react';
import { products as staticProducts } from '../../data/products';
import { loadAdminProducts } from '../../lib/supabase';
import type { Product } from '../../data/products';

interface ProductDetailProps {
  onAddToCart: (product: Product) => void;
  cartCount: number;
  onCartClick: () => void;
}

export default function ProductDetail({ onAddToCart, cartCount, onCartClick }: ProductDetailProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product & { description?: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const adminProducts = await loadAdminProducts();
        const combined = [...staticProducts, ...(adminProducts || [])];
        const found = combined.find(p => p.id === id);
        setProduct(found || null);
      } catch (error) {
        console.error('Məhsul yükləmə xətası:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center pt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 pt-20">
        <h1 className="text-2xl font-bold text-primary mb-4">Məhsul tapılmadı</h1>
        <button 
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
        >
          Ana səhifəyə qayıt
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Geri düyməsi */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Geri qayıt</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Sol - Şəkil */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-2xl border border-border overflow-hidden aspect-square lg:aspect-auto lg:h-[500px] sticky top-24"
          >
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 px-4 py-1.5 bg-secondary text-white text-sm font-bold rounded-full">
                {product.badge}
              </span>
            )}
          </motion.div>

          {/* Sağ - Məlumat */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <div>
              <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-4">
                {product.name}
              </h1>
              
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-bold text-secondary">
                  {product.price} AZN
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-muted line-through">
                      {product.originalPrice} AZN
                    </span>
                    <span className="px-2 py-1 bg-red-100 text-red-600 text-sm font-bold rounded-lg">
                      -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Üstünlüklər */}
            <div className="grid grid-cols-3 gap-4 py-4 border-y border-border">
              <div className="flex flex-col items-center text-center gap-2">
                <Truck className="w-5 h-5 text-secondary" />
                <span className="text-xs text-muted">Pulsuz çatdırılma</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <Shield className="w-5 h-5 text-secondary" />
                <span className="text-xs text-muted">Rəsmi zəmanət</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <RotateCcw className="w-5 h-5 text-secondary" />
                <span className="text-xs text-muted">14 gün qaytarma</span>
              </div>
            </div>

            {/* Xüsusiyyətlər */}
            {Object.keys(product.specs).length > 0 && (
              <div>
                <h3 className="font-heading font-bold text-lg text-primary mb-4">Texniki xüsusiyyətlər</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between px-4 py-3 bg-background rounded-lg border border-border">
                      <span className="text-muted text-sm">{key}</span>
                      <span className="font-medium text-primary text-sm">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Ətraflı Təsvir */}
            {product.description && (
              <div className="bg-secondary/5 rounded-xl p-5 border border-secondary/10">
                <h3 className="font-heading font-bold text-primary mb-3">Ətraflı məlumat</h3>
                <p className="text-muted text-sm leading-relaxed whitespace-pre-wrap">
                  {product.description}
                </p>
              </div>
            )}

            {/* Səbətə əlavə */}
            <div className="pt-4 sticky bottom-0 bg-background pb-4 lg:static lg:pb-0">
              <button 
                onClick={() => onAddToCart(product)}
                className="w-full py-4 bg-primary text-white font-bold text-lg rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-xl active:scale-[0.98]"
              >
                <ShoppingCart className="w-5 h-5" />
                Səbətə Əlavə Et
              </button>
              <p className="text-center text-xs text-muted mt-3 flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Stokda var - Sürətli çatdırılma
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}