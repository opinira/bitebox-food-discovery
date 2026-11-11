import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Clock, MapPin, Phone, Heart, ArrowLeft, ChefHat } from 'lucide-react';
import { restaurants } from '../data/restaurants';
import { foods } from '../data/foods';
import { FoodCard } from '../components/FoodCard';
import { useFavorites } from '../context/FavoritesContext';

export const RestaurantDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isRestaurantFavorite, toggleRestaurantFavorite } = useFavorites();

  const restaurant = restaurants.find((r) => r.id === id);

  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Filter foods strictly belonging to this restaurant
  const restaurantFoods = useMemo(() => {
    if (!restaurant) return [];
    return foods.filter((f) => f.restaurantId === restaurant.id);
  }, [restaurant]);

  // Available categories within this specific restaurant
  const availableCategories = useMemo(() => {
    if (!restaurant) return [];
    const set = new Set<string>();
    restaurantFoods.forEach((f) => set.add(f.category));
    return ['All', ...Array.from(set)];
  }, [restaurant, restaurantFoods]);

  const displayedFoods = useMemo(() => {
    if (selectedCategory === 'All') return restaurantFoods;
    return restaurantFoods.filter((f) => f.category === selectedCategory);
  }, [restaurantFoods, selectedCategory]);

  if (!restaurant) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="font-display text-3xl font-bold text-charcoal">Restaurant Not Found</h2>
        <p className="text-subtext text-sm">
          The requested kitchen profile does not exist or may have been updated.
        </p>
        <Link
          to="/restaurants"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-orange-brand text-white text-xs font-semibold"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Restaurants</span>
        </Link>
      </div>
    );
  }

  const isFav = isRestaurantFavorite(restaurant.id);

  return (
    <div className="space-y-10 sm:space-y-14 pb-20">
      {/* Top Banner Cover Image */}
      <div className="relative h-72 sm:h-96 w-full bg-charcoal overflow-hidden">
        <img
          src={restaurant.coverImage}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />

        {/* Back Button */}
        <div className="absolute top-6 left-4 sm:left-8 z-10">
          <button
            onClick={() => navigate(-1)}
            aria-label="Go back"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md text-charcoal hover:bg-white text-xs font-semibold shadow-soft transition-all active:scale-95"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>
        </div>

        {/* Floating Favorite Button */}
        <div className="absolute top-6 right-4 sm:right-8 z-10">
          <button
            onClick={() => toggleRestaurantFavorite(restaurant.id)}
            aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-charcoal shadow-soft hover:scale-105 active:scale-95 transition-all"
          >
            <Heart
              className={`w-5 h-5 ${
                isFav ? 'fill-orange-brand text-orange-brand' : 'text-charcoal'
              }`}
            />
          </button>
        </div>

        {/* Title Overlay in Banner Bottom */}
        <div className="absolute bottom-6 left-4 sm:left-8 right-4 sm:right-8 text-white max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-white/95 text-charcoal text-xs font-bold shadow-sm">
                {restaurant.cuisine}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-charcoal/80 text-white text-xs font-semibold">
                {restaurant.priceRange}
              </span>
            </div>
            <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight">
              {restaurant.name}
            </h1>
            <p className="text-beige-muted text-sm sm:text-base mt-1">
              {restaurant.tagline}
            </p>
          </div>

          <div className="flex items-center gap-4 bg-charcoal/80 backdrop-blur-md p-3 rounded-2xl border border-white/20 self-start sm:self-auto shrink-0">
            <div className="flex items-center gap-1.5 pr-3 border-r border-white/20">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="font-bold text-sm text-white">{restaurant.rating.toFixed(1)}</span>
              <span className="text-[11px] text-beige-muted">({restaurant.reviewCount})</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-beige-muted">
              <Clock className="w-3.5 h-3.5 text-orange-brand" />
              <span>{restaurant.prepTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Info & Menu */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Food Menu */}
          <div className="lg:col-span-8 space-y-8">
            {/* Restaurant Menu Header */}
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-orange-brand mb-1">
                <ChefHat className="w-4 h-4" />
                <span>EXCLUSIVELY CRAFTED HERE</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-charcoal">
                {restaurant.name} Menu
              </h2>
              <p className="text-xs sm:text-sm text-subtext mt-1">
                Order directly from this kitchen. Prepared fresh to order.
              </p>
            </div>

            {/* Category Tabs for this Restaurant */}
            <div className="flex items-center gap-2 border-b border-ivory-darker pb-2 overflow-x-auto">
              {availableCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? 'bg-charcoal text-white'
                      : 'bg-white text-subtext hover:text-charcoal border border-ivory-darker'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Dishes Grid */}
            {displayedFoods.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-3xl border border-ivory-darker text-subtext">
                No items available in this category.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {displayedFoods.map((food) => (
                  <FoodCard key={food.id} food={food} />
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Restaurant Meta, Hours, Address */}
          <aside className="lg:col-span-4 space-y-6">
            {/* About Kitchen Box */}
            <div className="bg-white p-6 rounded-3xl border border-ivory-darker shadow-card space-y-5">
              <h3 className="font-display text-xl font-bold text-charcoal">
                About the Kitchen
              </h3>
              <p className="text-xs sm:text-sm text-subtext leading-relaxed">
                {restaurant.description}
              </p>

              {/* Features List */}
              <div className="pt-2">
                <span className="text-xs font-bold text-charcoal uppercase tracking-wider block mb-2">
                  Kitchen Highlights
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {restaurant.features.map((feat, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-xl bg-ivory text-[11px] font-medium text-charcoal border border-ivory-darker"
                    >
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Operating Hours Box */}
            <div className="bg-white p-6 rounded-3xl border border-ivory-darker shadow-card space-y-4">
              <h3 className="font-display text-xl font-bold text-charcoal">
                Opening Hours
              </h3>
              <div className="space-y-2 text-xs">
                {restaurant.hours.map((h, i) => (
                  <div key={i} className="flex justify-between pb-1.5 border-b border-ivory-darker/60 last:border-0">
                    <span className="font-medium text-charcoal">{h.days}</span>
                    <span className="text-subtext">{h.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location & Contact Box */}
            <div className="bg-white p-6 rounded-3xl border border-ivory-darker shadow-card space-y-3 text-xs">
              <h3 className="font-display text-xl font-bold text-charcoal mb-2">
                Location & Contact
              </h3>
              <div className="flex items-start gap-2.5 text-subtext">
                <MapPin className="w-4 h-4 text-orange-brand shrink-0 mt-0.5" />
                <span>{restaurant.address}</span>
              </div>
              <div className="flex items-center gap-2.5 text-subtext">
                <Phone className="w-4 h-4 text-orange-brand shrink-0" />
                <span>{restaurant.phone}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
