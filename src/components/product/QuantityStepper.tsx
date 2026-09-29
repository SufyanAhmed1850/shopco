import { Minus, Plus } from "lucide-react";
import { cn } from "../../lib/utils";

/** Pill quantity stepper used on the product and cart pages. */
export function QuantityStepper({
  quantity,
  onChange,
  className = "",
  small = false,
}: {
  quantity: number;
  onChange: (next: number) => void;
  className?: string;
  small?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-full bg-[#f0f0f0]",
        small ? "h-[44px] w-[126px] px-4" : "h-[52px] w-[170px] px-5",
        className,
      )}
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(quantity - 1)}
        className="cursor-pointer text-black transition-opacity hover:opacity-60"
      >
        <Minus className="size-5" />
      </button>
      <span className="min-w-6 text-center text-base font-medium" aria-live="polite">
        {quantity}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(quantity + 1)}
        className="cursor-pointer text-black transition-opacity hover:opacity-60"
      >
        <Plus className="size-5" />
      </button>
    </div>
  );
}
