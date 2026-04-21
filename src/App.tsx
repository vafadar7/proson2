
import { useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/landing/Navbar';
import Hero from './components/landing/Hero';
import LogoCloud from './components/landing/LogoCloud';
import ProductsSection from './components/landing/ProductsSection';
import Features from './components/landing/Features';
import HowItWorks from './components/landing/HowItWorks';
import Pricing from './components/landing/Pricing';
import Footer from './components/landing/Footer';
import AdminPanel from './components/landing/AdminPanel';
import CartModal, { type CartItem } from './components/landing/CartModal';
import ProductDetail from './components/landing/ProductDetail';
import type { Product } from './data/products';

// Ana səhifə komponenti
function HomePage({ 
  onAddToCart, 
  externalCategory, 
  onExternalCategoryConsumed 
}: { 
  onAddToCart: (product: Product) => void;
  externalCategory: string | null;
  onExternalCategoryConsumed: () => void;
}) {
  return (
    <main>
      <Hero />
      <LogoCloud />
      <ProductsSection
        onAddToCart={onAddToCart}
        externalCategory={externalCategory}
        onExternalCategoryConsumed={onExternalCategoryConsumed}
      />
      <Features />
      <HowItWorks />
      <Pricing />
    </main>
  );
}

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const cartCount = cartItems.reduce((s, i) => s + i.quantity, 0);

  const handleAddToCart = useCallback((product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
        },
      ];
    });
    setShowCart(true); // Avtomatik səbəti aç
  }, []);

  const handleRemoveFromCart = useCallback((id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const handleCategorySelect = useCallback((categoryId: string) => {
    setActiveCategory(categoryId);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <Navbar
          cartCount={cartCount}
          onCartClick={() => setShowCart(true)}
          onCategorySelect={handleCategorySelect}
        />
        
        <Routes>
          <Route 
            path="/" 
            element={
              <HomePage 
                onAddToCart={handleAddToCart}
                externalCategory={activeCategory}
                onExternalCategoryConsumed={() => setActiveCategory(null)}
              />
            } 
          />
          <Route 
            path="/product/:id" 
            element={
              <ProductDetail 
                onAddToCart={handleAddToCart}
                cartCount={cartCount}
                onCartClick={() => setShowCart(true)}
              />
            } 
          />
        </Routes>

        <Footer onAdminClick={() => setShowAdmin(true)} />
        
        {showAdmin && <AdminPanel onClose={() => setShowAdmin(false)} />}
        
        <CartModal
          isOpen={showCart}
          onClose={() => setShowCart(false)}
          items={cartItems}
          onRemove={handleRemoveFromCart}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;