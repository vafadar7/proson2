import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const footerLinks = [
  {
    title: 'Kateqoriyalar',
    links: [
      { name: 'Oyun Noutbukları', href: '#products' },
      { name: 'İş Noutbukları', href: '#products' },
      { name: 'Ev Noutbukları', href: '#products' },
      { name: 'Printerlər', href: '#products' },
      { name: 'Digər İT Avadanlıqlar', href: '#products' },
    ],
  },
  {
    title: 'Şirkət',
    links: [
      { name: 'Haqqımızda', href: '#' },
      { name: 'Əlaqə', href: '#footer' },
      { name: 'Çatdırılma', href: '#' },
      { name: 'Zəmanət', href: '#' },
      { name: 'FAQ', href: '#' },
    ],
  },
];

const socialLinks = [
  { name: 'Facebook', href: '#', icon: 'F' },
  { name: 'Instagram', href: '#', icon: 'I' },
  { name: 'WhatsApp', href: 'https://wa.me/994504926834', icon: 'W' },
  { name: 'Telegram', href: '#', icon: 'T' },
];

interface FooterProps {
  onAdminClick?: () => void;
}

export default function Footer({ onAdminClick }: FooterProps) {
  const whatsappLink = `https://wa.me/994504926834?text=Salam,%20ProfiTech%20saytından%20yazıram.`;

  return (
    <footer id="footer" className="bg-primary text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center font-bold text-lg text-primary">
                P
              </div>
              <span className="font-heading font-bold text-xl">ProfiTech</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              Bakıda noutbuk, printer və İT avadanlıqlarının ən etibarlı təchizatçısı.
              100% qarantiya və sərfəli qiymətlər.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center font-semibold text-sm hover:bg-secondary transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {footerLinks.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (index + 1) * 0.1 }}
            >
              <h3 className="font-heading font-semibold text-lg mb-6">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-white/70 text-sm hover:text-white transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="font-heading font-semibold text-lg mb-6">Əlaqə</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <span className="text-white/70 text-sm">
                  Akademik Mirəsədulla Mirqasımov küçəsi, Bakı, Azərbaycan AZ1102
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-secondary flex-shrink-0" />
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer"
                  className="text-white/70 text-sm hover:text-white transition-colors">
                  +994 50 492 68 34
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-secondary flex-shrink-0" />
                <span className="text-white/70 text-sm">info@proflitech.az</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-secondary flex-shrink-0" />
                <span className="text-white/70 text-sm">Hər gün: 09:00 - 21:00</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/50 text-sm text-center md:text-left">
              © 2025 ProfiTech. Bütün hüquqlar qorunur.
            </p>
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2 text-white/70 text-sm">
                <span className="w-2 h-2 bg-accent rounded-full" />
                Tam Güvənilir Xidmət
              </span>
              <span className="flex items-center gap-2 text-white/70 text-sm">
                <span className="w-2 h-2 bg-accent rounded-full" />
                Ən Sərfəli Qiymətlər
              </span>
              <span className="flex items-center gap-2 text-white/70 text-sm">
                <span className="w-2 h-2 bg-accent rounded-full" />
                100% Qarantiya
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Admin link — very bottom, subtle */}
      <div className="border-t border-white/5 bg-black/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-center">
          <button
            onClick={onAdminClick}
            className="text-white/20 hover:text-white/50 text-xs transition-colors"
          >
            Admin
          </button>
        </div>
      </div>
    </footer>
  );
}
