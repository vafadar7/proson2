export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  specs: Record<string, string>;
  badge?: string;
  isNew?: boolean;
  isBestseller?: boolean;
  description?: string;
  // Dynamic filters - admin tərəfindən əlavə edilən filter dəyərləri
  filterValues?: Record<string, string>;
}

export interface Filter {
  key: string;
  label: string;
  options: string[];
}

export interface Category {
  id: string;
  name: string;
  filters: Filter[];
}

export const categories: Category[] = [
  {
    id: "gaming",
    name: "Oyun Noutbukları",
    filters: [
      { key: "gpu", label: "GPU", options: ["RTX 4090", "RTX 4080", "RTX 4070", "RTX 4060", "RTX 3060"] },
      { key: "cpu", label: "CPU", options: ["i9-14900HX", "i7-14700HX", "i5-14500HX", "Ryzen 9 7945HX", "Ryzen 7 7840HS"] },
      { key: "ram", label: "RAM", options: ["64GB", "32GB", "16GB"] },
      { key: "ssd", label: "SSD", options: ["2TB", "1TB", "512GB"] },
      { key: "refresh", label: "Ekran Hz", options: ["240Hz", "165Hz", "144Hz", "120Hz"] },
    ],
  },
  {
    id: "business",
    name: "İş Noutbukları",
    filters: [
      { key: "battery", label: "Batareya", options: ["12+ saat", "8-12 saat", "5-8 saat"] },
      { key: "weight", label: "Çəki", options: ["< 1kg", "1-1.5kg", "1.5-2kg"] },
      { key: "cpu", label: "CPU", options: ["i7", "i5", "Ultra 7", "Ultra 5"] },
      { key: "ram", label: "RAM", options: ["32GB", "16GB", "8GB"] },
      { key: "ssd", label: "SSD", options: ["1TB", "512GB", "256GB"] },
    ],
  },
  {
    id: "home",
    name: "Ev Noutbukları",
    filters: [
      { key: "price", label: "Qiymət", options: ["< 1000 AZN", "1000-1500 AZN", "1500-2000 AZN", "> 2000 AZN"] },
      { key: "ram", label: "RAM", options: ["16GB", "8GB", "4GB"] },
      { key: "ssd", label: "SSD", options: ["512GB", "256GB", "128GB"] },
      { key: "screen", label: "Ekran ölçüsü", options: ['17.3"', '15.6"', '14"', '13.3"'] },
    ],
  },
  {
    id: "printers",
    name: "Printerlər",
    filters: [
      { key: "type", label: "Tip", options: ["Lazer", "Inkjet"] },
      { key: "color", label: "Rəng", options: ["Rəngli", "Qara-ağ"] },
      { key: "wifi", label: "Wi-Fi", options: ["Var", "Yox"] },
      { key: "speed", label: "Çap sürəti", options: ["30+ səh/san", "20-30 səh/san", "10-20 səh/san"] },
    ],
  },
  {
    id: "other",
    name: "Digər İT Avadanlıqları",
    filters: [
      { key: "type", label: "Tip", options: ["Monitor", "Klaviatura", "Siçan", "Webcam", "Adapter", "Kabellər"] },
      { key: "brand", label: "Brend", options: ["Logitech", "HP", "Dell", "Samsung", "LG", "Acer"] },
      { key: "compatibility", label: "Uyğunluq", options: ["Universal", "Windows", "Mac", "Gaming"] },
      { key: "price", label: "Qiymət", options: ["< 100 AZN", "100-300 AZN", "300-500 AZN", "> 500 AZN"] },
    ],
  },
];

