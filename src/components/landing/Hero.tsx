import { motion } from 'framer-motion';
import { Phone, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Hero() {
  const whatsappLink = `https://wa.me/994504926834?text=Salam,%20ProfiTech%20saytından%20yazıram.%20Məhsul%20barədə%20məlumat%20istəyirəm.`;

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hero-gradient">
        {/* Circuit Lines */}
        <div className="absolute top-20 left-10 w-40 h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
        <div className="absolute top-40 right-20 w-60 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
        <div className="absolute bottom-32 left-1/4 w-80 h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent" />
        <div className="absolute top-1/3 left-1/3 w-px h-40 bg-gradient-to-b from-transparent via-secondary/20 to-transparent" />
        <div className="absolute bottom-1/4 right-1/3 w-px h-60 bg-gradient-to-b from-transparent via-accent/20 to-transparent" />
        
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      {/* Floating Product Cards */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="hidden lg:block absolute right-20 top-1/4"
      >
        <div className="relative">
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-2xl"
          >
            <div className="w-48 h-32 bg-gradient-to-br from-secondary/20 to-primary rounded-xl mb-3 flex items-center justify-center">
              <span className="text-4xl">💻</span>
            </div>
            <p className="text-white/90 font-semibold text-sm">Hər zövqə uyqun</p>
            <p className="text-accent text-lg font-bold">Noutbuklar</p>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="hidden lg:block absolute left-20 bottom-1/4"
      >
        <div className="relative">
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-white/90 font-semibold text-sm">100% Qarantiya</p>
                <p className="text-white/60 text-xs">Rəsmi Zəmanət</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-accent/20 text-accent text-xs rounded-full">Stokda var</span>
              <span className="text-white/60 text-xs">+500 məhsul</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8"
          >
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-white/90 text-sm font-medium">Bakıda №1 İT Mağazası</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
          >
            Bakıda{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-cyan-400">
              Noutbuk, Printer
            </span>{' '}
            və İT Avadanlıqları
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg sm:text-xl text-white/80 leading-relaxed mb-10 max-w-2xl"
          >
            Oyun, iş və ev istifadəsi üçün ən sərfəli modelləri ProfiTech-də tapın. 
            Bütün məhsullar 100% qarantiya ilə təqdim olunur və sifariş WhatsApp üzərindən 
            sürətli şəkildə həyata keçirilir.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-3 px-8 py-4 bg-accent text-white font-bold text-lg rounded-full hover:bg-accent/90 transition-all hover:scale-105 shadow-xl shadow-accent/30"
            >
              <Phone className="w-5 h-5" />
              WhatsApp ilə Sifariş Ver
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#products"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold text-lg rounded-full border border-white/30 hover:bg-white/20 transition-all"
            >
              Məhsullara Bax
            </a>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-12 flex flex-wrap items-center gap-6"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-accent" />
              <span className="text-white/80 text-sm">Tam Güvənilir Xidmət</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-accent" />
              <span className="text-white/80 text-sm">Ən Sərfəli Qiymətlər</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-accent" />
              <span className="text-white/80 text-sm">100% Qarantiya</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
