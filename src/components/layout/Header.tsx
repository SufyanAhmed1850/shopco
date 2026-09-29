import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ChevronDown, CircleUserRound, Menu, Search, ShoppingCart, X } from "lucide-react";
import { useCart } from "../../features/cart/cartStore";
import { cn } from "../../lib/utils";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    "flex items-center gap-1 text-base transition-colors hover:text-black",
    isActive ? "text-black font-medium" : "text-black",
  );

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={cn("font-display text-[32px] leading-none text-black", className)}>
      SHOP.CO
    </Link>
  );
}

export function Header() {
  const { count } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b border-black/10 bg-white">
      <div className="mx-auto flex h-24 max-w-[1240px] items-center gap-10 px-4 md:px-0">
        {/* Mobile menu button */}
        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setMenuOpen((v) => !v)}
          className="cursor-pointer md:hidden"
        >
          {menuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>

        <Logo />

        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          <NavLink to="/category/casual" className={navLinkClass}>
            Shop <ChevronDown className="size-4" />
          </NavLink>
          <NavLink to="/category/casual" className={navLinkClass}>
            On Sale
          </NavLink>
          <NavLink to="/" className={navLinkClass}>
            New Arrivals
          </NavLink>
          <NavLink to="/" className={navLinkClass}>
            Brands
          </NavLink>
        </nav>

        <div className="relative ml-auto hidden flex-1 md:block">
          <Search className="pointer-events-none absolute top-1/2 left-4 size-[18px] -translate-y-1/2 text-black/40" />
          <input
            type="search"
            placeholder="Search for products..."
            aria-label="Search for products"
            className="h-12 w-full rounded-full bg-[#f0f0f0] pr-4 pl-12 text-sm text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-black/20"
          />
        </div>

        <div className="ml-auto flex items-center gap-3 md:ml-0">
          <Link
            to="/cart"
            aria-label={`Cart, ${count} items`}
            className="relative rounded-full p-1 transition-colors hover:bg-black/5"
          >
            <ShoppingCart className="size-6" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white">
                {count}
              </span>
            )}
          </Link>
          <button type="button" aria-label="Account" className="cursor-pointer rounded-full p-1 transition-colors hover:bg-black/5">
            <CircleUserRound className="size-6" />
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {menuOpen && (
        <nav className="border-t border-black/10 bg-white px-6 py-4 md:hidden" aria-label="Mobile">
          <div className="relative mb-4">
            <Search className="pointer-events-none absolute top-1/2 left-4 size-[18px] -translate-y-1/2 text-black/40" />
            <input
              type="search"
              placeholder="Search for products..."
              aria-label="Search for products"
              className="h-12 w-full rounded-full bg-[#f0f0f0] pr-4 pl-12 text-sm placeholder:text-black/40 focus:outline-none"
            />
          </div>
          {[
            ["Shop", "/category/casual"],
            ["On Sale", "/category/casual"],
            ["New Arrivals", "/"],
            ["Brands", "/"],
          ].map(([label, to]) => (
            <Link
              key={label}
              to={to}
              onClick={() => setMenuOpen(false)}
              className="block border-b border-black/5 py-3 text-base last:border-0"
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
