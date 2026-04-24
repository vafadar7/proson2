import { Phone, MapPin, Mail } from 'lucide-react';

export default function Footer() {
  const whatsappLink = `https://wa.me/994504926834?text=Salam,%20ProfiTech%20saytından%20yazıram.`;

  return (
    <footer className="bg-[#0B1220] text-white/60 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-bold text-white mb-4">ProfiTech</h4>
            <p className="text-sm">Bakının ən etibarlı İT avadanlıq satışı üzrə ixtisaslaşmış mağazası.</p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Kateqoriyalar</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/#products" className="hover:text-white transition-colors">Oyun Noutbukları</a></li>
              <li><a href="/#products" className="hover:text-white transition-colors">İş Noutbukları</a></li>
              <li><a href="/#products" className="hover:text-white transition-colors">Printerlər</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Əlaqə</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> +994 50 492 68 34</li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> info@profitech.az</li>
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Bakı, Azərbaycan</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Sifariş Ver</h4>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors text-sm">
              <Phone className="w-4 h-4" />
              WhatsApp ilə yaz
            </a>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs">© 2024 ProfiTech. Bütün hüquqlar qorunur.</p>
          <a href="/admin" className="text-xs text-white/30 hover:text-white/60 transition-colors">Admin Panel</a>
        </div>
      </div>
    </footer>
  );
}
