import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, ChevronDown, ChevronRight, SlidersHorizontal } from "lucide-react";
import { casualProducts, type Product } from "../data/products";
import { filterColors, filterSizes } from "../data/content";
import { Breadcrumbs } from "../components/layout/Breadcrumbs";
import { ProductCard } from "../components/product/ProductCard";
import { Button } from "../components/ui/button";
import { Sheet } from "../components/ui/sheet";
import { cn } from "../lib/utils";

const categories = ["T-shirts", "Shorts", "Shirts", "Hoodie", "Jeans"];
const dressStyles = ["Casual", "Formal", "Party", "Gym"];
const sortOptions = ["Most Popular", "Newest", "Price: Low to High", "Price: High to Low"] as const;

const categoryMatch: Record<string, Product["category"]> = {
  "T-shirts": "tshirts",
  Shorts: "shorts",
  Shirts: "shirts",
  Hoodie: "hoodie",
  Jeans: "jeans",
};

interface Filters {
  categories: string[];
  maxPrice: number;
  colors: string[];
  sizes: string[];
  styles: string[];
}

const defaultFilters: Filters = {
  categories: [],
  maxPrice: 200,
  colors: [],
  sizes: [],
  styles: [],
};

function FilterPanel({
  filters,
  onChange,
  onApply,
}: {
  filters: Filters;
  onChange: (f: Filters) => void;
  onApply?: () => void;
}) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    price: true,
    colors: true,
    size: true,
    style: true,
  });
  const toggleSection = (key: string) =>
    setOpenSections((s) => ({ ...s, [key]: !s[key] }));

  const toggleList = (key: keyof Filters, value: string) => {
    const list = filters[key] as string[];
    onChange({
      ...filters,
      [key]: list.includes(value) ? list.filter((v) => v !== value) : [...list, value],
    });
  };

  const sectionTitle = "flex w-full items-center justify-between py-5 text-xl font-bold";

  return (
    <div className="divide-y divide-black/10">
      {/* Product categories */}
      <ul className="space-y-3 py-5">
        {categories.map((c) => (
          <li key={c}>
            <button
              type="button"
              onClick={() => toggleList("categories", c)}
              className={cn(
                "flex w-full cursor-pointer items-center justify-between text-base",
                filters.categories.includes(c) ? "font-bold text-black" : "text-black/60",
              )}
            >
              {c}
              <ChevronRight className="size-4" />
            </button>
          </li>
        ))}
      </ul>

      {/* Price */}
      <div className="py-2">
        <button type="button" onClick={() => toggleSection("price")} className={cn(sectionTitle, "cursor-pointer")}>
          Price
          <ChevronDown className={cn("size-4 transition-transform", !openSections.price && "-rotate-90")} />
        </button>
        {openSections.price && (
          <div className="pb-6">
            <input
              type="range"
              min={50}
              max={200}
              value={filters.maxPrice}
              onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
              aria-label="Maximum price"
              className="price-range w-full"
              style={{ ["--fill" as string]: `${((filters.maxPrice - 50) / 150) * 100}%` }}
            />
            <div className="mt-2 flex justify-between text-sm font-medium">
              <span>$50</span>
              <span>${filters.maxPrice}</span>
            </div>
          </div>
        )}
      </div>

      {/* Colors */}
      <div className="py-2">
        <button type="button" onClick={() => toggleSection("colors")} className={cn(sectionTitle, "cursor-pointer")}>
          Colors
          <ChevronDown className={cn("size-4 transition-transform", !openSections.colors && "-rotate-90")} />
        </button>
        {openSections.colors && (
          <div className="flex flex-wrap gap-3 pb-6">
            {filterColors.map((color) => (
              <button
                key={color}
                type="button"
                aria-label={`Filter by color ${color}`}
                aria-pressed={filters.colors.includes(color)}
                onClick={() => toggleList("colors", color)}
                className={cn(
                  "size-[37px] cursor-pointer rounded-full border border-black/20 transition-transform hover:scale-110",
                  filters.colors.includes(color) && "ring-2 ring-black ring-offset-2",
                )}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Size */}
      <div className="py-2">
        <button type="button" onClick={() => toggleSection("size")} className={cn(sectionTitle, "cursor-pointer")}>
          Size
          <ChevronDown className={cn("size-4 transition-transform", !openSections.size && "-rotate-90")} />
        </button>
        {openSections.size && (
          <div className="flex flex-wrap gap-2 pb-6">
            {filterSizes.map((size) => (
              <button
                key={size}
                type="button"
                aria-pressed={filters.sizes.includes(size)}
                onClick={() => toggleList("sizes", size)}
                className={cn(
                  "cursor-pointer rounded-full px-5 py-2.5 text-sm transition-colors",
                  filters.sizes.includes(size)
                    ? "bg-black font-medium text-white"
                    : "bg-[#f0f0f0] text-black/60 hover:bg-black/10",
                )}
              >
                {size}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Dress style */}
      <div className="py-2">
        <button type="button" onClick={() => toggleSection("style")} className={cn(sectionTitle, "cursor-pointer")}>
          Dress Style
          <ChevronDown className={cn("size-4 transition-transform", !openSections.style && "-rotate-90")} />
        </button>
        {openSections.style && (
          <ul className="space-y-3 pb-6">
            {dressStyles.map((s) => (
              <li key={s}>
                <button
                  type="button"
                  onClick={() => toggleList("styles", s)}
                  className={cn(
                    "flex w-full cursor-pointer items-center justify-between text-base",
                    filters.styles.includes(s) ? "font-bold text-black" : "text-black/60",
                  )}
                >
                  {s}
                  <ChevronRight className="size-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="pt-6">
        <Button className="w-full" onClick={onApply}>
          Apply Filter
        </Button>
      </div>
    </div>
  );
}

export function CategoryPage() {
  const { slug = "casual" } = useParams();
  const title = slug.charAt(0).toUpperCase() + slug.slice(1);

  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [sort, setSort] = useState<(typeof sortOptions)[number]>("Most Popular");
  const [page, setPage] = useState(1);
  const [sheetOpen, setSheetOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = casualProducts.filter((p) => {
      if (filters.categories.length > 0) {
        const cats = filters.categories.map((c) => categoryMatch[c]);
        if (!cats.includes(p.category)) return false;
      }
      if (p.price > filters.maxPrice) return false;
      if (filters.styles.length > 0) {
        const styles = filters.styles.map((s) => s.toLowerCase());
        if (!p.dressStyles.some((ds) => styles.includes(ds))) return false;
      }
      return true;
    });
    switch (sort) {
      case "Price: Low to High":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "Price: High to Low":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "Newest":
        list = [...list].reverse();
        break;
    }
    return list;
  }, [filters, sort]);

  const totalPages = 10; // design shows 10 pages

  return (
    <main className="mx-auto max-w-[1240px] px-4 md:px-0">
      <div className="mt-6">
        <Breadcrumbs trail={[{ label: "Home", to: "/" }, { label: title }]} />
      </div>

      <div className="mt-6 flex gap-5">
        {/* Filters sidebar — desktop */}
        <aside className="hidden w-[295px] shrink-0 md:block">
          <div className="rounded-[20px] border border-black/10 px-6 py-5">
            <div className="flex items-center justify-between border-b border-black/10 pb-5">
              <h2 className="text-xl font-bold">Filters</h2>
              <SlidersHorizontal className="size-6 text-black/40" />
            </div>
            <FilterPanel filters={filters} onChange={setFilters} />
          </div>
        </aside>

        {/* Product grid */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-2xl font-bold md:text-[32px]">{title}</h1>
            <p className="hidden text-base text-black/60 sm:block">
              Showing 1-{Math.min(9, filtered.length)} of {filtered.length} Products
            </p>
            <div className="flex items-center gap-3">
              <label htmlFor="sort" className="hidden text-base text-black/60 sm:block">
                Sort by:
              </label>
              <div className="relative">
                <select
                  id="sort"
                  value={sort}
                  onChange={(e) => setSort(e.target.value as (typeof sortOptions)[number])}
                  className="cursor-pointer appearance-none rounded-full bg-transparent pr-8 text-base font-medium focus:outline-none"
                >
                  {sortOptions.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute top-1/2 right-0 size-4 -translate-y-1/2" />
              </div>
              <button
                type="button"
                aria-label="Open filters"
                onClick={() => setSheetOpen(true)}
                className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-[#f0f0f0] md:hidden"
              >
                <SlidersHorizontal className="size-5" />
              </button>
            </div>
          </div>

          {filtered.length === 0 ? (
            <p className="py-24 text-center text-black/60">
              No products match these filters.{" "}
              <button
                type="button"
                onClick={() => setFilters(defaultFilters)}
                className="cursor-pointer font-medium text-black underline"
              >
                Clear filters
              </button>
            </p>
          ) : (
            <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-3">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}

          {/* Pagination */}
          <nav aria-label="Pagination" className="mt-10 flex items-center justify-between border-t border-black/10 pt-6">
            <button
              type="button"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="flex h-9 cursor-pointer items-center gap-2 rounded-lg border border-black/10 px-4 text-sm font-medium disabled:opacity-40"
            >
              <ArrowLeft className="size-4" /> Previous
            </button>
            <div className="hidden items-center gap-1 sm:flex">
              {[1, 2, 3].map((n) => (
                <PageNumber key={n} n={n} page={page} setPage={setPage} />
              ))}
              <span className="px-2 text-sm text-black/40">...</span>
              {[8, 9, 10].map((n) => (
                <PageNumber key={n} n={n} page={page} setPage={setPage} />
              ))}
            </div>
            <button
              type="button"
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="flex h-9 cursor-pointer items-center gap-2 rounded-lg border border-black/10 px-4 text-sm font-medium disabled:opacity-40"
            >
              Next <ArrowRight className="size-4" />
            </button>
          </nav>
        </div>
      </div>

      <div className="h-24 md:h-[170px]" aria-hidden="true" />

      {/* Mobile filter sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen} title="Filters">
        <FilterPanel filters={filters} onChange={setFilters} onApply={() => setSheetOpen(false)} />
      </Sheet>
    </main>
  );
}

function PageNumber({
  n,
  page,
  setPage,
}: {
  n: number;
  page: number;
  setPage: (n: number) => void;
}) {
  return (
    <button
      type="button"
      aria-label={`Page ${n}`}
      aria-current={page === n ? "page" : undefined}
      onClick={() => setPage(n)}
      className={cn(
        "size-10 cursor-pointer rounded-lg text-sm font-medium transition-colors",
        page === n ? "bg-black/5 text-black" : "text-black/50 hover:bg-black/5",
      )}
    >
      {n}
    </button>
  );
}

