import React, { useState, useEffect } from 'react';
import { X, Star, Clock, Flame, Minus, Plus, ShoppingBag, Heart, ShieldAlert, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useModal } from '../context/ModalContext';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';

export const FoodDetailsModal: React.FC = () => {
  const { activeFood, closeFoodModal } = useModal();
  const { addToCart } = useCart();
  const { isFoodFavorite, toggleFoodFavorite } = useFavorites();

  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    setQuantity(1);
    setJustAdded(false);
  }, [activeFood]);

  if (!activeFood) return null;

  const isFav = isFoodFavorite(activeFood.id);
  const totalPrice = activeFood.price * quantity;

  const handleAddToCart = () => {
    addToCart(activeFood, quantity);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      closeFoodModal();
    }, 800);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeFoodModal}
          className="fixed inset-0 bg-charcoal/70 backdrop-blur-sm transition-opacity"
        />

        {/* Modal Dialog Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-white rounded-3xl sm:rounded-4xl shadow-elevated overflow-hidden z-10 my-8 flex flex-col md:flex-row max-h-[90vh]"
        >
          {/* Close Button */}
          <button
            onClick={closeFoodModal}
            aria-label="Close dialog"
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md text-charcoal hover:bg-white flex items-center justify-center shadow-soft transition-transform active:scale-90"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left / Top Side: Large Food Image */}
          <div className="relative md:w-1/2 aspect-square md:aspect-auto bg-charcoal shrink-0 overflow-hidden">
            <img
              src={activeFood.image}
              alt={activeFood.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent md:hidden" />

            {/* Favorite Toggle Floating Button */}
            <button
              onClick={() => toggleFoodFavorite(activeFood.id)}
              aria-label="Toggle Favorite"
              className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-charcoal shadow-soft hover:scale-105 active:scale-95 transition-all"
            >
              <Heart
                className={`w-5 h-5 ${
                  isFav ? 'fill-orange-brand text-orange-brand' : 'text-charcoal'
                }`}
              />
            </button>

            {/* Category tag */}
            <div className="absolute bottom-4 left-4 hidden md:flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-xs font-bold text-charcoal shadow-sm">
                {activeFood.category}
              </span>
              <span className="px-3 py-1 rounded-full bg-charcoal/80 backdrop-blur-md text-xs font-medium text-white shadow-sm">
                {activeFood.restaurantName}
              </span>
            </div>
          </div>

          {/* Right / Bottom Side: Food Information & Interactive Ordering */}
          <div className="p-6 sm:p-8 md:w-1/2 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-5">
              {/* Header Info */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-semibold text-orange-brand tracking-wider uppercase">
                    {activeFood.restaurantName}
                  </span>
                  <div className="flex items-center gap-1.5 bg-ivory px-2.5 py-1 rounded-lg border border-ivory-darker">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-bold text-charcoal">
                      {activeFood.rating.toFixed(1)}
                    </span>
                    <span className="text-[11px] text-subtext">({activeFood.reviewCount} reviews)</span>
                  </div>
                </div>

                <h2 className="font-display text-2xl sm:text-3xl font-bold text-charcoal leading-tight">
                  {activeFood.name}
                </h2>

                <div className="flex items-baseline gap-2 mt-2">
                  <span className="font-display text-2xl font-bold text-charcoal">
                    ${activeFood.price.toFixed(2)}
                  </span>
                  <span className="text-xs text-subtext">/ standard portion</span>
                </div>
              </div>

              {/* Badges Bar: Time & Calories */}
              <div className="flex flex-wrap items-center gap-3 py-2 border-y border-ivory-darker/60 text-xs text-subtext">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-orange-brand" />
                  <span>Prep: {activeFood.prepTime}</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-ivory-darker" />
                <div className="flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-orange-brand" />
                  <span>{activeFood.calories} kcal</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-ivory-darker" />
                <span className={activeFood.isVegetarian ? 'text-green-600 font-medium' : ''}>
                  {activeFood.isVegetarian ? 'Vegetarian' : 'Non-Vegetarian'}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-subtext leading-relaxed">
                {activeFood.description}
              </p>

              {/* Ingredients List */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal mb-2">
                  Key Ingredients & Craft
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeFood.ingredients.map((ing, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-ivory border border-ivory-darker text-[11px] text-charcoal font-medium"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Dietary & Allergens */}
              {(activeFood.dietary.length > 0 || (activeFood.allergens && activeFood.allergens.length > 0)) && (
                <div className="p-3 rounded-xl bg-ivory-warm border border-ivory-darker space-y-1.5 text-xs">
                  <div className="flex items-center gap-1.5 font-semibold text-charcoal">
                    <ShieldAlert className="w-3.5 h-3.5 text-orange-brand" />
                    <span>Dietary & Allergens</span>
                  </div>
                  <p className="text-[11px] text-subtext">
                    Tags: {activeFood.dietary.join(' • ')}
                  </p>
                  {activeFood.allergens && activeFood.allergens.length > 0 && (
                    <p className="text-[11px] text-subtext">
                      Contains: <strong className="text-charcoal">{activeFood.allergens.join(', ')}</strong>
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Actions: Quantity Selector & Add to Cart */}
            <div className="pt-6 mt-6 border-t border-ivory-darker/80 flex flex-col sm:flex-row items-center gap-4">
              {/* Quantity Selector */}
              <div className="flex items-center justify-between border border-ivory-darker rounded-2xl bg-ivory-warm p-1.5 w-full sm:w-auto shrink-0">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                  className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-charcoal hover:bg-ivory disabled:opacity-40 transition-colors shadow-card"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-bold text-sm text-charcoal">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-charcoal hover:bg-ivory transition-colors shadow-card"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart Button with Calculated Price */}
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={justAdded}
                className={`w-full flex-grow py-3.5 px-6 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 shadow-soft transition-all duration-200 active:scale-95 ${
                  justAdded
                    ? 'bg-green-600 text-white'
                    : 'bg-orange-brand hover:bg-orange-hover text-white'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4 stroke-[2.5]" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add {quantity} to Order • ${totalPrice.toFixed(2)}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
