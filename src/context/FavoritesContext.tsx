import React, { createContext, useContext, useState, useEffect } from 'react';

interface FavoritesContextType {
  favoriteFoodIds: string[];
  favoriteRestaurantIds: string[];
  toggleFoodFavorite: (foodId: string) => void;
  toggleRestaurantFavorite: (restaurantId: string) => void;
  isFoodFavorite: (foodId: string) => boolean;
  isRestaurantFavorite: (restaurantId: string) => boolean;
  totalFavoritesCount: number;
}

const FAVORITES_FOOD_KEY = 'bitebox_fav_foods_v1';
const FAVORITES_RESTAURANT_KEY = 'bitebox_fav_restaurants_v1';

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favoriteFoodIds, setFavoriteFoodIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_FOOD_KEY);
      return saved ? JSON.parse(saved) : ['classic-smash-burger', 'truffle-mushroom-pasta'];
    } catch {
      return ['classic-smash-burger', 'truffle-mushroom-pasta'];
    }
  });

  const [favoriteRestaurantIds, setFavoriteRestaurantIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_RESTAURANT_KEY);
      return saved ? JSON.parse(saved) : ['burger-atelier', 'pasta-district'];
    } catch {
      return ['burger-atelier', 'pasta-district'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_FOOD_KEY, JSON.stringify(favoriteFoodIds));
    } catch (e) {
      console.error(e);
    }
  }, [favoriteFoodIds]);

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_RESTAURANT_KEY, JSON.stringify(favoriteRestaurantIds));
    } catch (e) {
      console.error(e);
    }
  }, [favoriteRestaurantIds]);

  const toggleFoodFavorite = (foodId: string) => {
    setFavoriteFoodIds((prev) =>
      prev.includes(foodId) ? prev.filter((id) => id !== foodId) : [...prev, foodId]
    );
  };

  const toggleRestaurantFavorite = (restaurantId: string) => {
    setFavoriteRestaurantIds((prev) =>
      prev.includes(restaurantId) ? prev.filter((id) => id !== restaurantId) : [...prev, restaurantId]
    );
  };

  const isFoodFavorite = (foodId: string) => favoriteFoodIds.includes(foodId);
  const isRestaurantFavorite = (restaurantId: string) => favoriteRestaurantIds.includes(restaurantId);

  const totalFavoritesCount = favoriteFoodIds.length + favoriteRestaurantIds.length;

  return (
    <FavoritesContext.Provider
      value={{
        favoriteFoodIds,
        favoriteRestaurantIds,
        toggleFoodFavorite,
        toggleRestaurantFavorite,
        isFoodFavorite,
        isRestaurantFavorite,
        totalFavoritesCount,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
