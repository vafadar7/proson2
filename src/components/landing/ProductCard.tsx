import { motion } from 'framer-motion';
import { ShoppingCart, CheckCircle2, Sparkles, TrendingUp } from 'lucide-react';
import type { Product } from '../../data/products';

interface ProductCardProps {
  product: Product;
  index: number;
  onAddToCart?: (product: Product) => void;
}

export default function ProductCard({ product, index, onAddToCart }: ProductCardProps) {
  const getBadgeColor = () => {
    if (product.isNew) return 'bg-secondary text-white';
    if (product.isBestseller) return 'bg-accent text-white';
    return 'bg-primary text-white';
  };

  const getBadgeIcon = () => {
    if (product.isNew) return <Sparkles className="w-2.5 h-2.5" />;
    if (product.isBestseller) return <TrendingUp className="w-2.5 h-2.5" />;
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="group bg-card rounded-xl border border-border overflow-hidden hover:border-secondary/50 hover:shadow-card transition-all duration-300"
    >
      {/* Image — compact aspect ratio */}
      <div className="relative aspect-[4/3] overflow-hidden bg-background">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.badge && (
          <div className={`absolute top-2 left-2 flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-semibold ${getBadgeColor()}`}>
            {getBadgeIcon()}
            {product.badge}
          </div>
        )}
        <div className="absolute top-2 right-2 flex items-center gap-1 px-1.5 py-0.5 bg-white/95 backdrop-blur-sm rounded-md shadow-sm">
          <CheckCircle2 className="w-3 h-3 text-accent" />
          <span className="text-[10px] font-medium text-primary">100%</span>
        </div>
      </div>

      {/* Content — tighter padding */}
      <div className="p-3">
        <h3 className="font-heading font-semibold text-sm text-primary mb-1.5 line-clamp-1 group-hover:text-secondary transition-colors">
          {product.name}
        </h3>

        {/* Specs — max 2 to save space */}
        <div className="flex flex-wrap gap-1 mb-2">
          {Object.entries(product.specs).slice(0, 2).map(([key, value]) => (
            <span key={key} className="px-1.5 py-0.5 bg-background rounded text-[10px] text-muted border border-border">
              {value}
            </span>
          ))}
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-1.5 mb-2.5">
          <span className="font-heading font-bold text-base text-primary">{product.price} AZN</span>
          {product.originalPrice && (
            <span className="text-xs text-muted line-through">{product.originalPrice} AZN</span>
          )}
        </div>

        {/* CTA */}
        <button
          onClick={() => onAddToCart?.(product)}
          className="flex items-center justify-center gap-1.5 w-full py-2 bg-primary text-white font-semibold text-xs rounded-lg hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          Səbətə Əlavə Et
        </button>
      </div>
    </motion.div>
  );
}
