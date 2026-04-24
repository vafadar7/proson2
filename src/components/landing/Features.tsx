import { motion } from 'framer-motion';
import { Shield, Truck, MessageCircle, BadgePercent } from 'lucide-react';

const features = [
  { icon: Shield, title: '100% Qarantiya', desc: 'Bütün məhsullar rəsmi distribyutor zəmanəti ilə təqdim olunur' },
  { icon: Truck, title: 'Sürətli Çatdırılma', desc: 'Sifarişləriniz 24 saat ərzində Bakı daxilində çatdırılır' },
  { icon: MessageCircle, title: 'WhatsApp Dəstək', desc: 'Məhsul seçimində kömək üçün WhatsApp üzərindən əlaqə saxlayın' },
  { icon: BadgePercent, title: 'Ən Sərfəli Qiymətlər', desc: 'Bakıda ən rəqabətli qiymət zəmanəti veririk' },
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-primary mb-4">Niyə ProfiTech?</h2>
          <p className="text-muted max-w-2xl mx-auto">Bakının ən etibarlı İT avadanlıq satışı üzrə ixtisaslaşmış mağazası.</p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-2xl p-6 hover:border-secondary/30 transition-colors"
            >
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-4">
                <f.icon className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-heading font-bold text-primary mb-2">{f.title}</h3>
              <p className="text-muted text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
