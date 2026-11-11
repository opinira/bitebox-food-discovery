import React, { useState } from 'react';
import { Star, Clock, Heart, Plus, Check } from 'lucide-react';
import { FoodItem } from '../types';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useModal } from '../context/ModalContext';

interface FoodCardProps {
  food: FoodItem;
}

export const FoodCard: React.FC<FoodCardProps> = ({ food }) => {
  const { addToCart } = useCart();
  const { isFoodFavorite, toggleFoodFavorite } = useFavorites();
  const { openFoodModal } = useModal();
  const [justAdded, setJustAdded] = useState(false);

  const isFav = isFoodFavorite(food.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(food, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFoodFavorite(food.id);
  };

  return (
    <article
      onClick={() => openFoodModal(food)}
      className="group bg-white rounded-3xl overflow-hidden border border-ivory-darker shadow-card hover:shadow-elevated transition-all duration-300 flex flex-col cursor-pointer relative h-full"
    >
      {/* 1:1 Square Image Area */}
      <div className="relative aspect-square overflow-hidden bg-charcoal">
        <img
          src={food.image}
          alt={food.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />

        {/* Category Badge & Special */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] font-bold tracking-wider uppercase text-charcoal shadow-sm">
            {food.category}
          </span>
          {food.isChefSpecial && (
            <span className="px-2 py-0.5 rounded-full bg-orange-brand text-white text-[9px] font-extrabold tracking-wider uppercase shadow-sm">
              Chef's Pick
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          aria-label={isFav ? `Remove ${food.name} from favorites` : `Add ${food.name} to favorites`}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-charcoal hover:scale-110 active:scale-90 transition-all shadow-sm"
        >
          <Heart
            className={`w-3.5 h-3.5 transition-colors ${
              isFav ? 'fill-orange-brand text-orange-brand' : 'text-charcoal'
            }`}
          />
        </button>

        {/* Prep Time pill overlay */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-charcoal/70 backdrop-blur-md text-[10px] font-medium text-white">
          <Clock className="w-3 h-3 text-orange-brand" />
          <span>{food.prepTime}</span>
        </div>
      </div>

      {/* Content Info */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between">
        <div>
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[11px] font-medium text-subtext truncate">
              {food.restaurantName}
            </span>
            <div className="flex items-center gap-1 shrink-0">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="text-xs font-bold text-charcoal">{food.rating.toFixed(1)}</span>
            </div>
          </div>

          <h3 className="font-display text-base sm:text-lg font-bold text-charcoal group-hover:text-orange-brand transition-colors line-clamp-1 mb-1.5">
            {food.name}
          </h3>

          <p className="text-xs text-subtext line-clamp-2 leading-relaxed mb-4">
            {food.description}
          </p>
        </div>

        {/* Price & Add to Cart button */}
        <div className="pt-3 border-t border-ivory-darker/60 flex items-center justify-between">
          <div>
            <span className="text-xs text-subtext block -mb-0.5">Price</span>
            <span className="font-display text-lg font-bold text-charcoal">
              ${food.price.toFixed(2)}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            aria-label={`Add ${food.name} to cart`}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 active:scale-95 shadow-sm ${
              justAdded
                ? 'bg-green-600 text-white'
                : 'bg-orange-brand hover:bg-orange-hover text-white'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
