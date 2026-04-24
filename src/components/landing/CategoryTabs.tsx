import { motion } from 'framer-motion';
import { useStore } from '../../store/useStore';

interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export default function CategoryTabs({ activeCategory, onCategoryChange }: CategoryTabsProps) {
  const allCategories = useStore((s) => s.allCategories);

  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
      {allCategories.map((category) => (
        <motion.button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`relative px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-medium text-sm sm:text-base transition-all duration-300 ${
            activeCategory === category.id
              ? 'text-white'
              : 'text-muted hover:text-primary bg-background border border-border hover:border-secondary/50'
          }`}
        >
          {activeCategory === category.id && (
            <motion.div
              layoutId="activeCategory"
              className="absolute inset-0 bg-primary rounded-full"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10">{category.name}</span>
        </motion.button>
      ))}
    </div>
  );
}
