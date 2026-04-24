import { motion } from 'framer-motion';

const brands = ['ASUS', 'Dell', 'HP', 'Lenovo', 'Apple', 'MSI', 'Acer', 'Logitech'];

export default function LogoCloud() {
  return (
    <section className="py-12 bg-background border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-muted text-sm mb-8">Rəsmi partnyorlarımız</p>
        <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12">
          {brands.map((brand, i) => (
            <motion.span
              key={brand}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.4 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-lg sm:text-xl font-bold text-primary/40 hover:text-primary/70 transition-colors"
            >
              {brand}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
