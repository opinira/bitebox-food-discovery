import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Utensils, Store, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { foods } from '../data/foods';
import { restaurants } from '../data/restaurants';
import { useModal } from '../context/ModalContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { openFoodModal } = useModal();

  useEffect(() => {
    if (isOpen) {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredFoods = query.trim()
    ? foods.filter(
        (f) =>
          f.name.toLowerCase().includes(query.toLowerCase()) ||
          f.category.toLowerCase().includes(query.toLowerCase()) ||
          f.restaurantName.toLowerCase().includes(query.toLowerCase()) ||
          f.ingredients.some((ing) => ing.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 5)
    : [];

  const filteredRestaurants = query.trim()
    ? restaurants.filter(
        (r) =>
          r.name.toLowerCase().includes(query.toLowerCase()) ||
          r.cuisine.toLowerCase().includes(query.toLowerCase()) ||
          r.description.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 3)
    : [];

  const handleSelectFood = (food: typeof foods[0]) => {
    onClose();
    openFoodModal(food);
  };

  const handleSelectRestaurant = (restaurantId: string) => {
    onClose();
    navigate(`/restaurants/${restaurantId}`);
  };

  const handleViewAllResults = () => {
    onClose();
    navigate(`/menu?search=${encodeURIComponent(query.trim())}`);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-charcoal/70 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-elevated border border-ivory-darker overflow-hidden z-10"
        >
          {/* Search Input Bar */}
          <div className="p-4 sm:p-5 border-b border-ivory-darker flex items-center gap-3">
            <Search className="w-5 h-5 text-subtext shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search burgers, pasta, kitchens, or ingredients..."
              className="w-full bg-transparent text-base sm:text-lg text-charcoal placeholder-subtext focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1.5 text-subtext hover:text-charcoal rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-ivory text-subtext hover:text-charcoal"
            >
              ESC
            </button>
          </div>

          {/* Quick Suggestions or Results */}
          <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 space-y-6">
            {!query.trim() ? (
              <div className="space-y-4">
                <span className="text-xs font-bold text-subtext tracking-wider uppercase block">
                  Trending Cravings
                </span>
                <div className="flex flex-wrap gap-2">
                  {['Smash Burger', 'Truffle Pasta', 'Neapolitan Pizza', 'Korean Fried Chicken', 'Salmon Bowl', 'Lava Cake'].map((item) => (
                    <button
                      key={item}
                      onClick={() => setQuery(item)}
                      className="px-3 py-1.5 rounded-xl bg-ivory hover:bg-orange-subtle hover:text-orange-brand border border-ivory-darker text-xs font-medium text-charcoal transition-colors"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            ) : filteredFoods.length === 0 && filteredRestaurants.length === 0 ? (
              <div className="text-center py-8 text-subtext">
                <p className="text-sm">No results found for "{query}"</p>
                <p className="text-xs mt-1 text-subtext/70">
                  Try searching for "burger", "pasta", "pizza", or "seafood".
                </p>
              </div>
            ) : (
              <>
                {/* Food Results */}
                {filteredFoods.length > 0 && (
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2 text-xs font-bold text-subtext uppercase tracking-wider">
                      <Utensils className="w-3.5 h-3.5 text-orange-brand" />
                      <span>Dishes</span>
                    </div>
                    <div className="space-y-1.5">
                      {filteredFoods.map((food) => (
                        <div
                          key={food.id}
                          onClick={() => handleSelectFood(food)}
                          className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-ivory transition-colors cursor-pointer group"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={food.image}
                              alt={food.name}
                              className="w-12 h-12 rounded-xl object-cover bg-charcoal"
                            />
                            <div>
                              <h4 className="text-sm font-bold text-charcoal group-hover:text-orange-brand transition-colors">
                                {food.name}
                              </h4>
                              <span className="text-xs text-subtext">
                                {food.restaurantName} • {food.category}
                              </span>
                            </div>
                          </div>
                          <span className="text-sm font-bold text-charcoal">
                            ${food.price.toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Restaurant Results */}
                {filteredRestaurants.length > 0 && (
                  <div className="space-y-2.5 pt-2 border-t border-ivory-darker">
                    <div className="flex items-center gap-2 text-xs font-bold text-subtext uppercase tracking-wider">
                      <Store className="w-3.5 h-3.5 text-orange-brand" />
                      <span>Restaurants</span>
                    </div>
                    <div className="space-y-1.5">
                      {filteredRestaurants.map((res) => (
                        <div
                          key={res.id}
                          onClick={() => handleSelectRestaurant(res.id)}
                          className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-ivory transition-colors cursor-pointer group"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={res.image}
                              alt={res.name}
                              className="w-12 h-12 rounded-xl object-cover bg-charcoal"
                            />
                            <div>
                              <h4 className="text-sm font-bold text-charcoal group-hover:text-orange-brand transition-colors">
                                {res.name}
                              </h4>
                              <span className="text-xs text-subtext">
                                {res.cuisine} • {res.prepTime}
                              </span>
                            </div>
                          </div>
                          <span className="text-xs font-semibold text-orange-brand flex items-center gap-1">
                            Visit Kitchen <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-2">
                  <button
                    onClick={handleViewAllResults}
                    className="w-full py-2.5 rounded-xl bg-ivory text-charcoal hover:bg-orange-brand hover:text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>View all results for "{query}"</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
