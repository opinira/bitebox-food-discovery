import React from 'react';
import { categories } from '../data/categories';
import { CategoryType } from '../types';
import { motion } from 'framer-motion';

interface CategorySectionProps {
  activeCategory: CategoryType;
  onSelectCategory: (category: CategoryType) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-orange-brand block mb-2">
              CURATED CATEGORIES
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-charcoal">
              What Are You Craving?
            </h2>
          </div>
          <button
            onClick={() => onSelectCategory('All Items')}
            className={`text-sm font-semibold transition-colors ${
              activeCategory === 'All Items'
                ? 'text-orange-brand underline underline-offset-4'
                : 'text-subtext hover:text-charcoal'
            }`}
          >
            View All ({categories.reduce((acc, c) => acc + c.itemCount, 0)} dishes)
          </button>
        </div>

        {/* Categories Grid / Horizontal Scroll on mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {categories.map((cat, index) => {
            const isSelected = activeCategory === cat.id;
            return (
              <motion.button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
                className={`group relative rounded-2xl p-2.5 transition-all duration-300 flex flex-col items-center text-center text-left ${
                  isSelected
                    ? 'bg-orange-brand text-white shadow-medium scale-[1.03] ring-2 ring-orange-brand ring-offset-2 ring-offset-ivory'
                    : 'bg-white hover:bg-white text-charcoal shadow-card hover:shadow-soft hover:scale-[1.02] border border-ivory-darker'
                }`}
              >
                {/* Circular / Rounded Square Category Thumbnail */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden mb-2.5 relative bg-ivory">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  {isSelected && (
                    <div className="absolute inset-0 bg-orange-brand/20 pointer-events-none" />
                  )}
                </div>

                <span
                  className={`text-xs sm:text-sm font-semibold tracking-tight block ${
                    isSelected ? 'text-white' : 'text-charcoal group-hover:text-orange-brand'
                  }`}
                >
                  {cat.name}
                </span>

                <span
                  className={`text-[10px] mt-0.5 block ${
                    isSelected ? 'text-white/80' : 'text-subtext'
                  }`}
                >
                  {cat.itemCount} items
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
