import { newArrivals, topSelling } from "../data/products";
import { Hero } from "../features/home/Hero";
import { BrandStrip } from "../features/home/BrandStrip";
import { ProductShowcase } from "../features/home/ProductShowcase";
import { DressStyles } from "../features/home/DressStyles";
import { Testimonials } from "../features/home/Testimonials";

export function HomePage() {
  return (
    <main>
      <Hero />
      <BrandStrip />
      <div className="mt-16 space-y-16 md:mt-[72px] md:space-y-[80px]">
        <ProductShowcase title="NEW ARRIVALS" products={newArrivals} />
        <hr className="mx-auto max-w-[1240px] border-black/10" />
        <ProductShowcase title="TOP SELLING" products={topSelling} />
        <DressStyles />
        <Testimonials />
      </div>
      {/* breathing room before the overlapping newsletter card */}
      <div className="h-24 md:h-[170px]" aria-hidden="true" />
    </main>
  );
}
