import { useState, useRef, useEffect } from 'react';
import { 
  X, Plus, Trash2, Upload, Images, Save, Eye, ChevronDown, 
  LogOut, Tag, FolderPlus, Loader2, Database, Package, List
} from 'lucide-react';
import { categories as defaultCategories, products as sampleProducts } from '../../data/products';
import type { Product, Category } from '../../data/products';
import { supabase } from '../../lib/supabase';

// Gallery images - 2 dənə qaldı (4-ü silindi)
const GALLERY_IMAGES = [
  { id: 'g1', url: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&q=80', label: 'Laptop' },
  { id: 'g2', url: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400&q=80', label: 'Tech' },
];

const emptyProduct = (): Omit<Product, 'id'> => ({
  name: '', price: 0, originalPrice: undefined,
  image: '', category: 'gaming', specs: {},
  badge: '', isNew: false, isBestseller: false,
});

// Yeni tab strukturu: 2 yerə bölündü
type Tab = 'add-product' | 'manage-products' | 'categories';

interface AdminPanelProps { onClose: () => void; }

export default function AdminPanel({ onClose }: AdminPanelProps) {
  // Auth state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);

  // Data state
  const [products, setProducts] = useState<Product[]>([]);
  const [customCategories, setCustomCategories] = useState<Category[]>([]);
  const allCategories = [...defaultCategories, ...customCategories];
  const [isLoading, setIsLoading] = useState(true);

  // UI state - Yeni tablar
  const [tab, setTab] = useState<Tab>('add-product');
  const [form, setForm] = useState(emptyProduct());
  const [specKey, setSpecKey] = useState('');
  const [specVal, setSpecVal] = useState('');
  const [imageMode, setImageMode] = useState<'upload' | 'gallery' | 'url'>('gallery');
  const [previewUrl, setPreviewUrl] = useState('');
  const [urlInput, setUrlInput] = useState('');
  const [success, setSuccess] = useState('');
  const [editId, setEditId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  // New category form
  const [newCatName, setNewCatName] = useState('');
  const [newCatId, setNewCatId] = useState('');
  const [catSuccess, setCatSuccess] = useState('');

  // Check auth on mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Fetch data when logged in
  useEffect(() => {
    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      setIsLoggedIn(true);
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    await Promise.all([fetchProducts(), fetchCategories()]);
    setIsLoading(false);
  };

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error:', error);
      return;
    }
    
    if (data) {
      const transformed = data.map((p: any) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        originalPrice: p.original_price,
        image: p.image,
        category: p.category,
        specs: p.specs || {},
        badge: p.badge,
        isNew: p.is_new,
        isBestseller: p.is_bestseller,
      }));
      setProducts(transformed);
    }
  };

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('is_custom', true);
    
    if (error) {
      console.error('Error:', error);
      return;
    }
    
    if (data) {
      setCustomCategories(data.map((c: any) => ({
        id: c.id,
        name: c.name,
        filters: c.filters || [],
      })));
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setAuthError('E-mail və şifrə daxil edin');
      return;
    }
    
    setIsLoadingAuth(true);
    setAuthError('');
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    setIsLoadingAuth(false);
    
    if (error) {
      setAuthError('E-mail və ya şifrə yanlışdır');
    } else {
      setIsLoggedIn(true);
      setEmail('');
      setPassword('');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    setProducts([]);
  };

  const handleSeedDatabase = async () => {
    if (!confirm('Nümunə məhsulları Supabase-ə yükləmək istədiyinizə əminsiniz?')) return;
    
    setIsLoading(true);
    
    const dbProducts = sampleProducts.map(p => ({
      id: p.id,
      name: p.name,
      price: p.price,
      original_price: p.originalPrice || null,
      image: p.image,
      category: p.category,
      specs: p.specs,
      badge: p.badge || null,
      is_new: p.isNew || false,
      is_bestseller: p.isBestseller || false,
    }));

    const { error } = await supabase
      .from('products')
      .upsert(dbProducts, { onConflict: 'id' });

    setIsLoading(false);

    if (error) {
      alert('Xəta: ' + error.message);
    } else {
      setSuccess('Nümunə məhsullar yükləndi!');
      fetchProducts();
      window.dispatchEvent(new CustomEvent('adminProductsUpdated'));
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const tempUrl = URL.createObjectURL(file);
    setPreviewUrl(tempUrl);
    setIsSubmitting(true);
    
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(fileName, file);

    if (uploadError) {
      alert('Yükləmə xətası: ' + uploadError.message);
      setIsSubmitting(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('product-images')
      .getPublicUrl(fileName);

    setForm((f) => ({ ...f, image: publicUrl }));
    setIsSubmitting(false);
  };

  const handleGalleryPick = (url: string) => { 
    setPreviewUrl(url); 
    setForm((f) => ({ ...f, image: url })); 
  };
  
  const handleUrlInput = (val: string) => { 
    setUrlInput(val); 
    setPreviewUrl(val); 
    setForm((f) => ({ ...f, image: val })); 
  };

  const addSpec = () => {
    if (!specKey || !specVal) return;
    setForm((f) => ({ ...f, specs: { ...f.specs, [specKey]: specVal } }));
    setSpecKey(''); setSpecVal('');
  };
  
  const removeSpec = (key: string) => setForm((f) => { 
    const s = { ...f.specs }; delete s[key]; return { ...f, specs: s }; 
  });

  const handleSubmit = async () => {
    if (!form.name || !form.price || !form.image) { 
      alert('Ad, qiymət və şəkil mütləqdir.'); 
      return; 
    }

    setIsSubmitting(true);
    
    const productData = {
      id: editId || `admin-${Date.now()}`,
      name: form.name,
      price: form.price,
      original_price: form.originalPrice || null,
      image: form.image,
      category: form.category,
      specs: form.specs,
      badge: form.badge || null,
      is_new: form.isNew,
      is_bestseller: form.isBestseller,
    };

    const { error } = await supabase
      .from('products')
      .upsert(productData);

    setIsSubmitting(false);

    if (error) {
      alert('Xəta: ' + error.message);
      return;
    }

    setSuccess(editId ? 'Yeniləndi!' : 'Əlavə edildi!');
    setForm(emptyProduct()); 
    setPreviewUrl(''); 
    setUrlInput('');
    setEditId(null);
    setTimeout(() => setSuccess(''), 3000);
    fetchProducts();
    window.dispatchEvent(new CustomEvent('adminProductsUpdated'));
  };

  // Düzəliş edəndə "Məhsul Əlavə Et" tab-ına keçir
  const handleEdit = (product: Product) => {
    setEditId(product.id); 
    setForm({ ...product });
    setPreviewUrl(product.image); 
    setUrlInput(product.image);
    setTab('add-product'); // Automatik olaraq əlavə et səhifəsinə keç
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Silmək istədiyinizə əminsiniz?')) return;
    
    setIsSubmitting(true);
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);
    
    setIsSubmitting(false);
    
    if (error) {
      alert('Silinmə xətası: ' + error.message);
    } else {
      fetchProducts();
      window.dispatchEvent(new CustomEvent('adminProductsUpdated'));
    }
  };

  const handleAddCategory = async () => {
    if (!newCatName.trim() || !newCatId.trim()) { 
      alert('Ad və ID mütləqdir.'); 
      return; 
    }
    
    const id = newCatId.trim().toLowerCase().replace(/\s+/g, '-');
    if (allCategories.find(c => c.id === id)) { 
      alert('Bu ID artıq var.'); 
      return; 
    }

    const { error } = await supabase
      .from('categories')
      .insert({ id, name: newCatName.trim(), filters: [], is_custom: true });

    if (error) {
      alert('Xəta: ' + error.message);
      return;
    }

    setNewCatName(''); 
    setNewCatId('');
    setCatSuccess('Kateqoriya əlavə edildi!');
    setTimeout(() => setCatSuccess(''), 3000);
    fetchCategories();
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm('Kateqoriyanı silmək istədiyinizə əminsiniz?')) return;
    
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);
    
    if (error) {
      alert('Xəta: ' + error.message);
    } else {
      fetchCategories();
    }
  };

  // Login Screen
  if (!isLoggedIn) {
    return (
      <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
          <div className="bg-[#0B1220] px-6 py-5 flex items-center justify-between">
            <div>
              <h2 className="font-bold text-white text-lg">Admin Giriş</h2>
              <p className="text-white/50 text-xs mt-0.5">ProfiTech Panel</p>
            </div>
            <button onClick={onClose} className="p-2 text-white/40 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-6 space-y-4">
            {authError && (
              <div className="px-4 py-3 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">
                {authError}
              </div>
            )}
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">E-mail</label>
              <input
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@profitech.az"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Şifrə</label>
              <input
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            <button
              onClick={handleLogin}
              disabled={isLoadingAuth}
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoadingAuth && <Loader2 className="w-4 h-4 animate-spin" />}
              {isLoadingAuth ? 'Giriş...' : 'Daxil Ol'}
            </button>
            
            <div className="text-xs text-gray-400 text-center mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="font-semibold text-gray-600 mb-1">Qeyd:</p>
              <p>Supabase Authentication bölməsindən istifadəçi yaradın.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Panel
  return (
    <div className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl h-[95vh] sm:h-[92vh] flex flex-col overflow-hidden">
        {/* Header - Mobil üçün optimallaşdırıldı */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 bg-[#0B1220] flex-shrink-0 gap-3 sm:gap-0">
          <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
            <h2 className="font-bold text-white text-sm sm:text-base whitespace-nowrap">Admin Panel</h2>
            <div className="flex gap-1">
              {([
                { id: 'add-product', label: 'Məhsul Əlavə Et', icon: Plus },
                { id: 'manage-products', label: 'Məhsullar', icon: List },
                { id: 'categories', label: 'Kateqoriyalar', icon: Tag }
              ] as const).map((t) => (
                <button 
                  key={t.id} 
                  onClick={() => setTab(t.id as Tab)}
                  className={`px-2 sm:px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap ${tab === t.id ? 'bg-white/15 text-white' : 'text-white/50 hover:text-white hover:bg-white/10'}`}
                >
                  <t.icon className="w-3.5 h-3.5 hidden sm:block" />
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 justify-end">
            <button 
              onClick={handleSeedDatabase}
              disabled={isLoading}
              className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 text-green-400 hover:text-green-300 text-xs rounded-lg hover:bg-white/10 transition-colors disabled:opacity-50"
              title="Nümunə məhsulları yüklə"
            >
              <Database className="w-3.5 h-3.5" /> 
              <span className="hidden sm:inline">Nümunələri Yüklə</span>
            </button>
            <button 
              onClick={handleLogout} 
              className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 text-white/50 hover:text-white text-xs rounded-lg hover:bg-white/10 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Çıxış</span>
            </button>
            <button 
              onClick={onClose} 
              className="p-1.5 sm:p-2 text-white/50 hover:text-white transition-colors rounded-lg hover:bg-white/10"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : (
          <div className="flex-1 overflow-hidden relative">
            {/* Add Product Tab - Scrollable */}
            {tab === 'add-product' && (
              <div className="h-full overflow-y-auto p-4 sm:p-6 bg-white">
                <div className="max-w-2xl mx-auto space-y-4 sm:space-y-5 pb-20">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 text-base sm:text-lg">
                      {editId ? 'Məhsulu Düzənlə' : 'Yeni Məhsul Əlavə Et'}
                    </h3>
                    {editId && (
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Redaktə rejimi</span>
                    )}
                  </div>
                  
                  {success && <div className="px-4 py-3 bg-green-50 text-green-700 rounded-xl text-sm font-medium">✓ {success}</div>}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-gray-500 mb-1.5">Məhsul adı *</label>
                      <input 
                        type="text" 
                        value={form.name} 
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500" 
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1.5">Qiymət (AZN) *</label>
                      <input 
                        type="number" 
                        value={form.price || ''} 
                        onChange={(e) => setForm((f) => ({ ...f, price: Number(e.target.value) }))}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1.5">Köhnə qiymət</label>
                      <input 
                        type="number" 
                        value={form.originalPrice || ''} 
                        onChange={(e) => setForm((f) => ({ ...f, originalPrice: Number(e.target.value) || undefined }))}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Kateqoriya</label>
                    <div className="relative">
                      <select 
                        value={form.category} 
                        onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 appearance-none pr-8"
                      >
                        {allCategories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                      </select>
                      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Badge (Nişan)</label>
                    <input 
                      type="text" 
                      value={form.badge || ''} 
                      onChange={(e) => setForm((f) => ({ ...f, badge: e.target.value }))}
                      placeholder="Yeni / Endirim / Ən çox satılan"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500" 
                    />
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={form.isNew}
                        onChange={(e) => setForm((f) => ({ ...f, isNew: e.target.checked }))}
                        className="w-4 h-4 accent-blue-600" 
                      />
                      <span className="text-sm text-gray-600">Yeni məhsul</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={form.isBestseller}
                        onChange={(e) => setForm((f) => ({ ...f, isBestseller: e.target.checked }))}
                        className="w-4 h-4 accent-blue-600" 
                      />
                      <span className="text-sm text-gray-600">Ən çox satılan</span>
                    </label>
                  </div>

                  {/* Image Section */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-2">Şəkil *</label>
                    <div className="flex gap-1 mb-3 bg-gray-50 rounded-lg p-1">
                      {[
                        { id: 'upload', icon: <Upload className="w-3.5 h-3.5" />, label: 'Yüklə' },
                        { id: 'gallery', icon: <Images className="w-3.5 h-3.5" />, label: 'Qaleriya' },
                        { id: 'url', icon: null, label: 'URL' },
                      ].map((t) => (
                        <button 
                          key={t.id} 
                          onClick={() => setImageMode(t.id as typeof imageMode)}
                          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs font-medium transition-all ${imageMode === t.id ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-900'}`}
                        >
                          {t.icon}{t.label}
                        </button>
                      ))}
                    </div>

                    {imageMode === 'upload' && (
                      <div 
                        onClick={() => !isSubmitting && fileRef.current?.click()}
                        className={`border-2 border-dashed border-gray-300 rounded-xl p-6 text-center transition-all ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-blue-500 hover:bg-blue-50'}`}
                      >
                        {isSubmitting ? <Loader2 className="w-8 h-8 text-gray-400 mx-auto mb-2 animate-spin" /> : <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />}
                        <p className="text-sm text-gray-500">Şəkil seçmək üçün klikləyin</p>
                        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} disabled={isSubmitting} />
                      </div>
                    )}

                    {imageMode === 'gallery' && (
                      <div className="grid grid-cols-2 gap-3">
                        {GALLERY_IMAGES.map((img) => (
                          <button 
                            key={img.id} 
                            onClick={() => handleGalleryPick(img.url)}
                            className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${form.image === img.url ? 'border-blue-600 shadow-md' : 'border-transparent hover:border-blue-400'}`}
                          >
                            <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                            {form.image === img.url && (
                              <div className="absolute inset-0 bg-blue-600/20 flex items-center justify-center">
                                <div className="bg-blue-600 text-white rounded-full p-1">
                                  <Plus className="w-4 h-4 rotate-45" />
                                </div>
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    )}

                    {imageMode === 'url' && (
                      <input 
                        type="url" 
                        value={urlInput} 
                        onChange={(e) => handleUrlInput(e.target.value)}
                        placeholder="https://..."
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500" 
                      />
                    )}

                    {previewUrl && (
                      <div className="mt-3 relative">
                        <img src={previewUrl} alt="preview" className="w-full h-40 sm:h-48 object-cover rounded-xl border border-gray-200" />
                        <button 
                          onClick={() => { setPreviewUrl(''); setForm((f) => ({ ...f, image: '' })); setUrlInput(''); }}
                          className="absolute top-2 right-2 p-1.5 bg-black/60 text-white rounded-full hover:bg-black/80"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Specs */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-2">Xüsusiyyətlər (Specs)</label>
                    <div className="flex flex-col sm:flex-row gap-2 mb-2">
                      <input 
                        value={specKey} 
                        onChange={(e) => setSpecKey(e.target.value)} 
                        placeholder="Nümunə: RAM"
                        className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" 
                      />
                      <input 
                        value={specVal} 
                        onChange={(e) => setSpecVal(e.target.value)} 
                        placeholder="Nümunə: 16GB"
                        className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500" 
                      />
                      <button onClick={addSpec} className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 sm:w-auto w-full flex items-center justify-center gap-1">
                        <Plus className="w-4 h-4" /> <span className="sm:hidden">Əlavə et</span>
                      </button>
                    </div>
                    <div className="space-y-2">
                      {Object.entries(form.specs).map(([k, v]) => (
                        <div key={k} className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-lg text-sm">
                          <div className="flex gap-2 overflow-hidden">
                            <span className="font-medium text-gray-900 truncate">{k}:</span>
                            <span className="text-gray-600 truncate">{v}</span>
                          </div>
                          <button onClick={() => removeSpec(k)} className="text-red-400 hover:text-red-600 ml-2 flex-shrink-0">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4 sticky bottom-0 bg-white pb-2 border-t border-gray-100">
                    <button 
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                      {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      {editId ? 'Yenilə' : 'Əlavə Et'}
                    </button>
                    
                    {editId && (
                      <button 
                        onClick={() => { setEditId(null); setForm(emptyProduct()); setPreviewUrl(''); setUrlInput(''); }}
                        className="py-3 px-4 text-sm text-gray-500 hover:text-gray-900 transition-colors border border-gray-200 rounded-xl"
                      >
                        Ləğv et
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Manage Products Tab - Scrollable */}
            {tab === 'manage-products' && (
              <div className="h-full overflow-y-auto p-4 sm:p-6 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900 text-base sm:text-lg">Məhsullar ({products.length})</h3>
                    <button 
                      onClick={() => setTab('add-product')}
                      className="sm:hidden flex items-center gap-1.5 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg"
                    >
                      <Plus className="w-4 h-4" /> Yeni
                    </button>
                  </div>
                  
                  {products.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-center bg-white rounded-xl border border-dashed border-gray-300 p-6">
                      <Package className="w-12 h-12 text-gray-300 mb-3" />
                      <p className="text-gray-500 text-sm">Məhsul yoxdur.</p>
                      <p className="text-gray-400 text-xs mt-1 mb-4">Yuxarıdakı "Nümunələri Yüklə" düyməsinə basın və ya yeni əlavə edin.</p>
                      <button 
                        onClick={() => setTab('add-product')}
                        className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
                      >
                        Məhsul Əlavə Et
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-3 pb-10">
                      {products.map((product) => (
                        <div key={product.id} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                          <img src={product.image} alt={product.name} className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg flex-shrink-0 bg-gray-100" />
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">{product.name}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{product.price} AZN · {allCategories.find(c => c.id === product.category)?.name}</p>
                            {product.badge && (
                              <span className="inline-block mt-1.5 text-[10px] px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full">
                                {product.badge}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            <button 
                              onClick={() => handleEdit(product)} 
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                              title="Redaktə et"
                            >
                              <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                            <button 
                              onClick={() => handleDelete(product.id)} 
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                              title="Sil"
                            >
                              <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Categories Tab */}
            {tab === 'categories' && (
              <div className="h-full overflow-y-auto p-4 sm:p-6 bg-gray-50">
                <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-6">
                  {/* Form */}
                  <div className="w-full lg:w-[360px] flex-shrink-0 bg-white rounded-xl border border-gray-200 p-5 h-fit">
                    <h3 className="font-semibold text-gray-900 text-base mb-4">Yeni Kateqoriya</h3>
                    {catSuccess && <div className="px-4 py-3 bg-green-50 text-green-700 rounded-xl text-sm font-medium mb-4">✓ {catSuccess}</div>}

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1.5">Kateqoriya adı *</label>
                        <input 
                          type="text" 
                          value={newCatName} 
                          onChange={(e) => setNewCatName(e.target.value)}
                          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500" 
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1.5">Unikal ID *</label>
                        <input 
                          type="text" 
                          value={newCatId} 
                          onChange={(e) => setNewCatId(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                          placeholder="masalan: yeni-kateqoriya"
                          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500" 
                        />
                      </div>
                      <button 
                        onClick={handleAddCategory} 
                        className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 text-sm"
                      >
                        <FolderPlus className="w-4 h-4" /> Əlavə Et
                      </button>
                    </div>
                  </div>

                  {/* List */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-base mb-4">Kateqoriyalar</h3>
                    <div className="space-y-2 pb-10">
                      {defaultCategories.map((cat) => (
                        <div key={cat.id} className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-gray-200">
                          <Tag className="w-4 h-4 text-gray-400" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{cat.name}</p>
                            <p className="text-xs text-gray-500">ID: {cat.id}</p>
                          </div>
                          <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-600">Standart</span>
                        </div>
                      ))}
                      {customCategories.map((cat) => (
                        <div key={cat.id} className="flex items-center gap-3 px-4 py-3 bg-blue-50 rounded-xl border border-blue-200">
                          <Tag className="w-4 h-4 text-blue-600" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{cat.name}</p>
                            <p className="text-xs text-gray-500">ID: {cat.id}</p>
                          </div>
                          <button 
                            onClick={() => handleDeleteCategory(cat.id)} 
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}