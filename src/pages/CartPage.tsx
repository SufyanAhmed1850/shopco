import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Tag, Trash2 } from "lucide-react";
import { Breadcrumbs } from "../components/layout/Breadcrumbs";
import { QuantityStepper } from "../components/product/QuantityStepper";
import { Button } from "../components/ui/button";
import { useCart, PROMO_CODE, type CartLineView } from "../features/cart/cartStore";
import { formatPrice } from "../lib/utils";

function CartRow({ line }: { line: CartLineView }) {
  const { setQuantity, removeLine } = useCart();
  return (
    <div className="flex gap-4 rounded-[20px] border border-black/10 p-4 md:p-6">
      <Link to={`/product/${line.productId}`} className="shrink-0">
        <img
          src={line.product.image}
          alt={line.product.name}
          className="size-[100px] rounded-[12px] bg-[#f0eeed] object-cover md:size-[124px]"
        />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Link to={`/product/${line.productId}`}>
              <h3 className="text-lg font-bold text-black md:text-xl">{line.product.name}</h3>
            </Link>
            <p className="mt-1 text-sm text-black/60">Size: {line.size}</p>
            <p className="text-sm text-black/60">Color: {line.color}</p>
          </div>
          <button
            type="button"
            aria-label={`Remove ${line.product.name} from cart`}
            onClick={() => removeLine(line.productId, line.size, line.color)}
            className="cursor-pointer text-[#ff3333] transition-opacity hover:opacity-60"
          >
            <Trash2 className="size-[22px]" />
          </button>
        </div>
        <div className="mt-auto flex items-center justify-between pt-3">
          <p className="text-xl font-bold md:text-2xl">{formatPrice(line.lineTotal)}</p>
          <QuantityStepper
            small
            quantity={line.quantity}
            onChange={(q) => setQuantity(line.productId, line.size, line.color, q)}
          />
        </div>
      </div>
    </div>
  );
}

export function CartPage() {
  const { lines, subtotal, discount, deliveryFee, total, promoApplied, applyPromo } = useCart();
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);

  const handleApply = () => {
    const ok = applyPromo(code);
    setError(!ok);
    if (ok) setCode("");
  };

  return (
    <main className="mx-auto max-w-[1240px] px-4 md:px-0">
      <div className="mt-6">
        <Breadcrumbs trail={[{ label: "Home", to: "/" }, { label: "Cart" }]} />
      </div>
      <h1 className="mt-6 font-display text-[32px] leading-[40px] md:text-[40px] md:leading-[48px]">
        YOUR CART
      </h1>

      {lines.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-xl text-black/60">Your cart is empty.</p>
          <Link to="/category/casual" className="mt-6 inline-block">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid gap-5 lg:grid-cols-[715px_1fr]">
          {/* Cart lines */}
          <div className="space-y-5">
            {lines.map((line) => (
              <CartRow
                key={`${line.productId}-${line.size}-${line.color}`}
                line={line}
              />
            ))}
          </div>

          {/* Order summary */}
          <aside className="h-fit rounded-[20px] border border-black/10 p-6 md:p-8">
            <h2 className="text-2xl font-bold">Order Summary</h2>
            <dl className="mt-6 space-y-5 text-xl">
              <div className="flex items-center justify-between">
                <dt className="text-black/60">Subtotal</dt>
                <dd className="font-bold">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-black/60">Discount (-20%)</dt>
                <dd className="font-bold text-[#ff3333]">
                  {discount > 0 ? `-${formatPrice(discount)}` : formatPrice(0)}
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-black/60">Delivery Fee</dt>
                <dd className="font-bold">{formatPrice(deliveryFee)}</dd>
              </div>
            </dl>
            <hr className="my-5 border-black/10" />
            <div className="flex items-center justify-between text-xl">
              <span>Total</span>
              <span className="text-2xl font-bold">{formatPrice(total)}</span>
            </div>

            <div className="mt-6 flex gap-3">
              <div className="relative flex-1">
                <Tag className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-black/40" />
                <input
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                    setError(false);
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleApply()}
                  placeholder="Add promo code"
                  aria-label="Promo code"
                  className="h-12 w-full rounded-full bg-[#f0f0f0] pr-4 pl-12 text-sm placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-black/20"
                />
              </div>
              <Button variant="primarySm" className="h-12 w-[119px]" onClick={handleApply}>
                Apply
              </Button>
            </div>
            {promoApplied && (
              <p className="mt-2 text-sm text-green-700">
                Promo code {PROMO_CODE} applied — 20% off.
              </p>
            )}
            {error && (
              <p className="mt-2 text-sm text-[#ff3333]">
                That code doesn&rsquo;t look right. Try {PROMO_CODE}.
              </p>
            )}

            <Button className="mt-6 h-[60px] w-full text-base" onClick={() => {}}>
              Go to Checkout <ArrowRight className="size-5" />
            </Button>
          </aside>
        </div>
      )}

      <div className="h-24 md:h-[170px]" aria-hidden="true" />
    </main>
  );
}
