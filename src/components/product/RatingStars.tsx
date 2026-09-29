import { StarIcon } from "../icons";
import { cn } from "../../lib/utils";

/** Row of 5 stars with fractional fill + "4.5/5" label, as in the design. */
export function RatingStars({
  rating,
  className = "",
  starClass = "size-[19px]",
}: {
  rating: number;
  className?: string;
  starClass?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-[5px]", className)}>
      <span className="flex gap-[5px]" aria-label={`Rated ${rating} out of 5`}>
        {Array.from({ length: 5 }, (_, i) => (
          <StarIcon key={i} fill={Math.max(0, Math.min(1, rating - i))} className={starClass} />
        ))}
      </span>
      <span className="text-sm text-black/60">
        {rating.toFixed(1)}
        <span className="text-black/40">/5</span>
      </span>
    </span>
  );
}
