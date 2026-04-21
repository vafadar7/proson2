import { motion } from 'framer-motion';
import { Shield, Truck, MessageCircle, BadgePercent, Headphones, Package, Clock } from 'lucide-react';
import { features } from '../../data/products';

const iconMap: Record<string, React.ElementType> = {
  Shield,
  Truck,
  MessageCircle,
  BadgePercent,
  Headphones,
  Package,
  Clock,
};

export default function Features() {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary text-sm font-semibold rounded-full mb-4">
            Niyə ProfiTech?
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4">
            Xüsusiyyətlərimiz
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Müştəri məmnuniyyəti bizim üçün ən önəmlisi olduğundan, sizə ən yaxşı xidməti təqdim etməyə çalışırıq
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon] || Shield;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-card rounded-2xl p-6 border border-border hover:border-secondary/50 transition-all duration-300 glow-effect"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}

          {/* Large Feature Card - 7/24 Support */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="group relative md:col-span-2 bg-card rounded-2xl p-8 border border-border hover:border-secondary/50 transition-all duration-300 glow-effect overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-secondary/5 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Headphones className="w-7 h-7 text-secondary" />
              </div>
              <h3 className="font-heading font-semibold text-xl text-primary mb-2">
                7/24 Texniki Dəstək
              </h3>
              <p className="text-muted leading-relaxed max-w-md">
                Hər hansı bir problemdə bizim peşəkar texniki dəstək komandamız
                7 gün 24 saat sizin xidmətinizdədir. WhatsApp üzərindən
                çətinlik çəkdiyiniz hər hansı məsələdə kömək ala bilərsiniz.
              </p>
            </div>
          </motion.div>

          {/* Orijinal Məhsullar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="group relative bg-card rounded-2xl p-6 border border-border hover:border-secondary/50 transition-all duration-300 glow-effect"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <Package className="w-6 h-6 text-accent" />
            </div>
            <h3 className="font-heading font-semibold text-lg text-primary mb-2">
              Orijinal Məhsullar
            </h3>
            <p className="text-muted text-sm leading-relaxed">
              Yalnız rəsmi qaynaqlardan tədarük olunmuş orijinal məhsullar
            </p>
          </motion.div>

          {/* Large Feature Card - Delivery */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="group relative md:col-span-2 bg-card rounded-2xl p-8 border border-border hover:border-secondary/50 transition-all duration-300 glow-effect overflow-hidden"
          >
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-accent/5 to-transparent rounded-full translate-y-1/2 -translate-x-1/2" />
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-heading font-semibold text-xl text-primary mb-2">
                Sürətli Çatdırılma
              </h3>
              <p className="text-muted leading-relaxed max-w-md">
                Bakı daxilində 24 saat, bölgələrə 48-72 saat ərzində çatdırılma.
                Sifarişlərinizin təhlükəsiz və vaxtında çatdırılmasını təmin edirik.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
