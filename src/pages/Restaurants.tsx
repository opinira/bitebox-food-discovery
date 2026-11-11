import React, { useState, useMemo } from 'react';
import { Search, X, Store } from 'lucide-react';
import { RestaurantCard } from '../components/RestaurantCard';
import { restaurants } from '../data/restaurants';

export const Restaurants: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState<string>('All');
  const [selectedPrice, setSelectedPrice] = useState<string>('All');
  const [minRating, setMinRating] = useState<number>(0);

  const cuisines = useMemo(() => {
    const set = new Set<string>();
    restaurants.forEach((r) => set.add(r.cuisine));
    return ['All', ...Array.from(set)];
  }, []);

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((r) => {
      // Search
      const matchesSearch =
        !searchQuery.trim() ||
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Cuisine
      const matchesCuisine = selectedCuisine === 'All' || r.cuisine === selectedCuisine;

      // Price
      const matchesPrice = selectedPrice === 'All' || r.priceRange === selectedPrice;

      // Rating
      const matchesRating = r.rating >= minRating;

      return matchesSearch && matchesCuisine && matchesPrice && matchesRating;
    });
  }, [searchQuery, selectedCuisine, selectedPrice, minRating]);

  const hasActiveFilters = searchQuery !== '' || selectedCuisine !== 'All' || selectedPrice !== 'All' || minRating > 0;

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCuisine('All');
    setSelectedPrice('All');
    setMinRating(0);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Page Title */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-subtle border border-orange-brand/20 text-orange-brand text-xs font-semibold uppercase tracking-wider mb-2">
          <Store className="w-3.5 h-3.5" />
          <span>CURATED KITCHENS</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-charcoal">
          Explore Partner Restaurants
        </h1>
        <p className="text-sm sm:text-base text-subtext mt-3">
          Discover culinary destinations adhering to artisanal standards, scratch preparations, and uncompromising quality.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-ivory-darker shadow-card space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Search */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-subtext absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by restaurant name or cuisine..."
              className="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-ivory-warm border border-ivory-darker text-sm text-charcoal placeholder-subtext focus:outline-none focus:ring-2 focus:ring-orange-brand/30"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-subtext hover:text-charcoal"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Cuisine Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedCuisine}
              onChange={(e) => setSelectedCuisine(e.target.value)}
              aria-label="Filter by cuisine"
              className="w-full py-2.5 px-3 rounded-2xl bg-ivory-warm border border-ivory-darker text-sm text-charcoal font-medium focus:outline-none cursor-pointer"
            >
              {cuisines.map((c) => (
                <option key={c} value={c}>
                  {c === 'All' ? 'All Cuisines' : c}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Filter */}
          <div className="md:col-span-2">
            <select
              value={selectedPrice}
              onChange={(e) => setSelectedPrice(e.target.value)}
              aria-label="Filter by price range"
              className="w-full py-2.5 px-3 rounded-2xl bg-ivory-warm border border-ivory-darker text-sm text-charcoal font-medium focus:outline-none cursor-pointer"
            >
              <option value="All">All Prices</option>
              <option value="$">$ Casual</option>
              <option value="$$">$$ Moderate</option>
              <option value="$$$">$$$ Fine</option>
              <option value="$$$$">$$$$ Luxury</option>
            </select>
          </div>

          {/* Rating Filter */}
          <div className="md:col-span-2">
            <select
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              aria-label="Filter by minimum rating"
              className="w-full py-2.5 px-3 rounded-2xl bg-ivory-warm border border-ivory-darker text-sm text-charcoal font-medium focus:outline-none cursor-pointer"
            >
              <option value={0}>Any Rating</option>
              <option value={4.7}>4.7+ Stars</option>
              <option value={4.8}>4.8+ Stars</option>
              <option value={4.9}>4.9+ Stars</option>
            </select>
          </div>
        </div>

        {/* Status Line */}
        <div className="flex items-center justify-between text-xs text-subtext pt-2 border-t border-ivory-darker/60">
          <span>
            Found <strong className="text-charcoal">{filteredRestaurants.length}</strong> verified kitchens
          </span>
          {hasActiveFilters && (
            <button
              onClick={handleReset}
              className="text-orange-brand font-semibold hover:underline"
            >
              Clear All Filters
            </button>
          )}
        </div>
      </div>

      {/* Restaurants Grid */}
      {filteredRestaurants.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-ivory-darker shadow-card space-y-4">
          <Store className="w-12 h-12 text-subtext/40 mx-auto" />
          <h3 className="font-display text-2xl font-bold text-charcoal">
            No kitchens match your filters
          </h3>
          <p className="text-sm text-subtext max-w-md mx-auto">
            Try adjusting your search query, price range, or cuisine selection to find available restaurants.
          </p>
          <button
            onClick={handleReset}
            className="px-6 py-2.5 rounded-full bg-orange-brand text-white text-xs font-semibold hover:bg-orange-hover transition-colors shadow-soft"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRestaurants.map((res) => (
            <RestaurantCard key={res.id} restaurant={res} />
          ))}
        </div>
      )}
    </div>
  );
};
