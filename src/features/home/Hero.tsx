import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { SparkleIcon } from "../../components/icons";
import { asset } from "../../lib/utils";

/** Hero section — 1440×663, bg #f2f0f1, headline + stats + model photo. */
export function Hero() {
  const stats: Array<[string, string]> = [
    ["200+", "International Brands"],
    ["2,000+", "High-Quality Products"],
    ["30,000+", "Happy Customers"],
  ];

  return (
    <section className="relative overflow-hidden bg-[#f2f0f1]">
      <div className="relative mx-auto max-w-[1440px]">
        <div className="absolute inset-0 hidden overflow-hidden md:block" aria-hidden="true">
          <img
            src={asset("assets/hero.jpg")}
            alt=""
            fetchPriority="high"
            className="absolute top-[-7%] left-[49.6%] h-[152%] w-[46.7%] max-w-none object-cover"
          />
        </div>

        <div className="relative px-4 pt-16 pb-12 md:px-[100px] md:pt-[103px] md:pb-[116px]">
          <img
            src={asset("assets/hero.jpg")}
            alt="Models wearing SHOP.CO clothing"
            className="mb-8 aspect-[4/5] w-full rounded-[20px] object-cover object-top md:hidden"
          />
          <SparkleIcon className="absolute top-[90px] left-[750px] hidden w-[56px] text-black md:block" />
          <SparkleIcon className="absolute top-[86px] right-[105px] hidden w-[104px] text-black md:block" />

          <h1 className="max-w-[577px] font-display text-[36px] leading-[36px] text-black md:text-[64px] md:leading-[64px]">
            FIND CLOTHES THAT MATCHES YOUR STYLE
          </h1>
          <p className="mt-5 max-w-[545px] text-base leading-[22px] text-black/60 md:mt-8">
            Browse through our diverse range of meticulously crafted garments, designed to bring out
            your individuality and cater to your sense of style.
          </p>
          <Link to="/category/casual" className="mt-8 inline-block md:mt-10">
            <Button className="w-[210px]">Shop Now</Button>
          </Link>

          <dl className="mt-12 flex max-w-[596px] flex-wrap items-center gap-x-8 gap-y-6 md:mt-[52px]">
            {stats.map(([value, label], i) => (
              <div
                key={label}
                className={i > 0 ? "border-l border-black/10 pl-8" : ""}
              >
                <dt className="sr-only">{label}</dt>
                <dd className="text-[32px] leading-none font-bold text-black md:text-[40px]">
                  {value}
                </dd>
                <dd className="mt-2 text-sm text-black/60 md:text-base">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
