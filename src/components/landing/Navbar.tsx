import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, ShoppingCart, Phone, ChevronRight, Settings } from 'lucide-react';
import { useStore } from '../../store/useStore';

interface NavbarProps {
  cartCount?: number;
  onCartClick?: () => void;
  onCategorySelect?: (categoryId: string) => void;
}

export default function Navbar({ cartCount = 0, onCartClick, onCategorySelect }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const whatsappLink = `https://wa.me/994504926834?text=Salam,%20ProfiTech%20saytından%20yazıram.%20Məhsul%20barədə%20məlumat%20istəyirəm.`;

  const allCategories = useStore((s) => s.allCategories);

  const handleCategoryClick = (categoryId: string) => {
    setIsMobileMenuOpen(false);
    onCategorySelect?.(categoryId);
  };

  const logoUrl = "https://profitech.az/frontendCssJs/img/logo/logo_light.png";

  return (
    <>
      {/* STICKY BLACK HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#000000] border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center h-14 sm:h-16 gap-2 sm:gap-3">
            {/* LEFT — Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="flex-shrink-0 p-2 text-white/80 hover:text-white transition-colors rounded-lg hover:bg-white/10"
              aria-label="Menyu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Logo */}
            <a href="/" className="hidden sm:flex items-center gap-2 flex-shrink-0 mr-1">
              <img src={logoUrl} alt="ProfiTech" className="h-8 w-auto object-contain" />
            </a>

            {/* CENTER — Search */}
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
              <input
                ref={searchRef}
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Məhsul axtar..."
                className="w-full bg-white/10 border border-white/15 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-secondary/70 focus:bg-white/15 transition-all"
              />
            </div>

            {/* RIGHT — Cart + Admin */}
            <div className="flex items-center gap-1">
              <a
                href="/admin"
                className="hidden sm:flex p-2 text-white/50 hover:text-white transition-colors rounded-lg hover:bg-white/10"
                title="Admin Panel"
              >
                <Settings className="w-4 h-4" />
              </a>
              <button
                onClick={onCartClick}
                className="relative flex-shrink-0 p-2 text-white/80 hover:text-white transition-colors rounded-lg hover:bg-white/10"
                aria-label="Səbət"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-secondary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div className="h-14 sm:h-16" />

      {/* LEFT DRAWER MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60]">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
            <motion.nav
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="absolute left-0 top-0 bottom-0 w-72 bg-[#0B1220] flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <img src={logoUrl} alt="ProfiTech" className="h-8 w-auto object-contain" />
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-1.5 text-white/50 hover:text-white transition-colors rounded-lg hover:bg-white/10">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-3">
                {[
                  { name: 'Ana Səhifə', href: '/' },
                  { name: 'Məhsullar', href: '/#products' },
                ].map((link) => (
                  <a key={link.name} href={link.href} onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between px-5 py-3 text-white/80 hover:text-white hover:bg-white/5 transition-colors text-sm font-medium">
                    {link.name}
                    <ChevronRight className="w-4 h-4 text-white/30" />
                  </a>
                ))}
                <div className="mt-3 pt-3 border-t border-white/10">
                  <p className="px-5 pb-2 text-xs font-semibold text-white/30 uppercase tracking-wider">Kateqoriyalar</p>
                  {allCategories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryClick(cat.id)}
                      className="w-full flex items-center justify-between px-5 py-2.5 text-white/60 hover:text-white hover:bg-white/5 transition-colors text-sm text-left"
                    >
                      {cat.name}
                      <ChevronRight className="w-3.5 h-3.5 text-white/20" />
                    </button>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-white/10">
                  <a href="/admin" onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between px-5 py-3 text-white/60 hover:text-white hover:bg-white/5 transition-colors text-sm font-medium">
                    <span className="flex items-center gap-2">
                      <Settings className="w-4 h-4" /> Admin Panel
                    </span>
                    <ChevronRight className="w-4 h-4 text-white/30" />
                  </a>
                </div>
              </div>

              <div className="p-4 border-t border-white/10">
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-accent text-white font-semibold rounded-xl hover:bg-accent/90 transition-colors text-sm">
                  <Phone className="w-4 h-4" />
                  WhatsApp ilə Sifariş Ver
                </a>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
