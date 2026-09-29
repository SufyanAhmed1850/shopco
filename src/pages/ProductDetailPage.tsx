import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Check, SlidersHorizontal } from "lucide-react";
import { productById, youMayAlsoLike } from "../data/products";
import { productReviews } from "../data/content";
import { asset } from "../lib/utils";
import { Breadcrumbs } from "../components/layout/Breadcrumbs";
import { ProductCard } from "../components/product/ProductCard";
import { QuantityStepper } from "../components/product/QuantityStepper";
import { RatingStars } from "../components/product/RatingStars";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { VerifiedIcon, StarIcon } from "../components/icons";
import { useCart } from "../features/cart/cartStore";
import { formatPrice, cn } from "../lib/utils";

const sizes = ["Small", "Medium", "Large", "X-Large"];
const tabs = ["Product Details", "Rating & Reviews", "FAQs"] as const;

function galleryFor(productId: string, main: string): string[] {
  if (productId === "one-life-graphic-t-shirt") {
    return [
      asset("assets/products/one-life-main.png"),
      asset("assets/products/one-life-t1.png"),
      asset("assets/products/one-life-t2.png"),
      asset("assets/products/one-life-t3.png"),
    ];
  }
  return [main];
}

export function ProductDetailPage() {
  const { id = "" } = useParams();
  const product = productById(id);
  const navigate = useNavigate();
  const { addLine } = useCart();

  const [activeImage, setActiveImage] = useState(0);
  const [color, setColor] = useState(0);
  const [size, setSize] = useState("Large");
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState<(typeof tabs)[number]>("Rating & Reviews");
  const [visibleReviews, setVisibleReviews] = useState(6);

  const gallery = useMemo(
    () => (product ? galleryFor(product.id, product.image) : []),
    [product],
  );

  if (!product) {
    return (
      <main className="mx-auto max-w-[1240px] px-4 py-24 text-center">
        <h1 className="font-display text-4xl">Product not found</h1>
        <Link to="/" className="mt-6 inline-block underline">
          Back to home
        </Link>
      </main>
    );
  }

  const colors = product.colors ?? ["#4f4631", "#314f4a", "#1d1d1d"];

  const handleAddToCart = () => {
    addLine({ productId: product.id, size, color: `Color ${color + 1}`, quantity });
    navigate("/cart");
  };

  return (
    <main className="mx-auto max-w-[1240px] px-4 md:px-0">
      <div className="mt-6">
        <Breadcrumbs
          trail={[
            { label: "Home", to: "/" },
            { label: "Shop", to: "/category/casual" },
            { label: "Men", to: "/category/casual" },
            { label: "T-shirts" },
          ]}
        />
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        {/* Gallery */}
        <div>
          <div className="overflow-hidden rounded-[20px] bg-[#f0eeed]">
            <img
              key={activeImage}
              src={gallery[activeImage]}
              alt={product.name}
              className="aspect-[444/530] w-full object-cover"
            />
          </div>
          <div className="mt-3.5 grid grid-cols-3 gap-3.5">
            {gallery.slice(1).map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setActiveImage(i + 1)}
                aria-label={`View image ${i + 2}`}
                aria-pressed={activeImage === i + 1}
                className={cn(
                  "cursor-pointer overflow-hidden rounded-[20px] bg-[#f0eeed] transition-opacity",
                  activeImage === i + 1 ? "ring-2 ring-black ring-offset-2" : "hover:opacity-80",
                )}
              >
                <img src={src} alt="" className="aspect-[152/167] w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          <h1 className="font-display text-[28px] leading-[34px] text-black md:text-[40px] md:leading-[48px]">
            {product.name}
          </h1>
          <RatingStars rating={product.rating} className="mt-3.5" starClass="size-[22px]" />
          <p className="mt-3.5 flex items-center gap-3">
            <span className="text-[32px] font-bold">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-[32px] font-bold text-black/30 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            {product.discountLabel && <Badge>{product.discountLabel}</Badge>}
          </p>
          <p className="mt-4 max-w-[590px] text-base leading-[22px] text-black/60">
            This graphic t-shirt which is perfect for any occasion. Crafted from a soft and
            breathable fabric, it offers superior comfort and style.
          </p>

          <hr className="my-6 border-black/10" />

          <div>
            <p className="text-base text-black/60">Select Colors</p>
            <div className="mt-4 flex gap-4">
              {colors.map((c, i) => (
                <button
                  key={c}
                  type="button"
                  aria-label={`Select color ${i + 1}`}
                  aria-pressed={color === i}
                  onClick={() => setColor(i)}
                  className={cn(
                    "flex size-[37px] cursor-pointer items-center justify-center rounded-full transition-transform hover:scale-110",
                    color === i && "ring-2 ring-black ring-offset-2",
                  )}
                  style={{ backgroundColor: c }}
                >
                  {color === i && <Check className="size-4 text-white" />}
                </button>
              ))}
            </div>
          </div>

          <hr className="my-6 border-black/10" />

          <div>
            <div className="flex items-center justify-between">
              <p className="text-base text-black/60">Choose Size</p>
              <button type="button" className="flex cursor-pointer items-center gap-1 text-base text-black/60 hover:text-black">
                <span className="text-lg">⤢</span> Size Guide
              </button>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              {sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  aria-pressed={size === s}
                  onClick={() => setSize(s)}
                  className={cn(
                    "h-[46px] cursor-pointer rounded-full px-6 text-base transition-colors",
                    size === s
                      ? "bg-black font-medium text-white"
                      : "bg-[#f0f0f0] text-black/60 hover:bg-black/10",
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <hr className="my-6 border-black/10" />

          <div className="flex gap-3">
            <QuantityStepper quantity={quantity} onChange={(q) => setQuantity(Math.max(1, q))} />
            <Button className="h-[52px] flex-1 text-base" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-16 border-b border-black/10 md:mt-20">
        <div className="flex justify-between" role="tablist" aria-label="Product information">
          {tabs.map((t) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={cn(
                "cursor-pointer border-b-2 pb-4 text-base md:text-xl",
                tab === t
                  ? "border-black font-medium text-black"
                  : "border-transparent text-black/60 hover:text-black",
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {tab === "Rating & Reviews" && (
        <section aria-label="Reviews" className="mt-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-2xl font-bold">
              All Reviews <span className="text-base font-normal text-black/60">(451)</span>
            </h2>
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                aria-label="Filter reviews"
                className="flex size-12 cursor-pointer items-center justify-center rounded-full bg-[#f0f0f0] hover:bg-black/10"
              >
                <SlidersHorizontal className="size-5" />
              </button>
              <div className="hidden h-12 items-center rounded-full bg-[#f0f0f0] px-5 sm:flex">
                <span className="text-base font-medium">Latest</span>
              </div>
              <Button variant="primarySm" className="h-12">
                Write a Review
              </Button>
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {productReviews.slice(0, visibleReviews).map((r) => (
              <article
                key={r.name}
                className="rounded-[20px] border border-black/10 p-7 md:p-8"
              >
                <div className="flex gap-[5px]" aria-label={`Rated ${r.rating} out of 5`}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <StarIcon key={i} fill={i < r.rating ? 1 : 0} className="size-[19px]" />
                  ))}
                </div>
                <h3 className="mt-4 flex items-center gap-1.5 text-xl font-bold">
                  {r.name} {r.verified && <VerifiedIcon />}
                </h3>
                <p className="mt-3 text-base leading-[22px] text-black/60">&ldquo;{r.text}&rdquo;</p>
                <p className="mt-6 text-base font-medium text-black/60">{r.date}</p>
              </article>
            ))}
          </div>

          <div className="mt-9 flex justify-center">
            <Button
              variant="outline"
              className="w-[230px]"
              onClick={() => setVisibleReviews((v) => (v >= productReviews.length ? 6 : v + 6))}
            >
              {visibleReviews >= productReviews.length ? "Show Less" : "Load More Reviews"}
            </Button>
          </div>
        </section>
      )}

      {tab === "Product Details" && (
        <section className="mt-8 max-w-[720px] text-base leading-[26px] text-black/60">
          <p>
            This graphic t-shirt which is perfect for any occasion. Crafted from a soft and
            breathable fabric, it offers superior comfort and style. The unique graphic design
            makes it a standout piece in any wardrobe.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6">
            <li>100% premium cotton</li>
            <li>Regular fit with a crew neckline</li>
            <li>Machine washable</li>
            <li>Designed in California</li>
          </ul>
        </section>
      )}

      {tab === "FAQs" && (
        <section className="mt-8 max-w-[720px] space-y-6">
          {[
            ["What is the fit of this t-shirt?", "It has a regular, true-to-size fit. If you prefer a looser look, we recommend sizing up."],
            ["How should I wash it?", "Machine wash cold with like colors and tumble dry low to keep the graphic looking fresh."],
            ["Is this t-shirt unisex?", "Yes — the cut works for everyone. Check the size guide for measurements."],
          ].map(([q, a]) => (
            <div key={q} className="rounded-[20px] border border-black/10 p-6">
              <h3 className="text-lg font-bold">{q}</h3>
              <p className="mt-2 text-base text-black/60">{a}</p>
            </div>
          ))}
        </section>
      )}

      {/* You might also like */}
      <section aria-label="You might also like" className="mt-16 md:mt-20">
        <h2 className="text-center font-display text-[32px] leading-[40px] md:text-[48px] md:leading-[58px]">
          YOU MIGHT ALSO LIKE
        </h2>
        <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 md:mt-14 md:grid-cols-4">
          {youMayAlsoLike.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <div className="h-24 md:h-[170px]" aria-hidden="true" />
    </main>
  );
}
