import { Link } from "react-router-dom";
import { dressStyles } from "../../data/content";
import { cn } from "../../lib/utils";

/** "BROWSE BY DRESS STYLE" — gray rounded panel with 4 image cards. */
export function DressStyles() {
  return (
    <section className="mx-auto max-w-[1240px] px-4 md:px-0">
      <div className="rounded-[40px] bg-[#f0f0f0] px-6 py-10 md:px-16 md:py-[70px]">
        <h2 className="text-center font-display text-[32px] leading-[40px] text-black md:text-[48px] md:leading-[58px]">
          BROWSE BY DRESS STYLE
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-5 md:mt-16 md:grid-cols-5">
          {dressStyles.map((style) => (
            <Link
              key={style.slug}
              to={`/category/${style.slug}`}
              className={cn(
                "group relative block min-h-[190px] overflow-hidden rounded-[20px] bg-white md:min-h-[289px]",
                style.span === "wide" ? "md:col-span-2" : "md:col-span-3",
              )}
            >
              <img
                src={style.image}
                alt={`${style.label} style`}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <span className="absolute top-6 left-9 text-2xl font-bold text-black md:top-[25px] md:left-[36px] md:text-4xl">
                {style.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
