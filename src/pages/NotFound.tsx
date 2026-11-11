import React from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, Home } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 text-center">
      <div className="max-w-md bg-white p-8 sm:p-12 rounded-3xl border border-ivory-darker shadow-card space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-orange-subtle text-orange-brand flex items-center justify-center mx-auto border border-orange-brand/20">
          <UtensilsCrossed className="w-8 h-8 stroke-[2.2]" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-brand">
            404 • DISH NOT FOUND
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-charcoal">
            Lost in the Menu?
          </h1>
          <p className="text-xs sm:text-sm text-subtext leading-relaxed">
            The page you are looking for has been moved, eaten, or was never on the tasting menu.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-orange-brand text-white text-xs font-semibold hover:bg-orange-hover shadow-soft transition-all"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return Home</span>
          </Link>
          <Link
            to="/menu"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-ivory text-charcoal text-xs font-semibold hover:bg-ivory-darker transition-colors"
          >
            <span>Explore Menu</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
