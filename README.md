# BiteBox — Premium Food Discovery Platform

> **Good Food. Great Discoveries.**  
> An editorial food discovery platform connecting food lovers with artisan kitchens, handcrafted recipes, and authentic culinary photography.

---

## 🌟 Overview

**BiteBox** is a production-grade, responsive food discovery web application designed with the sensibility of an international food-tech editorial brand. Unlike traditional generic food templates, BiteBox pairs verified food photography directly with master kitchens, detailed ingredient transparency, real-time multi-dimensional menu filtering, and a persistent shopping and ordering experience.

---

## 🎨 Design System & Visual Foundation

- **Midnight Charcoal (`#171A19`)**: Primary dark foundation, editorial headers, and luxury footers.
- **Warm Ivory (`#F7F3EB`)**: Main paper canvas background ensuring high readability and warmth.
- **BiteBox Orange (`#E96B36`)**: Strategic interactive accent for buttons, badges, prices, and active states.
- **Muted Beige (`#D9C9AF`)**: Subtle borders, dividers, and card accents.
- **Pure White (`#FFFFFF`)**: Elevated card surfaces and modal dialogs.
- **Secondary Text (`#77736A`)**: Refined metadata, subtitles, and dietary tags.
- **Typography**: 
  - Display Headings: *DM Serif Display* & *Playfair Display*
  - Body & UI: *Inter* & *Manrope*

---

## 🚀 Key Features

1. **Editorial Hero Experience**:
   - Dynamic search input with direct keyword navigation
   - Custom dual-composition responsive photography (16:10 desktop hero & 4:5 vertical mobile hero)
   - Real-time culinary metrics (40+ kitchens, 4.9★ rating, 25-minute average delivery)

2. **Handpicked Kitchen Profiles (8 Premier Restaurants)**:
   - *Burger Atelier* (West Village, NY — Artisan Smashed Patties & Craft Sides)
   - *Pasta District* (Little Italy, NY — Hand-Extruded Italian Pasta & Regional Wines)
   - *Ember & Olive* (Chelsea, NY — Coastal Mediterranean Wood-Fired Hearth)
   - *Seoul Street Kitchen* (Koreatown, NY — Modern Korean Comfort & Craft Ferments)
   - *The Green Spoon* (SoHo, NY — Botanical Bowls, Cold-Pressed Tonics & Clean Eats)
   - *Golden Fork* (Central Park West, NY — Grand European Brasserie & Haute Patisserie)
   - *Saffron House* (Midtown, NY — Imperial Mughlai Curries & Tandoori Masterpieces)
   - *The Urban Table* (SoHo, NY — Farm-to-Fork New American & Neapolitan Pizza)

3. **Dynamic Menu Filtering & Search**:
   - Category filtering (*Burgers, Pizza, Pasta, Asian, Seafood, Desserts, Healthy, Drinks*)
   - Instant search across dish names, restaurants, categories, and ingredients
   - Dietary preferences (*All, 🌱 Vegetarian Only, Non-Vegetarian*)
   - Multi-sort (*Featured, Price: Low to High, Price: High to Low, Highest Rated, Most Popular*)
   - URL query parameter synchronization (`?category=...&search=...`) for shareable states

4. **Food Details Experience**:
   - High-resolution studio photography
   - Comprehensive culinary story, prep time, and calorie calculations
   - Complete ingredient list, dietary declarations, and allergen warnings
   - Interactive quantity controls with live price calculation

5. **Slide-in Cart Drawer & Order Summary**:
   - Animated slide-in drawer on desktop, bottom-sheet responsive experience on mobile
   - Real-time subtotal, 8.875% tax, and delivery fee calculation
   - Free delivery unlock progress tracker ($40 threshold)
   - LocalStorage state persistence across sessions and tabs

6. **Interactive Demo Checkout Experience**:
   - Order confirmation modal with simulated payment method selection (Apple Pay, Credit Card, Cash)
   - Confetti celebration burst upon order completion
   - Simulated 3-stage live kitchen status tracker (*Confirmed → In Kitchen → Courier Pickup*)
   - Order ID generation & estimated arrival countdown

7. **Wishlist & Favorites**:
   - One-tap heart save for dishes and restaurants
   - Dedicated `/favorites` page with filterable views
   - Persistent LocalStorage storage

---

## 🛠️ Technology Stack

- **Framework**: React 18 + TypeScript + Vite 6
- **Styling**: Tailwind CSS 3.4 + PostCSS + Autoprefixer
- **Routing**: React Router DOM 6.28 with client-side rewrite support (`vercel.json`)
- **Animation**: Framer Motion 11
- **Icons**: Lucide React
- **Micro-Interactions**: Canvas Confetti
- **Deployment**: Vercel & GitHub

---

## 📦 Getting Started Locally

```bash
# 1. Clone repository
git clone https://github.com/opinira/bitebox-food-discovery.git
cd bitebox-food-discovery

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Build for production
npm run build

# 5. Preview production build
npm run preview
```

---

## 🌐 Deployment Configuration

This project includes a production-ready `vercel.json` configured for SPA client-side routing rewrites:

```json
{
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## 📄 License

© Mst. Opisultana Nira / BiteBox. Crafted with precision for culinary discovery.
