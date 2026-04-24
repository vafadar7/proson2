import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal } from 'lucide-react';
import { products as staticProducts } from '../../data/products';
import type { Product } from '../../data/products';
import { useStore } from '../../store/useStore';
import CategoryTabs from './CategoryTabs';
import FilterSidebar from './FilterSidebar';
import ProductCard from './ProductCard';

interface ProductsSectionProps {
  onAddToCart?: (product: Product) => void;
  externalCategory?: string | null;
  onExternalCategoryConsumed?: () => void;
}

// FIX: Qiymət filterini ayrıca funksiyaya çıxardıq — oxunaqlılıq üçün
function matchesPriceFilter(price: number, filterValue: string): boolean {
  if (filterValue === '< 100 AZN') return price < 100;
  if (filterValue === '< 1000 AZN') return price < 1000;
  if (filterValue === '100-300 AZN') return price >= 100 && price <= 300;
  if (filterValue === '300-500 AZN') return price >= 300 && price <= 500;
  if (filterValue === '500-1000 AZN') return price >= 500 && price <= 1000;
  if (filterValue === '1000-1500 AZN') return price >= 1000 && price <= 1500;
  if (filterValue === '1500-2000 AZN') return price >= 1500 && price <= 2000;
  if (filterValue === '2000-2500 AZN') return price >= 2000 && price <= 2500;
  if (filterValue === '> 2000 AZN') return price > 2000;
  if (filterValue === '> 500 AZN') return price > 500;
  return false;
}

export default function ProductsSection({
  onAddToCart,
  externalCategory,
  onExternalCategoryConsumed,
}: ProductsSectionProps) {
  const [activeCategory, setActiveCategory] = useState('gaming');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [sortBy, setSortBy] = useState('bestseller');

  const adminProducts = useStore((s) => s.adminProducts);
  const isLoading = useStore((s) => s.isLoading);

  // Handle external category selection from hamburger menu
  useEffect(() => {
    if (externalCategory) {
      setActiveCategory(externalCategory);
      setActiveFilters({});
      setSortBy('bestseller');
      onExternalCategoryConsumed?.();
    }
  }, [externalCategory, onExternalCategoryConsumed]);

  // Merge static + admin products
  const allProducts = useMemo(() => [...staticProducts, ...adminProducts], [adminProducts]);

  const currentCategory = useStore((s) =>
    s.allCategories.find((c) => c.id === activeCategory) || s.allCategories[0]
  );

  // Get dynamic filters for this category from store
  const dynamicFilters = useStore((s) => s.getFiltersByCategory(activeCategory));

  const categoryProducts = useMemo(
    () => allProducts.filter((p) => p.category === activeCategory),
    [allProducts, activeCategory]
  );

  const filteredProducts = useMemo(() => {
    let result = [...categoryProducts];

    // FIX: Əvvəlki kodda filterlər İKİ DƏFƏ tətbiq olunurdu:
    // 1) specs-ə baxan blok bütün filterKey-ləri emal edirdi,
    // 2) sonra filterValues-ə baxan blok eyni filterKey-ləri yenidən emal edirdi
    //    və filterValues boş olan məhsulları silirdi — bu specs filterini sındırırdı.
    //
    // Düzgün yanaşma: hər filterKey üçün specs VƏ filterValues-ə BİRLİKDƏ bax,
    // məhsul hər hansı birindən uyğun gəlirsə keçsin.
    Object.entries(activeFilters).forEach(([filterKey, values]) => {
      if (values.length === 0) return;

      result = result.filter((product) => {
        return values.some((filterValue) => {
          // Qiymət filteri — specs-dən deyil, birbaşa product.price-dan yoxlanılır
          if (filterKey === 'price') {
            return matchesPriceFilter(product.price, filterValue);
          }

          // Statik specs yoxlaması
          const specValue = product.specs[filterKey];
          if (specValue !== undefined && specValue === filterValue) return true;

          // Dinamik filterValues yoxlaması
          const dynValue = product.filterValues?.[filterKey];
          if (dynValue !== undefined && dynValue === filterValue) return true;

          return false;
        });
      });
    });

    switch (sortBy) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'newest': result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
      case 'bestseller': result.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0)); break;
    }
    return result;
  }, [categoryProducts, activeFilters, sortBy]);

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setActiveFilters({});
    setSortBy('bestseller');
  };

  const handleFilterChange = (filterKey: string, value: string) => {
    setActiveFilters((prev) => {
      const current = prev[filterKey] || [];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [filterKey]: updated };
    });
  };

  const activeFiltersCount = Object.values(activeFilters).flat().length;

  if (isLoading) {
    return (
      <section id="products" className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-secondary"></div>
          <p className="mt-2 text-muted">Məhsullar yüklənir...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary text-sm font-semibold rounded-full mb-4">
            Məhsul Kataloqu
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-primary mb-3">Məhsullarımız</h2>
          <p className="text-muted text-base max-w-2xl mx-auto">
            Geniş çeşiddə noutbuk, printer və İT avadanlıqları. Bütün məhsullar rəsmi zəmanətlə təqdim olunur.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6"
        >
          <CategoryTabs activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />
        </motion.div>

        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-card border border-border rounded-xl font-medium text-primary hover:border-secondary/50 transition-colors text-sm"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filterlər
            {activeFiltersCount > 0 && (
              <span className="px-2 py-0.5 bg-secondary text-white text-xs rounded-full">{activeFiltersCount}</span>
            )}
          </button>
        </div>

        {/* Content: Sidebar + Grid */}
        <div className="flex gap-5 xl:gap-6 items-start">
          <FilterSidebar
            category={currentCategory}
            dynamicFilters={dynamicFilters}
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            activeFilters={activeFilters}
            onFilterChange={handleFilterChange}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          {/* Products Grid */}
          <div className="flex-1 min-w-0">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                {filteredProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                    onAddToCart={onAddToCart}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-20 h-20 bg-background rounded-full flex items-center justify-center mb-4">
                  <SlidersHorizontal className="w-8 h-8 text-muted" />
                </div>
                <h3 className="font-heading font-semibold text-xl text-primary mb-2">Məhsul tapılmadı</h3>
                <p className="text-muted max-w-md text-sm">
                  Seçdiyiniz filter kriteriyalarına uyğun məhsul tapılmadı. Zəhmət olmasa filterləri dəyişdirin.
                </p>
                <button
                  onClick={() => setActiveFilters({})}
                  className="mt-6 px-6 py-2.5 bg-secondary text-white font-medium rounded-xl hover:bg-secondary/90 transition-colors"
                >
                  Filterləri Sıfırla
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
