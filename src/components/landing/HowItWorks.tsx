import { motion } from 'framer-motion';

const steps = [
  { number: '01', title: 'Məhsul Seçin', desc: 'Kategoriyalara baxaraq sizə uyğun məhsulu tapın' },
  { number: '02', title: 'WhatsApp Yazın', desc: 'Məhsul səhifəsindəki WhatsApp düyməsini klikləyin' },
  { number: '03', title: 'Sifarişi Təsdiqləyin', desc: 'Menecerimiz sizinlə əlaqə saxlayaraq detalları dəqiqləşdirəcək' },
  { number: '04', title: 'Çatdırılma', desc: 'Sifarişiniz ünvanınıza qədər çatdırılacaq' },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-primary mb-4">Necə İşləyir?</h2>
          <p className="text-muted max-w-2xl mx-auto">4 sadə addımda istədiyiniz məhsulu əldə edin.</p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative"
            >
              <span className="text-5xl font-bold text-secondary/10 absolute -top-4 -left-2">{s.number}</span>
              <div className="bg-background border border-border rounded-2xl p-6 relative z-10">
                <h3 className="font-heading font-bold text-primary mb-2">{s.title}</h3>
                <p className="text-muted text-sm">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
