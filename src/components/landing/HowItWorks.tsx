import { motion } from 'framer-motion';
import { Search, MessageSquare, FileCheck, Truck } from 'lucide-react';

const steps = [
  {
    id: 's1',
    number: '01',
    title: 'Məhsul Seçin',
    description: 'Geniş kataloqumuzdan sizə uyğun noutbuk, printer və ya digər İT avadanlıqları tapın.',
    icon: Search,
  },
  {
    id: 's2',
    number: '02',
    title: 'WhatsApp Yazın',
    description: 'Seçdiyiniz məhsulun səhifəsindəki WhatsApp düyməsini klikləyərək bizimlə əlaqə saxlayın.',
    icon: MessageSquare,
  },
  {
    id: 's3',
    number: '03',
    title: 'Sifarişi Təsdiqləyin',
    description: 'Peşəkar menecerimiz sizinlə əlaqə saxlayaraq detalları dəqiqləşdirəcək və sifarişi təsdiqləyəcək.',
    icon: FileCheck,
  },
  {
    id: 's4',
    number: '04',
    title: 'Çatdırılma',
    description: 'Sifarişiniz qısa müddət ərzində ünvanınıza çatdırılacaq və quraşdırma dəstəyi göstəriləcək.',
    icon: Truck,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-primary relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-white/10 text-white/90 text-sm font-semibold rounded-full mb-4">
            Necə İşləyir?
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Sadə və Sürətli Proses
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            WhatsApp üzərindən sifariş etmək çox asandır. Cəmi 4 addımda arzuladığınız məhsula sahib ola bilərsiniz.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-px">
                    <div className="w-full h-full bg-gradient-to-r from-secondary/50 to-transparent" />
                  </div>
                )}

                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-secondary/50 transition-all duration-300 group">
                  {/* Number Badge */}
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-secondary rounded-full flex items-center justify-center font-bold text-white text-sm shadow-lg shadow-secondary/30">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="w-14 h-14 bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-secondary" />
                  </div>

                  {/* Content */}
                  <h3 className="font-heading font-semibold text-xl text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <a
            href="#products"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white font-bold rounded-full hover:bg-accent/90 transition-all hover:scale-105 shadow-xl shadow-accent/20"
          >
            İndi Məhsul Seç
          </a>
        </motion.div>
      </div>
    </section>
  );
}
