import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Trash2 } from 'lucide-react';

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

const WHATSAPP_NUMBER = '994504926834';

export default function CartModal({ isOpen, onClose, items, onRemove }: CartModalProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleConfirm = () => {
    if (items.length === 0) return;
    const lines = items
      .map((item) =>
        item.quantity > 1
          ? `- ${item.name} x${item.quantity} (${item.price * item.quantity} AZN)`
          : `- ${item.name} (${item.price} AZN)`
      )
      .join('\n');
    const message = `Salam, sifariş vermək istəyirəm:\n${lines}\n\nÜmumi: ${total} AZN`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="relative z-10 w-full sm:max-w-md bg-card rounded-t-2xl sm:rounded-2xl shadow-2xl border border-border flex flex-col"
            style={{ maxHeight: '85vh' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border flex-shrink-0">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-secondary" />
                <h2 className="font-heading font-bold text-primary text-base">Səbət</h2>
                {items.length > 0 && (
                  <span className="px-2 py-0.5 bg-secondary text-white text-xs font-semibold rounded-full">
                    {items.reduce((s, i) => s + i.quantity, 0)}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-1.5 text-muted hover:text-primary hover:bg-background rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <ShoppingCart className="w-12 h-12 text-muted mb-3 opacity-40" />
                  <p className="text-muted text-sm">Səbət boşdur</p>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-3 bg-background rounded-xl border border-border"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-11 object-cover rounded-lg flex-shrink-0 bg-white"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-primary text-sm truncate">
                        {item.name}
                        {item.quantity > 1 && (
                          <span className="ml-1 text-muted font-normal">×{item.quantity}</span>
                        )}
                      </p>
                      <p className="text-secondary font-bold text-sm mt-0.5">
                        {item.price * item.quantity} AZN
                      </p>
                    </div>
                    <button
                      onClick={() => onRemove(item.id)}
                      className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                      title="Sil"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-5 py-4 border-t border-border flex-shrink-0 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted text-sm font-medium">Ümumi qiymət:</span>
                  <span className="font-heading font-bold text-primary text-lg">{total} AZN</span>
                </div>
                <button
                  onClick={handleConfirm}
                  className="w-full py-3 bg-accent text-white font-semibold rounded-xl hover:bg-accent/90 transition-colors text-sm"
                >
                  Sifarişi Təsdiqlə
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
