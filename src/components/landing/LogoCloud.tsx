import { motion } from 'framer-motion';

const partners = [
  { name: 'ASUS', id: 'asus' },
  { name: 'Lenovo', id: 'lenovo' },
  { name: 'HP', id: 'hp' },
  { name: 'Dell', id: 'dell' },
  { name: 'Acer', id: 'acer' },
  { name: 'MSI', id: 'msi' },
  { name: 'Logitech', id: 'logitech' },
  { name: 'Samsung', id: 'samsung' },
];

export default function LogoCloud() {
  return (
    <section className="py-16 bg-background border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-muted text-sm font-medium mb-10 uppercase tracking-wider"
        >
          Ən Yaxşı Brendlərin Rəsmi Distribyutoru
        </motion.p>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-8 items-center">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="flex items-center justify-center"
            >
              <div className="text-2xl font-bold text-muted/40 hover:text-muted/60 transition-colors cursor-default">
                {partner.name}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
