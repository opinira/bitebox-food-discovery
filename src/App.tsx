import React, { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FoodDetailsModal } from './components/FoodDetailsModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { SearchModal } from './components/SearchModal';
import { ScrollToTop } from './components/ScrollToTop';

import { Home } from './pages/Home';
import { Menu } from './pages/Menu';
import { Restaurants } from './pages/Restaurants';
import { RestaurantDetails } from './pages/RestaurantDetails';
import { Favorites } from './pages/Favorites';
import { NotFound } from './pages/NotFound';

import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { ModalProvider } from './context/ModalContext';

export const App: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <HashRouter>
      <ScrollToTop />
      <FavoritesProvider>
        <CartProvider>
          <ModalProvider>
            <div className="flex flex-col min-h-screen bg-ivory text-charcoal">
              {/* Header */}
              <Header onOpenSearch={() => setIsSearchOpen(true)} />

              {/* Main Page Content */}
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/menu" element={<Menu />} />
                  <Route path="/restaurants" element={<Restaurants />} />
                  <Route path="/restaurants/:id" element={<RestaurantDetails />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>

              {/* Footer */}
              <Footer />

              {/* Global Modals & Drawers */}
              <FoodDetailsModal />
              <CartDrawer />
              <CheckoutModal />
              <SearchModal
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
              />
            </div>
          </ModalProvider>
        </CartProvider>
      </FavoritesProvider>
    </HashRouter>
  );
};
export default App;
