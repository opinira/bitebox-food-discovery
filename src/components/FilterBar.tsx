import React from 'react';
import { Search, X, ArrowUpDown, RotateCcw } from 'lucide-react';
import { CategoryType, SortOption } from '../types';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: CategoryType;
  onCategoryChange: (category: CategoryType) => void;
  selectedSort: SortOption;
  onSortChange: (sort: SortOption) => void;
  dietaryFilter: 'all' | 'veg' | 'non-veg';
  onDietaryFilterChange: (dietary: 'all' | 'veg' | 'non-veg') => void;
  totalResults: number;
  onResetFilters: () => void;
  hasActiveFilters: boolean;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedSort,
  onSortChange,
  dietaryFilter,
  onDietaryFilterChange,
  totalResults,
  onResetFilters,
  hasActiveFilters,
}) => {
  const categoriesList: CategoryType[] = [
    'All Items',
    'Burgers',
    'Pizza',
    'Pasta',
    'Asian',
    'Seafood',
    'Desserts',
    'Healthy',
    'Drinks',
  ];

  return (
    <div className="space-y-4 mb-8">
      {/* Top Row: Search Input + Sorting + Dietary */}
      <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-xl">
          <Search className="w-4 h-4 text-subtext absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by dish, ingredient, or restaurant..."
            className="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-white border border-ivory-darker text-sm text-charcoal placeholder-subtext focus:outline-none focus:ring-2 focus:ring-orange-brand/30 focus:border-orange-brand shadow-card transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-subtext hover:text-charcoal"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Right Controls: Sort & Dietary Pills */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Dietary Toggle */}
          <div className="flex items-center bg-white border border-ivory-darker rounded-2xl p-1 shadow-card text-xs">
            <button
              onClick={() => onDietaryFilterChange('all')}
              className={`px-3 py-1.5 rounded-xl font-medium transition-colors ${
                dietaryFilter === 'all'
                  ? 'bg-charcoal text-white'
                  : 'text-subtext hover:text-charcoal'
              }`}
            >
              All
            </button>
            <button
              onClick={() => onDietaryFilterChange('veg')}
              className={`px-3 py-1.5 rounded-xl font-medium transition-colors ${
                dietaryFilter === 'veg'
                  ? 'bg-green-700 text-white'
                  : 'text-subtext hover:text-charcoal'
              }`}
            >
              🌱 Veg Only
            </button>
            <button
              onClick={() => onDietaryFilterChange('non-veg')}
              className={`px-3 py-1.5 rounded-xl font-medium transition-colors ${
                dietaryFilter === 'non-veg'
                  ? 'bg-charcoal text-white'
                  : 'text-subtext hover:text-charcoal'
              }`}
            >
              Non-Veg
            </button>
          </div>

          {/* Sort Selector */}
          <div className="relative flex items-center bg-white border border-ivory-darker rounded-2xl px-3 py-1.5 shadow-card text-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-subtext mr-2" />
            <select
              value={selectedSort}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              aria-label="Sort dishes"
              className="bg-transparent text-charcoal font-semibold text-xs focus:outline-none cursor-pointer pr-2"
            >
              <option value="featured">Featured Dishes</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating-desc">Highest Rated</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>

          {/* Reset Filters button if active */}
          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-orange-subtle border border-orange-brand/20 text-orange-brand text-xs font-semibold hover:bg-orange-light transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-1">
        {categoriesList.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 shadow-card ${
                isSelected
                  ? 'bg-orange-brand text-white shadow-soft ring-2 ring-orange-brand/20 scale-[1.02]'
                  : 'bg-white hover:bg-ivory-warm text-charcoal border border-ivory-darker'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Results Count Line */}
      <div className="flex items-center justify-between text-xs text-subtext px-1">
        <span>
          Showing <strong className="text-charcoal">{totalResults}</strong> dishes matching your criteria
        </span>
      </div>
    </div>
  );
};
