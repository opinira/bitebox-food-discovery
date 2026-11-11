export type CategoryType = 
  | 'All Items'
  | 'Burgers'
  | 'Pizza'
  | 'Pasta'
  | 'Asian'
  | 'Seafood'
  | 'Desserts'
  | 'Healthy'
  | 'Drinks';

export interface FoodCustomizationOption {
  label: string;
  price: number;
}

export interface FoodCustomization {
  name: string;
  required?: boolean;
  options: FoodCustomizationOption[];
}

export interface FoodItem {
  id: string;
  name: string;
  restaurantId: string;
  restaurantName: string;
  category: Exclude<CategoryType, 'All Items'>;
  price: number;
  rating: number;
  reviewCount: number;
  prepTime: string;
  calories: number;
  isVegetarian: boolean;
  isPopular: boolean;
  isChefSpecial?: boolean;
  image: string;
  description: string;
  ingredients: string[];
  dietary: string[];
  allergens?: string[];
  customizations?: FoodCustomization[];
}

export interface RestaurantHours {
  days: string;
  time: string;
}

export interface Restaurant {
  id: string;
  name: string;
  tagline: string;
  cuisine: string;
  rating: number;
  reviewCount: number;
  prepTime: string;
  priceRange: '$' | '$$' | '$$$' | '$$$$';
  image: string;
  coverImage: string;
  address: string;
  phone: string;
  hours: RestaurantHours[];
  description: string;
  features: string[];
  categories: Exclude<CategoryType, 'All Items'>[];
  popularDishIds: string[];
}

export interface CategoryInfo {
  id: CategoryType;
  name: string;
  image: string;
  itemCount: number;
  description: string;
}

export interface CartItem {
  food: FoodItem;
  quantity: number;
  selectedOptions?: Record<string, string>;
  addedAt: number;
}

export interface CartTotals {
  itemCount: number;
  subtotal: number;
  deliveryFee: number;
  tax: number;
  grandTotal: number;
  isFreeDelivery: boolean;
  amountNeededForFreeDelivery: number;
}

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating-desc' | 'popular';
