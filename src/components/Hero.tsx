import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Sparkles, Star, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroProps {
  onSearch?: (query: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      if (onSearch) {
        onSearch(searchQuery);
      } else {
        navigate(`/menu?search=${encodeURIComponent(searchQuery.trim())}`);
      }
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    if (onSearch) onSearch('');
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-1/4 left-[-10%] w-[450px] h-[450px] bg-orange-light/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-[-5%] w-[400px] h-[400px] bg-beige-light/50 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Text & Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 xl:col-span-6 space-y-6 md:space-y-8"
          >
            {/* Small Label */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-subtle border border-orange-brand/20 text-orange-brand text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>DISCOVER SOMETHING DELICIOUS</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-charcoal leading-[1.08]">
              Good Food. <br />
              <span className="italic font-normal text-orange-brand">Great Discoveries.</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-subtext leading-relaxed max-w-xl">
              Explore exceptional restaurants, discover irresistible dishes, and find your next favorite meal through curated culinary collections.
            </p>

            {/* Modern Restaurant / Dish Search Bar */}
            <form
              onSubmit={handleSearchSubmit}
              className="relative max-w-xl bg-white p-2 sm:p-2.5 rounded-2xl shadow-medium border border-ivory-darker flex items-center transition-all focus-within:ring-2 focus-within:ring-orange-brand/30 focus-within:border-orange-brand"
            >
              <div className="pl-3 pr-2 text-subtext">
                <Search className="w-5 h-5 text-charcoal/60" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by restaurant, dish, or cuisine..."
                className="w-full bg-transparent text-sm sm:text-base text-charcoal placeholder-subtext/70 focus:outline-none py-1"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClear}
                  aria-label="Clear search input"
                  className="p-1.5 text-subtext hover:text-charcoal rounded-full mr-1 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="submit"
                className="shrink-0 px-5 sm:px-6 py-3 rounded-xl bg-orange-brand text-white text-sm font-semibold hover:bg-orange-hover transition-colors shadow-sm active:scale-95"
              >
                Search
              </button>
            </form>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button
                onClick={() => navigate('/restaurants')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-charcoal text-white text-sm font-semibold hover:bg-charcoal-light shadow-soft transition-all active:scale-95"
              >
                <span>Explore Restaurants</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('/menu')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-charcoal border border-ivory-darker text-sm font-semibold hover:bg-ivory-warm shadow-card transition-all active:scale-95"
              >
                <span>Discover Menu</span>
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="pt-4 border-t border-ivory-darker/60 flex items-center gap-8 sm:gap-12">
              <div>
                <span className="block font-display text-2xl font-bold text-charcoal">40+</span>
                <span className="text-xs text-subtext uppercase tracking-wider font-medium">
                  Artisan Kitchens
                </span>
              </div>
              <div>
                <span className="block font-display text-2xl font-bold text-charcoal">4.9★</span>
                <span className="text-xs text-subtext uppercase tracking-wider font-medium">
                  Average Rating
                </span>
              </div>
              <div>
                <span className="block font-display text-2xl font-bold text-charcoal">25 Min</span>
                <span className="text-xs text-subtext uppercase tracking-wider font-medium">
                  Avg. Delivery
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Large Premium Food Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 xl:col-span-6 relative"
          >
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Desktop Hero Image Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-elevated border-4 border-white aspect-[16/10] sm:aspect-[16/10] bg-charcoal">
                <picture>
                  <source media="(min-width: 768px)" srcSet="./images/hero/hero-desktop.webp" />
                  <img
                    src="./images/hero/hero-mobile.webp"
                    alt="BiteBox Artisanal Double Smash Burger with Golden Fries and Rustic Pasta"
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                    loading="eager"
                  />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                {/* Floating Badge 1: Chef's Highlight */}
                <div className="absolute top-4 left-4 glass-card px-3.5 py-2 rounded-2xl shadow-medium border border-white/60 flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-orange-brand/20 text-orange-brand flex items-center justify-center">
                    <Flame className="w-4 h-4 fill-orange-brand" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold text-charcoal leading-none">
                      Trending Special
                    </span>
                    <span className="text-[10px] text-subtext leading-none">
                      Dry-Aged Smash Burger
                    </span>
                  </div>
                </div>

                {/* Floating Badge 2: Verified Quality */}
                <div className="absolute bottom-4 right-4 glass-card px-4 py-2.5 rounded-2xl shadow-medium border border-white/60 flex items-center gap-3">
                  <div className="flex -space-x-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <div className="text-left border-l border-ivory-darker pl-3">
                    <span className="block text-xs font-bold text-charcoal">Michelin-Trained</span>
                    <span className="text-[10px] text-subtext">Chef Quality Assured</span>
                  </div>
                </div>
              </div>

              {/* Decorative Background Frame */}
              <div className="absolute -bottom-4 -left-4 -right-4 h-full rounded-3xl border-2 border-beige-muted/40 -z-10 hidden sm:block" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
