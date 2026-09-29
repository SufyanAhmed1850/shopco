import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export function Breadcrumbs({ trail }: { trail: Array<{ label: string; to?: string }> }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-black/60">
      {trail.map((crumb, i) => {
        const last = i === trail.length - 1;
        return (
          <span key={crumb.label} className="flex items-center gap-2">
            {crumb.to && !last ? (
              <Link to={crumb.to} className="transition-colors hover:text-black">
                {crumb.label}
              </Link>
            ) : (
              <span className={last ? "text-black" : ""}>{crumb.label}</span>
            )}
            {!last && <ChevronRight className="size-4 text-black/40" />}
          </span>
        );
      })}
    </nav>
  );
}
