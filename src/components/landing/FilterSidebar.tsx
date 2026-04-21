import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { Category } from '../../data/products';

interface FilterSidebarProps {
  category: Category;
  isOpen: boolean;
  onClose: () => void;
  activeFilters: Record<string, string[]>;
  onFilterChange: (filterKey: string, value: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

const sortOptions = [
  { value: 'price-asc', label: 'Ən ucuz' },
  { value: 'price-desc', label: 'Ən bahalı' },
  { value: 'newest', label: 'Ən yeni' },
  { value: 'bestseller', label: 'Ən çox satılan' },
];

export default function FilterSidebar({
  category, isOpen, onClose, activeFilters, onFilterChange, sortBy, onSortChange,
}: FilterSidebarProps) {
  const isFilterActive = (filterKey: string, value: string) =>
    activeFilters[filterKey]?.includes(value) || false;

  const handleResetAll = () => {
    Object.keys(activeFilters).forEach((key) =>
      activeFilters[key].forEach((value) => onFilterChange(key, value))
    );
  };

  const sidebarContent = (showClose = false) => (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border flex-shrink-0">
        <h3 className="font-heading font-semibold text-base text-primary">Filterlər</h3>
        {showClose && (
          <button onClick={onClose} className="p-2 hover:bg-background rounded-lg transition-colors">
            <X className="w-5 h-5 text-muted" />
          </button>
        )}
      </div>

      {/* Scrollable Content - Bütün filterlər birlikdə scroll olsun */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Sort - Artıq sabit qalmır, scroll ilə gedir */}
        <div>
          <h4 className="font-semibold text-primary mb-3 text-sm">Sırala</h4>
          <div className="space-y-2">
            {sortOptions.map((option) => (
              <label key={option.value} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio" name="sort" value={option.value}
                  checked={sortBy === option.value}
                  onChange={() => onSortChange(option.value)}
                  className="w-4 h-4 accent-secondary"
                />
                <span className={`text-sm group-hover:text-secondary transition-colors ${
                  sortBy === option.value ? 'text-primary font-medium' : 'text-muted'
                }`}>
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Digər Filterlər */}
        {category.filters.map((filter) => (
          <div key={filter.key}>
            <h4 className="font-semibold text-primary mb-2.5 text-sm">{filter.label}</h4>
            <div className="space-y-1.5">
              {filter.options.map((option) => (
                <label key={option} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={isFilterActive(filter.key, option)}
                    onChange={() => onFilterChange(filter.key, option)}
                    className="w-4 h-4 rounded border-border accent-secondary"
                  />
                  <span className={`text-sm group-hover:text-secondary transition-colors ${
                    isFilterActive(filter.key, option) ? 'text-primary font-medium' : 'text-muted'
                  }`}>
                    {option}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer - Sıfırla düyməsi */}
      <div className="p-4 border-t border-border flex-shrink-0 bg-card">
        <button
          onClick={handleResetAll}
          className="w-full py-2.5 text-sm font-medium text-secondary hover:text-secondary/80 transition-colors"
        >
          Filterləri Sıfırla
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* DESKTOP: Viewport hündürlüyündə, tam scrollable */}
      <aside className="hidden lg:block w-60 xl:w-64 flex-shrink-0 h-[calc(100vh-4rem)] sticky top-16">
        <div className="h-full bg-card rounded-2xl border border-border overflow-hidden">
          {sidebarContent(false)}
        </div>
      </aside>

      {/* MOBILE: Left drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={onClose}
              className="lg:hidden fixed inset-0 z-40 bg-black/50"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed top-0 left-0 bottom-0 z-50 w-72 bg-card shadow-2xl flex flex-col"
            >
              {sidebarContent(true)}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
