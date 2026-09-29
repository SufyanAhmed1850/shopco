import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { testimonials } from "../../data/content";
import { VerifiedIcon } from "../../components/icons";
import { StarIcon } from "../../components/icons";

/** "OUR HAPPY CUSTOMERS" — testimonial carousel. */
export function Testimonials() {
  const railRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    railRef.current?.scrollBy({ left: dir * 420, behavior: "smooth" });
  };

  return (
    <section aria-label="Customer testimonials" className="mx-auto max-w-[1240px] px-4 md:px-0">
      <div className="flex items-end justify-between gap-6">
        <h2 className="font-display text-[32px] leading-[40px] text-black md:text-[48px] md:leading-[58px]">
          OUR HAPPY CUSTOMERS
        </h2>
        <div className="hidden gap-4 md:flex">
          <button
            type="button"
            aria-label="Previous testimonials"
            onClick={() => scrollBy(-1)}
            className="cursor-pointer text-black transition-opacity hover:opacity-60"
          >
            <ArrowLeft className="size-6" />
          </button>
          <button
            type="button"
            aria-label="Next testimonials"
            onClick={() => scrollBy(1)}
            className="cursor-pointer text-black transition-opacity hover:opacity-60"
          >
            <ArrowRight className="size-6" />
          </button>
        </div>
      </div>

      <div
        ref={railRef}
        className="rail-scroll -mx-4 mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-2 md:mt-10 md:mx-0 md:px-0"
      >
        {testimonials.map((t) => (
          <article
            key={t.name}
            className="w-[320px] shrink-0 snap-start rounded-[20px] border border-black/10 bg-white p-7 md:w-[400px] md:p-8"
          >
            <div className="flex gap-[5px]" aria-label={`Rated ${t.rating} out of 5`}>
              {Array.from({ length: t.rating }, (_, i) => (
                <StarIcon key={i} className="size-[19px]" />
              ))}
            </div>
            <h3 className="mt-4 flex items-center gap-1.5 text-xl font-bold text-black">
              {t.name}
              {t.verified !== false && <VerifiedIcon />}
            </h3>
            <p className="mt-3 text-base leading-[22px] text-black/60">&ldquo;{t.text}&rdquo;</p>
          </article>
        ))}
      </div>
    </section>
  );
}
