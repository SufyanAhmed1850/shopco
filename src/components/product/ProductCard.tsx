import { ViewTransition } from "react";
import { Link } from "react-router-dom";
import type { Product } from "../../data/products";
import { Badge } from "../ui/badge";
import { RatingStars } from "./RatingStars";
import { formatPrice } from "../../lib/utils";

/**
 * Product card — matches the design's 295px card exactly.
 * The image is a named <ViewTransition> so it morphs into the product
 * detail gallery image on navigation (shared-element transition).
 */
export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="group block w-full"
      aria-label={`View ${product.name}`}
    >
      <ViewTransition name={`product-image-${product.id}`}>
        <div className="overflow-hidden rounded-[20px] bg-[#f0eeed]">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="aspect-[295/298] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </div>
      </ViewTransition>
      <h3 className="mt-4 text-xl font-bold text-black">{product.name}</h3>
      <RatingStars rating={product.rating} className="mt-2" />
      <p className="mt-2 flex items-center gap-2.5">
        <span className="text-2xl font-bold text-black">{formatPrice(product.price)}</span>
        {product.originalPrice && (
          <span className="text-2xl font-bold text-black/40 line-through">
            {formatPrice(product.originalPrice)}
          </span>
        )}
        {product.discountLabel && <Badge>{product.discountLabel}</Badge>}
      </p>
    </Link>
  );
}
