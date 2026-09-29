import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full px-3 py-1.5 text-xs font-medium",
  {
    variants: {
      variant: {
        // "-20%" discount pill
        sale: "bg-[#ff3333]/10 text-[#ff3333]",
        dark: "bg-black text-white",
      },
    },
    defaultVariants: { variant: "sale" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
