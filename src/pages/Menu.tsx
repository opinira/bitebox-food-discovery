import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Utensils, RotateCcw } from 'lucide-react';
import { FilterBar } from '../components/FilterBar';
import { FoodCard } from '../components/FoodCard';
import { foods } from '../data/foods';
import { CategoryType, SortOption } from '../types';

export const Menu: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize from search params or defaults
  const initialCategory = (searchParams.get('category') as CategoryType) || 'All Items';
  const initialSearch = searchParams.get('search') || '';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>(initialCategory);
  const [selectedSort, setSelectedSort] = useState<SortOption>('featured');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'veg' | 'non-veg'>('all');

  // Keep state synced with URL search params
  useEffect(() => {
    const cat = searchParams.get('category') as CategoryType;
    if (cat) setSelectedCategory(cat);
    const q = searchParams.get('search');
    if (q !== null) setSearchQuery(q);
  }, [searchParams]);

  // Update URL params when category or search changes
  const handleCategoryChange = (category: CategoryType) => {
    setSelectedCategory(category);
    const newParams = new URLSearchParams(searchParams);
    if (category === 'All Items') {
      newParams.delete('category');
    } else {
      newParams.set('category', category);
    }
    setSearchParams(newParams, { replace: true });
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    const newParams = new URLSearchParams(searchParams);
    if (!query) {
      newParams.delete('search');
    } else {
      newParams.set('search', query);
    }
    setSearchParams(newParams, { replace: true });
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All Items');
    setSelectedSort('featured');
    setDietaryFilter('all');
    setSearchParams({}, { replace: true });
  };

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'All Items' ||
    selectedSort !== 'featured' ||
    dietaryFilter !== 'all';

  // Filter & sort dishes
  const filteredAndSortedFoods = useMemo(() => {
    let result = foods.filter((food) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = food.name.toLowerCase().includes(q);
        const matchesCategory = food.category.toLowerCase().includes(q);
        const matchesRestaurant = food.restaurantName.toLowerCase().includes(q);
        const matchesIngredient = food.ingredients.some((ing) => ing.toLowerCase().includes(q));
        if (!matchesName && !matchesCategory && !matchesRestaurant && !matchesIngredient) {
          return false;
        }
      }

      // 2. Category
      if (selectedCategory !== 'All Items' && food.category !== selectedCategory) {
        return false;
      }

      // 3. Dietary
      if (dietaryFilter === 'veg' && !food.isVegetarian) {
        return false;
      }
      if (dietaryFilter === 'non-veg' && food.isVegetarian) {
        return false;
      }

      return true;
    });

    // 4. Sorting
    switch (selectedSort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        result.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
        break;
      case 'popular':
        result.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0) || b.reviewCount - a.reviewCount);
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.isChefSpecial ? 1 : 0) - (a.isChefSpecial ? 1 : 0));
        break;
    }

    return result;
  }, [searchQuery, selectedCategory, dietaryFilter, selectedSort]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      {/* Page Title */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-semibold text-orange-brand uppercase tracking-wider block mb-2">
          THE COMPLETE DIRECTORY
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-charcoal">
          Explore Our Menu
        </h1>
        <p className="text-sm sm:text-base text-subtext mt-2">
          Discover handcrafted dishes prepared by top artisanal kitchens. Filter by category, dietary preferences, or price.
        </p>
      </div>

      {/* Filter and Search Bar Component */}
      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        selectedSort={selectedSort}
        onSortChange={setSelectedSort}
        dietaryFilter={dietaryFilter}
        onDietaryFilterChange={setDietaryFilter}
        totalResults={filteredAndSortedFoods.length}
        onResetFilters={handleResetFilters}
        hasActiveFilters={hasActiveFilters}
      />

      {/* Food Cards Grid or Empty State */}
      {filteredAndSortedFoods.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-ivory-darker shadow-card space-y-4">
          <Utensils className="w-12 h-12 text-subtext/40 mx-auto" />
          <h3 className="font-display text-2xl font-bold text-charcoal">
            No dishes match your criteria
          </h3>
          <p className="text-sm text-subtext max-w-md mx-auto">
            We couldn't find any dishes matching your current search or filters. Try relaxing your dietary filters or clearing the search query.
          </p>
          <button
            onClick={handleResetFilters}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-orange-brand text-white text-xs font-semibold hover:bg-orange-hover shadow-soft transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedFoods.map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      )}
    </div>
  );
};
