import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, ChefHat, ShieldCheck, Clock, Award, Star } from 'lucide-react';
import { Hero } from '../components/Hero';
import { CategorySection } from '../components/CategorySection';
import { RestaurantCard } from '../components/RestaurantCard';
import { FoodCard } from '../components/FoodCard';
import { restaurants } from '../data/restaurants';
import { foods } from '../data/foods';
import { CategoryType } from '../types';

export const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('All Items');
  const navigate = useNavigate();

  // Filter dishes based on category selected
  const displayedFoods = useMemo(() => {
    let list = foods;
    if (selectedCategory !== 'All Items') {
      list = list.filter((f) => f.category === selectedCategory);
    }
    return list.slice(0, 8); // top 8 for home page
  }, [selectedCategory]);

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* 1. Hero Section */}
      <Hero
        onSearch={(query) => {
          navigate(`/menu?search=${encodeURIComponent(query)}`);
        }}
      />

      {/* 2. Interactive Food Categories */}
      <CategorySection
        activeCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* 3. Featured Restaurants */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-subtle border border-orange-brand/20 text-orange-brand text-xs font-semibold uppercase tracking-wider mb-2">
              <ChefHat className="w-3.5 h-3.5" />
              <span>HANDPICKED KITCHENS</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-charcoal">
              Explore Top Restaurants
            </h2>
            <p className="text-sm text-subtext mt-1">
              Discover the places everyone is talking about.
            </p>
          </div>

          <Link
            to="/restaurants"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-orange-brand hover:text-orange-hover transition-colors group"
          >
            <span>View All Restaurants</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 6-8 sample restaurants grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {restaurants.slice(0, 8).map((res) => (
            <RestaurantCard key={res.id} restaurant={res} />
          ))}
        </div>
      </section>

      {/* 4. Popular Food Menu */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-subtle border border-orange-brand/20 text-orange-brand text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CHEF SIGNATURES</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-charcoal">
              Discover Your Next Favorite
            </h2>
            <p className="text-sm text-subtext mt-1">
              Signature artisan creations from our premier partner restaurants.
            </p>
          </div>

          <Link
            to="/menu"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-orange-brand hover:text-orange-hover transition-colors group"
          >
            <span>Browse Full Menu</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Foods Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedFoods.map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      </section>

      {/* 5. Editorial Experience Highlights / Value Prop */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-charcoal rounded-4xl p-8 sm:p-12 lg:p-16 text-white relative overflow-hidden shadow-elevated">
          {/* Subtle Background Glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-brand/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-orange-brand block mb-2">
              THE BITEBOX STANDARD
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold leading-tight">
              A New Standard for Culinary Discovery
            </h2>
            <p className="text-beige-muted text-sm sm:text-base mt-4 leading-relaxed">
              We decline 80% of applicant restaurants. Only kitchens that obsess over ingredient provenance, seasonal harmony, and culinary excellence earn a spot on BiteBox.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-4 border-t border-charcoal-light/60">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-charcoal-surface border border-charcoal-light flex items-center justify-center text-orange-brand">
                <ChefHat className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg font-bold">Artisan Kitchens Only</h3>
              <p className="text-xs text-beige-muted leading-relaxed">
                Hand-vetted culinary masters using scratch recipes, heritage techniques, and uncompromised ingredients.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-charcoal-surface border border-charcoal-light flex items-center justify-center text-orange-brand">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg font-bold">Editorial Photography</h3>
              <p className="text-xs text-beige-muted leading-relaxed">
                Every photo represents the real dish as served. Zero stock substitutes or synthetic mockups.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-charcoal-surface border border-charcoal-light flex items-center justify-center text-orange-brand">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg font-bold">Heated Courier Transit</h3>
              <p className="text-xs text-beige-muted leading-relaxed">
                Temperature-controlled courier bags ensure piping hot pasta and crisp fries arrive in prime restaurant condition.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-charcoal-surface border border-charcoal-light flex items-center justify-center text-orange-brand">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg font-bold">Transparent Nutrition</h3>
              <p className="text-xs text-beige-muted leading-relaxed">
                Accurate allergen declarations, calorie metrics, and complete culinary ingredient profiles on every plate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Customer Testimonials / Press */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-orange-brand block mb-2">
            CRITICAL ACCLAIM
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-charcoal">
            Loved by Serious Food Lovers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              quote: "BiteBox is what food delivery should have been from day one. Finding Burger Atelier's dry-aged smash burger here changed our weekend dinners entirely.",
              author: "Marcus Chen",
              role: "Food & Wine Contributor",
              rating: 5,
            },
            {
              quote: "The visual quality and accurate menu curation make browsing effortless. You truly discover hidden culinary gems you wouldn't find on generic aggregators.",
              author: "Elena Rostova",
              role: "Hospitality Consultant",
              rating: 5,
            },
            {
              quote: "From Pasta District's fresh chanterelle fettuccine to Saffron House's tandoori plates, every order arrives with pristine restaurant-grade presentation.",
              author: "David Sterling",
              role: "Executive Chef & Food Critic",
              rating: 5,
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-7 rounded-3xl border border-ivory-darker shadow-card flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex gap-1">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-charcoal leading-relaxed italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-ivory-darker/60 flex items-center justify-between">
                <div>
                  <span className="block text-sm font-bold text-charcoal">{item.author}</span>
                  <span className="text-xs text-subtext">{item.role}</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-ivory flex items-center justify-center font-display font-bold text-orange-brand text-xs">
                  BB
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
