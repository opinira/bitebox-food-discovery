import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, ArrowRight, Instagram, Twitter, Facebook, CheckCircle2, ShieldCheck, HeartHandshake } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-charcoal text-white pt-20 pb-12 border-t border-charcoal-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-charcoal-light/60">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-5">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-charcoal-surface border border-charcoal-light flex items-center justify-center text-orange-brand">
                <UtensilsCrossed className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="font-display text-2xl font-bold tracking-tight text-white">
                Bite<span className="text-orange-brand">Box</span>
              </span>
            </Link>

            <p className="text-beige-muted text-sm leading-relaxed max-w-sm">
              Discover exceptional food, explore great restaurants, and find something worth craving. BiteBox bridges artisanal kitchens and food lovers through an editorial discovery experience.
            </p>

            <div className="flex items-center gap-3 pt-2 text-beige-muted">
              <a
                href="#social"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-charcoal-surface border border-charcoal-light flex items-center justify-center text-beige-muted hover:text-orange-brand hover:border-orange-brand transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#social"
                aria-label="Twitter"
                className="w-9 h-9 rounded-full bg-charcoal-surface border border-charcoal-light flex items-center justify-center text-beige-muted hover:text-orange-brand hover:border-orange-brand transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#social"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-charcoal-surface border border-charcoal-light flex items-center justify-center text-beige-muted hover:text-orange-brand hover:border-orange-brand transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase text-white mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-beige-muted">
              <li>
                <Link to="/menu" className="hover:text-orange-brand transition-colors">
                  All Cravings
                </Link>
              </li>
              <li>
                <Link to="/menu?category=Burgers" className="hover:text-orange-brand transition-colors">
                  Artisan Burgers
                </Link>
              </li>
              <li>
                <Link to="/menu?category=Pasta" className="hover:text-orange-brand transition-colors">
                  Handmade Pasta
                </Link>
              </li>
              <li>
                <Link to="/menu?category=Pizza" className="hover:text-orange-brand transition-colors">
                  Wood-Fired Pizza
                </Link>
              </li>
              <li>
                <Link to="/menu?category=Healthy" className="hover:text-orange-brand transition-colors">
                  Vitality & Grain Bowls
                </Link>
              </li>
            </ul>
          </div>

          {/* Restaurant Links */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase text-white mb-4">
              Restaurants
            </h4>
            <ul className="space-y-2.5 text-sm text-beige-muted">
              <li>
                <Link to="/restaurants" className="hover:text-orange-brand transition-colors">
                  Browse All Kitchens
                </Link>
              </li>
              <li>
                <Link to="/restaurants/burger-atelier" className="hover:text-orange-brand transition-colors">
                  Burger Atelier
                </Link>
              </li>
              <li>
                <Link to="/restaurants/pasta-district" className="hover:text-orange-brand transition-colors">
                  Pasta District
                </Link>
              </li>
              <li>
                <Link to="/restaurants/ember-and-olive" className="hover:text-orange-brand transition-colors">
                  Ember & Olive
                </Link>
              </li>
              <li>
                <Link to="/restaurants/seoul-street-kitchen" className="hover:text-orange-brand transition-colors">
                  Seoul Street Kitchen
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase text-white mb-4">
              The Chef's Dispatch
            </h4>
            <p className="text-xs text-beige-muted mb-4 leading-relaxed">
              Curated dining spotlights, secret tasting menus, and culinary stories delivered weekly.
            </p>

            {isSubscribed ? (
              <div className="flex items-center gap-2 text-xs text-green-400 bg-charcoal-surface border border-green-500/30 p-3 rounded-xl">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>You're on the list! Welcome to the table.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-charcoal-surface border border-charcoal-light rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-subtext focus:outline-none focus:border-orange-brand transition-colors"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="absolute right-1 top-1 bottom-1 px-3 bg-orange-brand hover:bg-orange-hover text-white rounded-lg flex items-center justify-center transition-colors"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-[11px] text-subtext block">
                  Zero spam. Unsubscribe at any time.
                </span>
              </form>
            )}
          </div>
        </div>

        {/* Value Badges */}
        <div className="py-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-beige-muted border-b border-charcoal-light/40">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-orange-brand shrink-0" />
            <span>Curated Artisanal Kitchens & Certified Standards</span>
          </div>
          <div className="flex items-center gap-3">
            <UtensilsCrossed className="w-5 h-5 text-orange-brand shrink-0" />
            <span>Authentic Recipes Cooked to Exacting Standards</span>
          </div>
          <div className="flex items-center gap-3">
            <HeartHandshake className="w-5 h-5 text-orange-brand shrink-0" />
            <span>Sustainable Sourcing & Compostable Packaging</span>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-subtext">
          <p>© {new Date().getFullYear()} BiteBox Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/disclaimer" className="hover:text-beige-muted transition-colors">
              Platform Disclaimer
            </Link>
            <Link to="/privacy" className="hover:text-beige-muted transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-beige-muted transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
