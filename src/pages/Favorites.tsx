import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Utensils, Store } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { foods } from '../data/foods';
import { restaurants } from '../data/restaurants';
import { FoodCard } from '../components/FoodCard';
import { RestaurantCard } from '../components/RestaurantCard';

export const Favorites: React.FC = () => {
  const { favoriteFoodIds, favoriteRestaurantIds, totalFavoritesCount } = useFavorites();
  const [activeTab, setActiveTab] = useState<'all' | 'foods' | 'restaurants'>('all');

  const savedFoods = foods.filter((f) => favoriteFoodIds.includes(f.id));
  const savedRestaurants = restaurants.filter((r) => favoriteRestaurantIds.includes(r.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      {/* Title */}
      <div className="text-center max-w-xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-subtle border border-orange-brand/20 text-orange-brand text-xs font-semibold uppercase tracking-wider mb-2">
          <Heart className="w-3.5 h-3.5 fill-orange-brand" />
          <span>SAVED COLLECTION</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-charcoal">
          Your Favorites
        </h1>
        <p className="text-sm text-subtext mt-2">
          Personal wishlist of your preferred dishes and partner restaurants.
        </p>
      </div>

      {/* Tabs */}
      {totalFavoritesCount > 0 && (
        <div className="flex justify-center">
          <div className="inline-flex items-center bg-white border border-ivory-darker rounded-2xl p-1 shadow-card text-xs">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl font-medium transition-colors ${
                activeTab === 'all'
                  ? 'bg-charcoal text-white'
                  : 'text-subtext hover:text-charcoal'
              }`}
            >
              All Items ({totalFavoritesCount})
            </button>
            <button
              onClick={() => setActiveTab('foods')}
              className={`px-4 py-2 rounded-xl font-medium transition-colors ${
                activeTab === 'foods'
                  ? 'bg-charcoal text-white'
                  : 'text-subtext hover:text-charcoal'
              }`}
            >
              Dishes ({savedFoods.length})
            </button>
            <button
              onClick={() => setActiveTab('restaurants')}
              className={`px-4 py-2 rounded-xl font-medium transition-colors ${
                activeTab === 'restaurants'
                  ? 'bg-charcoal text-white'
                  : 'text-subtext hover:text-charcoal'
              }`}
            >
              Restaurants ({savedRestaurants.length})
            </button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {totalFavoritesCount === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-ivory-darker shadow-card space-y-4 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-ivory flex items-center justify-center text-subtext mx-auto border border-ivory-darker">
            <Heart className="w-7 h-7 text-subtext/40" />
          </div>
          <h3 className="font-display text-2xl font-bold text-charcoal">
            No saved favorites yet
          </h3>
          <p className="text-xs sm:text-sm text-subtext leading-relaxed">
            Tap the heart icon on any dish or restaurant to build your personal culinary wishlist.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <Link
              to="/menu"
              className="px-5 py-2.5 rounded-full bg-orange-brand text-white text-xs font-semibold hover:bg-orange-hover transition-colors shadow-soft"
            >
              Explore Dishes
            </Link>
            <Link
              to="/restaurants"
              className="px-5 py-2.5 rounded-full bg-ivory text-charcoal text-xs font-semibold hover:bg-ivory-darker transition-colors"
            >
              View Restaurants
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-12">
          {/* Dishes Section */}
          {(activeTab === 'all' || activeTab === 'foods') && savedFoods.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-2 border-b border-ivory-darker">
                <Utensils className="w-4 h-4 text-orange-brand" />
                <h2 className="font-display text-2xl font-bold text-charcoal">
                  Favorite Dishes ({savedFoods.length})
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {savedFoods.map((food) => (
                  <FoodCard key={food.id} food={food} />
                ))}
              </div>
            </div>
          )}

          {/* Restaurants Section */}
          {(activeTab === 'all' || activeTab === 'restaurants') && savedRestaurants.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-2 border-b border-ivory-darker">
                <Store className="w-4 h-4 text-orange-brand" />
                <h2 className="font-display text-2xl font-bold text-charcoal">
                  Favorite Restaurants ({savedRestaurants.length})
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {savedRestaurants.map((res) => (
                  <RestaurantCard key={res.id} restaurant={res} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
