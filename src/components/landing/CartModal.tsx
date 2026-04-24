import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingBag } from 'lucide-react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
}

export default function CartModal({ isOpen, onClose, items, onRemove }: CartModalProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[70] bg-black/50"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 z-[80] w-full max-w-md bg-card shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="font-heading font-bold text-lg text-primary flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Səbət ({items.length})
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-background rounded-lg transition-colors">
                <X className="w-5 h-5 text-muted" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-12 h-12 text-muted/30 mb-3" />
                  <p className="text-muted">Səbətiniz boşdur.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 p-3 bg-background rounded-xl border border-border">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg bg-gray-100" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-primary text-sm truncate">{item.name}</p>
                        <p className="text-xs text-muted">{item.quantity} ədəd × {item.price} AZN</p>
                        <p className="text-sm font-bold text-secondary mt-1">{item.price * item.quantity} AZN</p>
                      </div>
                      <button onClick={() => onRemove(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-4 border-t border-border bg-card">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-medium text-primary">Ümumi:</span>
                  <span className="text-xl font-bold text-secondary">{total} AZN</span>
                </div>
                <a
                  href={`https://wa.me/994504926834?text=${encodeURIComponent(`Salam, ProfiTech saytından sifariş vermək istəyirəm:\n${items.map(i => `- ${i.name} (${i.quantity} ədəd) - ${i.price * i.quantity} AZN`).join('\n')}\n\nÜmumi: ${total} AZN`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 bg-accent text-white font-bold text-center rounded-xl hover:bg-accent/90 transition-colors"
                >
                  WhatsApp ilə Sifariş Ver
                </a>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
