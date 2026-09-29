import { Link } from "react-router-dom";
import type { Product } from "../../data/products";
import { ProductCard } from "../../components/product/ProductCard";
import { Button } from "../../components/ui/button";

/** "NEW ARRIVALS" / "TOP SELLING" product row sections. */
export function ProductShowcase({
  title,
  products,
  linkTo = "/category/casual",
}: {
  title: string;
  products: Product[];
  linkTo?: string;
}) {
  return (
    <section className="mx-auto max-w-[1240px] px-4 md:px-0">
      <h2 className="text-center font-display text-[32px] leading-[40px] text-black md:text-[48px] md:leading-[58px]">
        {title}
      </h2>
      <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 md:mt-14 md:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      <div className="mt-9 flex justify-center md:mt-12">
        <Link to={linkTo}>
          <Button variant="outline" className="w-[218px]">
            View All
          </Button>
        </Link>
      </div>
    </section>
  );
}
