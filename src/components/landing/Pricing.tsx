import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Ev İstifadəçisi',
    desc: 'Gündəlik istifadə üçün ideal həll',
    price: "500 AZN'dən",
    features: ['Məktəb və universitet üçün', 'Ofis proqramları', 'İnternet və sosial şəbəkələr', 'Film və musiqi'],
    popular: false,
  },
  {
    name: 'Peşəkar İş',
    desc: 'Biznes və iş mühitləri üçün optimallaşdırılmış',
    price: "1500 AZN'dən",
    features: ['Yüksək performans', 'Uzun batareya ömrü', 'Təhlükəsizlik funksiyaları', 'Korporativ dəstək'],
    popular: true,
  },
  {
    name: 'Gaming / Yüksək Performans',
    desc: 'Oyun və professional işlər üçün maksimum güc',
    price: "2500 AZN'dən",
    features: ['Güclü GPU', 'Yüksək yeniləmə tezliyi', 'RGB işıqlandırma', 'Ən son texnologiya'],
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-primary mb-4">Qiymət Planları</h2>
          <p className="text-muted max-w-2xl mx-auto">Ehtiyaclarınıza uyğun kateqoriyaya baxın.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`bg-card border rounded-2xl p-6 ${plan.popular ? 'border-secondary shadow-lg' : 'border-border'}`}
            >
              {plan.popular && (
                <span className="inline-block px-3 py-1 bg-secondary text-white text-xs font-bold rounded-full mb-4">
                  Ən Populyar
                </span>
              )}
              <h3 className="font-heading font-bold text-xl text-primary mb-1">{plan.name}</h3>
              <p className="text-muted text-sm mb-4">{plan.desc}</p>
              <p className="text-2xl font-bold text-secondary mb-6">{plan.price}</p>
              <ul className="space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-muted">
                    <Check className="w-4 h-4 text-accent flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