export const products: Product[] = [
  {
    id: "gaming-1",
    name: "ASUS ROG Strix G16 (2024)",
    price: 3299,
    originalPrice: 3699,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&h=600&fit=crop",
    category: "gaming",
    specs: { gpu: "RTX 4070", cpu: "i7-14700HX", ram: "16GB", ssd: "1TB", refresh: "165Hz" },
    badge: "Ən çox satılan",
    isBestseller: true,
  },
  {
    id: "gaming-2",
    name: "Apple MacBook Pro M4",
    price: 4799,
    image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&h=600&fit=crop",
    category: "gaming",
    specs: { gpu: "RTX 4090", cpu: "i9-14900HX", ram: "32GB", ssd: "2TB", refresh: "240Hz" },
    badge: "Yeni",
    isNew: true,
  },
  {
    id: "gaming-3",
    name: "MSI Raider GE78 HX (2024)",
    price: 3999,
    originalPrice: 4399,
    image: "https://images.unsplash.com/photo-1595327656903-2f54e37ce09b?w=800&h=600&fit=crop",
    category: "gaming",
    specs: { gpu: "RTX 4080", cpu: "i9-14900HX", ram: "32GB", ssd: "2TB", refresh: "240Hz" },
  },
  {
    id: "gaming-4",
    name: "ASUS ROG Zephyrus G14 (2024)",
    price: 2499,
    image: "https://images.unsplash.com/photo-1544731612-de7f96afe55f?w=800&h=600&fit=crop",
    category: "gaming",
    specs: { gpu: "RTX 4060", cpu: "i5-14500HX", ram: "16GB", ssd: "512GB", refresh: "144Hz" },
    badge: "Sərfəli qiymət",
  },
  {
    id: "gaming-5",
    name: "Dell G15",
    price: 2899,
    originalPrice: 3199,
    image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&h=600&fit=crop",
    category: "gaming",
    specs: { gpu: "RTX 4060", cpu: "Ryzen 9 7945HX", ram: "16GB", ssd: "1TB", refresh: "165Hz" },
    isNew: true,
  },
  {
    id: "business-1",
    name: "Dell XPS 15 (9530)",
    price: 2899,
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&h=600&fit=crop",
    category: "business",
    specs: { battery: "12+ saat", weight: "1.5-2kg", cpu: "i7", ram: "16GB", ssd: "512GB" },
    badge: "Tövsiyə olunan",
  },
  {
    id: "business-2",
    name: "Lenovo ThinkPad X1 Carbon (Gen 12)",
    price: 3399,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop",
    category: "business",
    specs: { battery: "12+ saat", weight: "< 1kg", cpu: "Ultra 7", ram: "16GB", ssd: "1TB" },
    badge: "Yeni",
    isNew: true,
  },
  {
    id: "business-3",
    name: "HP EliteBook 840 G11",
    price: 2199,
    originalPrice: 2499,
    image: "https://images.unsplash.com/photo-1595327656903-2f54e37ce09b?w=800&h=600&fit=crop",
    category: "business",
    specs: { battery: "8-12 saat", weight: "1-1.5kg", cpu: "Ultra 5", ram: "16GB", ssd: "512GB" },
    isBestseller: true,
  },
  {
    id: "business-4",
    name: "Lenovo ThinkPad T14s (Gen 5)",
    price: 1899,
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=600&fit=crop",
    category: "business",
    specs: { battery: "12+ saat", weight: "1-1.5kg", cpu: "i5", ram: "16GB", ssd: "256GB" },
  },
  {
    id: "home-1",
    name: "ASUS VivoBook 15 (X1504)",
    price: 899,
    image: "https://images.unsplash.com/photo-1511385348-a52b4a160dc2?w=800&h=600&fit=crop",
    category: "home",
    specs: { price: "< 1000 AZN", ram: "8GB", ssd: "256GB", screen: '15.6"' },
    badge: "Sərfəli",
  },
  {
    id: "home-2",
    name: "Acer Aspire 5 (A515-58M)",
    price: 1249,
    originalPrice: 1399,
    image: "",
    category: "home",
    specs: { price: "1000-1500 AZN", ram: "16GB", ssd: "512GB", screen: '15.6"' },
    isBestseller: true,
  },
  {
    id: "home-3",
    name: "Lenovo IdeaPad Slim 3 (15IRH8)",
    price: 799,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop",
    category: "home",
    specs: { price: "< 1000 AZN", ram: "8GB", ssd: "256GB", screen: '14"' },
  },
  {
    id: "home-4",
    name: "HP Laptop 17-cn3000 Series",
    price: 1599,
    image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&h=600&fit=crop",
    category: "home",
    specs: { price: "1500-2000 AZN", ram: "16GB", ssd: "512GB", screen: '17.3"' },
    badge: "Böyük ekran",
  },
  {
    id: "printer-1",
    name: "HP LaserJet Pro M404dn",
    price: 549,
    image: "",
    category: "printers",
    specs: { type: "Lazer", color: "Qara-ağ", wifi: "Yox", speed: "30+ səh/san" },
    badge: "Ofis üçün ideal",
  },
  {
    id: "printer-2",
    name: "Canon PIXMA G6020 MegaTank",
    price: 649,
    image: "",
    category: "printers",
    specs: { type: "Inkjet", color: "Rəngli", wifi: "Var", speed: "10-20 səh/san" },
    badge: "Ən çox satılan",
    isBestseller: true,
  },
  {
    id: "printer-3",
    name: "Epson EcoTank ET-4760",
    price: 849,
    originalPrice: 999,
    image: "",
    category: "printers",
    specs: { type: "Inkjet", color: "Rəngli", wifi: "Var", speed: "20-30 səh/san" },
    isNew: true,
  },
  {
    id: "other-1",
    name: "Logitech MX Master 3S",
    price: 249,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=600&fit=crop",
    category: "other",
    specs: { type: "Siçan", brand: "Logitech", compatibility: "Universal", price: "100-300 AZN" },
    badge: "Bestseller",
    isBestseller: true,
  },
  {
    id: "other-2",
    name: 'Apple iMac 5k 27',
    price: 749,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&h=600&fit=crop",
    category: "other",
    specs: { type: "Monitor", brand: "Samsung", compatibility: "Gaming", price: "300-500 AZN" },
    badge: "Gaming",
  },
  {
    id: "other-3",
    name: "Keychron K2 Pro Mechanical",
    price: 199,
    image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&h=600&fit=crop",
    category: "other",
    specs: { type: "Klaviatura", brand: "Logitech", compatibility: "Universal", price: "100-300 AZN" },
    isNew: true,
  },
  {
    id: "other-4",
    name: 'LG UltraWide 34" (34WP65C-B)',
    price: 1099,
    originalPrice: 1299,
    image: "https://images.unsplash.com/photo-1586210579191-33b45e38fa2c?w=800&h=600&fit=crop",
    category: "other",
    specs: { type: "Monitor", brand: "LG", compatibility: "Universal", price: "> 500 AZN" },
    badge: "Ən yaxşı seçim",
  },
];

