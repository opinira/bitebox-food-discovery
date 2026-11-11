import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Trash2, Minus, Plus, ShoppingBag, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useModal } from '../context/ModalContext';

export const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, clearCart, totals } = useCart();
  const { openOrderSuccessModal } = useModal();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setIsCartOpen(false);
    openOrderSuccessModal();
  };

  const handleExplore = () => {
    setIsCartOpen(false);
    navigate('/menu');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartOpen(false)}
          className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm transition-opacity"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="w-screen max-w-md bg-white shadow-elevated flex flex-col border-l border-ivory-darker"
          >
            {/* Drawer Header */}
            <div className="p-5 sm:p-6 border-b border-ivory-darker bg-ivory flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-charcoal flex items-center justify-center text-orange-brand">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold text-charcoal">Your Order</h2>
                  <span className="text-xs text-subtext">
                    {totals.itemCount} {totals.itemCount === 1 ? 'item' : 'items'} selected
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {cart.length > 0 && (
                  <button
                    onClick={clearCart}
                    title="Clear Cart"
                    className="p-2 text-subtext hover:text-red-600 rounded-lg hover:bg-white transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => setIsCartOpen(false)}
                  aria-label="Close cart"
                  className="p-2 text-charcoal hover:bg-white rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Free Delivery Banner Progress */}
            {cart.length > 0 && (
              <div className="px-5 py-3 bg-orange-subtle border-b border-orange-brand/10 text-xs">
                {totals.isFreeDelivery ? (
                  <div className="flex items-center gap-2 text-green-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-green-600" />
                    <span>Complimentary Priority Delivery Unlocked!</span>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-between text-charcoal mb-1.5 font-medium">
                      <span>Add <strong>${totals.amountNeededForFreeDelivery.toFixed(2)}</strong> more for Free Delivery</span>
                      <span className="text-orange-brand font-bold">
                        {Math.round((totals.subtotal / 40) * 100)}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-orange-brand/20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-orange-brand rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(100, (totals.subtotal / 40) * 100)}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Cart Items List or Empty State */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="w-20 h-20 rounded-full bg-ivory flex items-center justify-center text-subtext border border-ivory-darker">
                    <ShoppingBag className="w-8 h-8 opacity-40" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-charcoal mb-1">
                      Your box is empty
                    </h3>
                    <p className="text-xs text-subtext max-w-xs leading-relaxed">
                      Explore top restaurants and hand-crafted dishes to start curating your meal.
                    </p>
                  </div>
                  <button
                    onClick={handleExplore}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-orange-brand text-white text-xs font-semibold hover:bg-orange-hover shadow-soft transition-all active:scale-95"
                  >
                    <span>Explore Food</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.food.id}
                    className="flex gap-4 p-3.5 rounded-2xl bg-ivory-warm border border-ivory-darker/60 hover:border-ivory-darker transition-colors"
                  >
                    {/* Thumbnail */}
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-charcoal shrink-0">
                      <img
                        src={item.food.image}
                        alt={item.food.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div className="flex items-start justify-between gap-1">
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-charcoal truncate">
                            {item.food.name}
                          </h4>
                          <span className="text-[10px] text-subtext block">
                            {item.food.restaurantName}
                          </span>
                        </div>
                        <span className="text-xs font-bold text-charcoal shrink-0">
                          ${(item.food.price * item.quantity).toFixed(2)}
                        </span>
                      </div>

                      {/* Quantity Controls & Remove */}
                      <div className="flex items-center justify-between mt-2 pt-1">
                        <div className="flex items-center gap-2 bg-white rounded-lg border border-ivory-darker px-1.5 py-0.5">
                          <button
                            onClick={() => updateQuantity(item.food.id, item.quantity - 1)}
                            className="p-1 text-charcoal hover:text-orange-brand transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-charcoal w-5 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.food.id, item.quantity + 1)}
                            className="p-1 text-charcoal hover:text-orange-brand transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.food.id)}
                          className="text-[11px] text-subtext hover:text-red-600 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Drawer Footer with Calculations & Checkout */}
            {cart.length > 0 && (
              <div className="p-5 sm:p-6 bg-ivory border-t border-ivory-darker space-y-4">
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-subtext">
                    <span>Subtotal</span>
                    <span className="font-medium text-charcoal">${totals.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-subtext">
                    <span>Delivery Fee</span>
                    <span>
                      {totals.deliveryFee === 0 ? (
                        <span className="text-green-600 font-semibold uppercase text-[10px]">FREE</span>
                      ) : (
                        `$${totals.deliveryFee.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-subtext">
                    <span>Estimated Tax (8.875%)</span>
                    <span className="font-medium text-charcoal">${totals.tax.toFixed(2)}</span>
                  </div>
                  <div className="pt-2 border-t border-ivory-darker flex justify-between text-sm font-bold text-charcoal">
                    <span>Grand Total</span>
                    <span className="text-base text-charcoal font-display">
                      ${totals.grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 pt-1">
                  <button
                    onClick={handleCheckout}
                    className="w-full py-3.5 px-6 rounded-2xl bg-orange-brand hover:bg-orange-hover text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-soft transition-all duration-200 active:scale-95"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="w-full py-2.5 text-xs font-semibold text-subtext hover:text-charcoal transition-colors text-center"
                  >
                    Continue Exploring
                  </button>
                </div>
              </div>
            )}
          </motion.aside>
        </div>
      </div>
    </AnimatePresence>
  );
};
