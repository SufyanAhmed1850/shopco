import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        // Primary black pill — matches the design's "Shop Now" / "Add to Cart" buttons
        primary: "bg-black text-white hover:bg-black/85 h-[52px] px-[54px] text-base",
        primarySm: "bg-black text-white hover:bg-black/85 h-12 px-8 text-sm",
        // White pill on dark surfaces
        light: "bg-white text-black hover:bg-white/85 h-12 px-8 text-sm",
        // Outlined pill — "View All", "Load More Reviews"
        outline: "border border-black/10 bg-white hover:bg-black/5 h-[52px] px-10 text-sm",
        ghost: "hover:bg-black/5 h-10 px-4 text-sm",
        icon: "size-10 rounded-full hover:bg-black/5",
      },
    },
    defaultVariants: { variant: "primary" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, type = "button", ...props }, ref) => (
    <button ref={ref} type={type} className={cn(buttonVariants({ variant }), className)} {...props} />
  ),
);
Button.displayName = "Button";

export { Button, buttonVariants };
