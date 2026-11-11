import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, Heart, ArrowUpRight } from 'lucide-react';
import { Restaurant } from '../types';
import { useFavorites } from '../context/FavoritesContext';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  const { isRestaurantFavorite, toggleRestaurantFavorite } = useFavorites();
  const isFav = isRestaurantFavorite(restaurant.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleRestaurantFavorite(restaurant.id);
  };

  return (
    <article className="group bg-white rounded-3xl overflow-hidden border border-ivory-darker shadow-card hover:shadow-elevated transition-all duration-300 flex flex-col h-full">
      {/* Image Area with Zoom */}
      <Link
        to={`/restaurants/${restaurant.id}`}
        className="relative block aspect-[16/10] overflow-hidden bg-charcoal"
      >
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          aria-label={isFav ? `Remove ${restaurant.name} from favorites` : `Add ${restaurant.name} to favorites`}
          className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-charcoal hover:scale-110 active:scale-90 transition-all shadow-sm"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFav ? 'fill-orange-brand text-orange-brand' : 'text-charcoal'
            }`}
          />
        </button>

        {/* Cuisine & Price Badge */}
        <div className="absolute bottom-3 left-3.5 flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-semibold text-charcoal shadow-sm">
            {restaurant.cuisine}
          </span>
          <span className="px-2 py-1 rounded-full bg-charcoal/80 backdrop-blur-md text-[11px] font-semibold text-white tracking-widest shadow-sm">
            {restaurant.priceRange}
          </span>
        </div>
      </Link>

      {/* Content Area */}
      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <Link
              to={`/restaurants/${restaurant.id}`}
              className="font-display text-xl font-bold text-charcoal hover:text-orange-brand transition-colors"
            >
              {restaurant.name}
            </Link>
            <div className="flex items-center gap-1 bg-ivory-warm px-2 py-0.5 rounded-md border border-ivory-darker shrink-0">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-xs font-bold text-charcoal">{restaurant.rating.toFixed(1)}</span>
              <span className="text-[10px] text-subtext">({restaurant.reviewCount})</span>
            </div>
          </div>

          <p className="text-xs text-subtext line-clamp-2 leading-relaxed mb-4">
            {restaurant.tagline}
          </p>
        </div>

        <div className="pt-3 border-t border-ivory-darker/60 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-subtext">
            <Clock className="w-3.5 h-3.5 text-orange-brand" />
            <span>{restaurant.prepTime}</span>
          </div>

          <Link
            to={`/restaurants/${restaurant.id}`}
            className="inline-flex items-center gap-1 text-xs font-bold text-orange-brand hover:text-orange-hover transition-colors group/link"
          >
            <span>View Restaurant</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
};
