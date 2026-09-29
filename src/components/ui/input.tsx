import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const inputVariants = cva(
  "flex w-full rounded-full bg-white text-sm text-black placeholder:text-black/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        // Search bar in the header
        search: "h-12 bg-[#f0f0f0] pl-12 pr-4",
        // Newsletter email field
        newsletter: "h-12 px-6",
        // Promo code field on the cart page
        promo: "h-12 bg-[#f0f0f0] pl-12 pr-4",
      },
    },
    defaultVariants: { variant: "newsletter" },
  },
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, type = "text", ...props }, ref) => (
    <input ref={ref} type={type} className={cn(inputVariants({ variant }), className)} {...props} />
  ),
);
Input.displayName = "Input";

export { Input };
