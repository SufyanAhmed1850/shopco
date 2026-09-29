import { useState } from "react";
import { X } from "lucide-react";

/** Black announcement bar — "Sign up and get 20% off to your first order." */
export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;
  return (
    <div className="relative flex h-[38px] items-center justify-center bg-black text-white">
      <p className="text-sm">
        Sign up and get 20% off to your first order.{" "}
        <a href="#" className="font-medium underline underline-offset-2">
          Sign Up Now
        </a>
      </p>
      <button
        type="button"
        aria-label="Dismiss announcement"
        onClick={() => setDismissed(true)}
        className="absolute right-6 cursor-pointer text-white/80 transition-colors hover:text-white md:right-[100px]"
      >
        <X className="size-5" />
      </button>
    </div>
  );
}