export const features = [
  { id: "f1", title: "100% Qarantiya", description: "Bütün məhsullar rəsmi distribyutor zəmanəti ilə təqdim olunur", icon: "Shield" },
  { id: "f2", title: "Sürətli Çatdırılma", description: "Sifarişləriniz 24 saat ərzində Bakı daxilində çatdırılır", icon: "Truck" },
  { id: "f3", title: "WhatsApp Dəstək", description: "Məhsul seçimində kömək üçün WhatsApp üzərindən əlaqə saxlayın", icon: "MessageCircle" },
  { id: "f4", title: "Ən Sərfəli Qiymətlər", description: "Bakıda ən rəqabətli qiymət zəmanəti veririk", icon: "BadgePercent" },
];

export const steps = [
  { id: "s1", number: "01", title: "Məhsul Seçin", description: "Kategoriyalara baxaraq sizə uyğun məhsulu tapın" },
  { id: "s2", number: "02", title: "WhatsApp Yazın", description: "Məhsul səhifəsindəki WhatsApp düyməsini klikləyin" },
  { id: "s3", number: "03", title: "Sifarişi Təsdiqləyin", description: "Menecerimiz sizinlə əlaqə saxlayaraq detalları dəqiqləşdirəcək" },
  { id: "s4", number: "04", title: "Çatdırılma", description: "Sifarişiniz ünvanınıza qədər çatdırılacaq" },
];

export const pricingPlans = [
  {
    id: "plan1",
    name: "Ev İstifadəçisi",
    description: "Gündəlik istifadə üçün ideal həll",
    price: "500 AZN'dən",
    features: ["Məktəb və universitet üçün", "Ofis proqramları", "İnternet və sosial şəbəkələr", "Film və musiqi"],
    cta: "Məhsullara Bax",
    popular: false,
  },
  {
    id: "plan2",
    name: "Peşəkar İş",
    description: "Biznes və iş mühitləri üçün optimallaşdırılmış",
    price: "1500 AZN'dən",
    features: ["Yüksək performans", "Uzun batareya ömrü", "Təhlükəsizlik funksiyaları", "Korporativ dəstək"],
    cta: "Məhsullara Bax",
    popular: true,
  },
  {
    id: "plan3",
    name: "Gaming / Yüksək Performans",
    description: "Oyun və professional işlər üçün maksimum güc",
    price: "2500 AZN'dən",
    features: ["Güclü GPU", "Yüksək yeniləmə tezliyi", "RGB işıqlandırma", "Ən son texnologiya"],
    cta: "Məhsullara Bax",
    popular: false,
  },
];
