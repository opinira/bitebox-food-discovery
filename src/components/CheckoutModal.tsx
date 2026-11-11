import React, { useState } from 'react';
import { X, CheckCircle, Clock, MapPin, Sparkles, ChefHat, Bike } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { useModal } from '../context/ModalContext';
import { useCart } from '../context/CartContext';

export const CheckoutModal: React.FC = () => {
  const { isOrderSuccessModalOpen, closeOrderSuccessModal } = useModal();
  const { totals, clearCart } = useCart();

  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    name: 'Alexandra Vance',
    address: '742 Evergreen Terrace, Apt 4B',
    phone: '+1 (555) 019-2834',
    instructions: 'Leave with doorman please',
    paymentMethod: 'apple-pay',
  });
  const [orderId, setOrderId] = useState('');

  if (!isOrderSuccessModalOpen) return null;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `BB-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setStep('success');

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#E96B36', '#F7F3EB', '#171A19', '#D9C9AF'],
      });
    } catch {
      // safe fallback
    }

    clearCart();
  };

  const handleClose = () => {
    setStep('form');
    closeOrderSuccessModal();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-charcoal/70 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-xl bg-white rounded-3xl shadow-elevated overflow-hidden z-10 my-8 border border-ivory-darker"
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            aria-label="Close checkout"
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-ivory text-charcoal hover:bg-ivory-darker flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {step === 'form' ? (
            <div className="p-6 sm:p-8">
              <div className="mb-6">
                <span className="text-xs font-semibold text-orange-brand uppercase tracking-wider block mb-1">
                  DEMO ORDER EXPERIENCE
                </span>
                <h3 className="font-display text-2xl font-bold text-charcoal">
                  Complete Your Order
                </h3>
                <p className="text-xs text-subtext mt-1">
                  Review your delivery destination and confirm order placement.
                </p>
              </div>

              <form onSubmit={handlePlaceOrder} className="space-y-4">
                {/* Contact & Address Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-charcoal font-semibold mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-ivory-warm border border-ivory-darker rounded-xl px-3.5 py-2.5 text-charcoal focus:outline-none focus:border-orange-brand"
                    />
                  </div>
                  <div>
                    <label className="block text-charcoal font-semibold mb-1">Phone Number</label>
                    <input
                      type="text"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-ivory-warm border border-ivory-darker rounded-xl px-3.5 py-2.5 text-charcoal focus:outline-none focus:border-orange-brand"
                    />
                  </div>
                </div>

                <div className="text-xs">
                  <label className="block text-charcoal font-semibold mb-1">Delivery Address</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-ivory-warm border border-ivory-darker rounded-xl px-3.5 py-2.5 text-charcoal focus:outline-none focus:border-orange-brand"
                  />
                </div>

                <div className="text-xs">
                  <label className="block text-charcoal font-semibold mb-1">Delivery Instructions (Optional)</label>
                  <input
                    type="text"
                    value={formData.instructions}
                    onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                    className="w-full bg-ivory-warm border border-ivory-darker rounded-xl px-3.5 py-2.5 text-charcoal focus:outline-none focus:border-orange-brand"
                  />
                </div>

                {/* Payment Selection */}
                <div className="text-xs pt-1">
                  <label className="block text-charcoal font-semibold mb-2">Simulated Payment Method</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'apple-pay', label: 'Apple Pay' },
                      { id: 'card', label: 'Credit Card' },
                      { id: 'cash', label: 'Pay on Arrival' },
                    ].map((pm) => (
                      <button
                        key={pm.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, paymentMethod: pm.id })}
                        className={`py-2 px-3 rounded-xl border text-center transition-all ${
                          formData.paymentMethod === pm.id
                            ? 'border-orange-brand bg-orange-subtle text-orange-brand font-bold'
                            : 'border-ivory-darker bg-ivory-warm text-subtext hover:border-ivory-darker'
                        }`}
                      >
                        {pm.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Summary Box */}
                <div className="p-4 rounded-2xl bg-ivory border border-ivory-darker space-y-1.5 text-xs text-subtext mt-4">
                  <div className="flex justify-between">
                    <span>Items Total ({totals.itemCount} items)</span>
                    <span className="font-semibold text-charcoal">${totals.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span className="font-semibold text-charcoal">
                      {totals.deliveryFee === 0 ? 'FREE' : `$${totals.deliveryFee.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Tax</span>
                    <span className="font-semibold text-charcoal">${totals.tax.toFixed(2)}</span>
                  </div>
                  <div className="pt-2 border-t border-ivory-darker flex justify-between text-sm font-bold text-charcoal">
                    <span>Grand Total</span>
                    <span className="font-display text-base text-charcoal">
                      ${totals.grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  className="w-full mt-4 py-3.5 px-6 rounded-2xl bg-orange-brand hover:bg-orange-hover text-white font-semibold text-sm shadow-soft transition-all active:scale-95"
                >
                  Place Demo Order (${totals.grandTotal.toFixed(2)})
                </button>
                <p className="text-[11px] text-center text-subtext">
                  * Simulation only — no actual card charges or payment gateway involved.
                </p>
              </form>
            </div>
          ) : (
            /* Order Success View */
            <div className="p-6 sm:p-10 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle className="w-9 h-9 stroke-[2.2]" />
              </div>

              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-semibold mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  Order Placed Successfully
                </span>
                <h3 className="font-display text-3xl font-bold text-charcoal">
                  Thank You, {formData.name}!
                </h3>
                <p className="text-xs text-subtext mt-1">
                  Order Number: <strong className="text-charcoal font-mono">{orderId}</strong>
                </p>
              </div>

              {/* Progress Stepper */}
              <div className="p-5 rounded-2xl bg-ivory-warm border border-ivory-darker text-left space-y-4">
                <div className="flex items-center justify-between text-xs text-subtext pb-2 border-b border-ivory-darker">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-orange-brand" />
                    Estimated Arrival: <strong>25–35 min</strong>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-orange-brand" />
                    {formData.address}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center mb-1 text-xs font-bold">
                      ✓
                    </div>
                    <span className="font-semibold text-charcoal text-[11px]">Confirmed</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-orange-brand text-white flex items-center justify-center mb-1 text-xs">
                      <ChefHat className="w-4 h-4" />
                    </div>
                    <span className="font-semibold text-charcoal text-[11px]">In Kitchen</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-ivory-darker text-subtext flex items-center justify-center mb-1 text-xs">
                      <Bike className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-subtext text-[11px]">Courier Pickup</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full py-3.5 px-6 rounded-2xl bg-charcoal text-white font-semibold text-sm hover:bg-charcoal-light shadow-soft transition-all active:scale-95"
                >
                  Continue Browsing BiteBox
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
