import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UtensilsCrossed, Heart, ShoppingBag, Search, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';

interface HeaderProps {
  onOpenSearch?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { totals, toggleCart } = useCart();
  const { totalFavoritesCount } = useFavorites();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Explore', path: '/menu' },
    { label: 'Restaurants', path: '/restaurants' },
    { label: 'Our Menu', path: '/menu' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'glass-header border-b border-ivory-darker shadow-soft py-3.5'
          : 'bg-ivory/90 backdrop-blur-sm py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-orange-brand/30 rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded-xl bg-charcoal flex items-center justify-center text-orange-brand shadow-sm transition-transform duration-300 group-hover:scale-105">
              <UtensilsCrossed className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-2xl font-bold tracking-tight text-charcoal leading-none">
                Bite<span className="text-orange-brand">Box</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase font-medium text-subtext mt-0.5">
                Food Discovery
              </span>
            </div>
          </Link>

          {/* Desktop Center Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`text-sm font-medium transition-colors duration-200 relative py-1 ${
                    active
                      ? 'text-orange-brand font-semibold'
                      : 'text-charcoal/80 hover:text-charcoal'
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-brand rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            {onOpenSearch && (
              <button
                onClick={onOpenSearch}
                aria-label="Search food and restaurants"
                className="p-2.5 rounded-full text-charcoal/80 hover:text-charcoal hover:bg-white/80 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-brand/30"
              >
                <Search className="w-5 h-5" />
              </button>
            )}

            <Link
              to="/favorites"
              aria-label="View Favorites"
              className="p-2.5 rounded-full text-charcoal/80 hover:text-charcoal hover:bg-white/80 transition-all duration-200 relative focus:outline-none focus:ring-2 focus:ring-orange-brand/30"
            >
              <Heart className="w-5 h-5" />
              {totalFavoritesCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-orange-brand text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {totalFavoritesCount}
                </span>
              )}
            </Link>

            <button
              onClick={toggleCart}
              aria-label="Open Cart"
              className="p-2.5 rounded-full text-charcoal/80 hover:text-charcoal hover:bg-white/80 transition-all duration-200 relative focus:outline-none focus:ring-2 focus:ring-orange-brand/30"
            >
              <ShoppingBag className="w-5 h-5" />
              {totals.itemCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-orange-brand text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {totals.itemCount}
                </span>
              )}
            </button>

            <Link
              to="/menu"
              className="ml-2 inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-semibold bg-orange-brand text-white shadow-soft hover:bg-orange-hover hover:shadow-medium transition-all duration-200 active:scale-95"
            >
              Explore Food
            </Link>
          </div>

          {/* Mobile Actions & Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              to="/favorites"
              aria-label="Favorites"
              className="p-2 text-charcoal relative"
            >
              <Heart className="w-5 h-5" />
              {totalFavoritesCount > 0 && (
                <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-orange-brand text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {totalFavoritesCount}
                </span>
              )}
            </Link>

            <button
              onClick={toggleCart}
              aria-label="Open Shopping Cart"
              className="p-2 text-charcoal relative"
            >
              <ShoppingBag className="w-5 h-5" />
              {totals.itemCount > 0 && (
                <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-orange-brand text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {totals.itemCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="p-2 text-charcoal rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-brand"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-full bg-ivory border-b border-ivory-darker shadow-elevated px-6 py-6 transition-all duration-300">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className={`text-lg font-medium py-2 px-3 rounded-xl transition-colors ${
                  isActive(link.path)
                    ? 'bg-orange-brand text-white font-semibold'
                    : 'text-charcoal hover:bg-white'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <Link
              to="/favorites"
              className="flex items-center justify-between py-2 px-3 rounded-xl text-charcoal hover:bg-white text-lg font-medium"
            >
              <span>Saved Favorites</span>
              <span className="text-sm font-semibold bg-white px-2.5 py-0.5 rounded-full border border-ivory-darker">
                {totalFavoritesCount}
              </span>
            </Link>

            <div className="pt-2">
              <Link
                to="/menu"
                className="w-full inline-flex items-center justify-center py-3 rounded-full text-base font-semibold bg-orange-brand text-white shadow-soft"
              >
                Explore All Food
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
