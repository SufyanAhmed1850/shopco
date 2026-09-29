import {
  CalvinKleinLogo,
  GucciLogo,
  PradaLogo,
  VersaceLogo,
  ZaraLogo,
} from "../../components/icons";

/** Black brand strip below the hero. */
export function BrandStrip() {
  return (
    <section aria-label="Featured brands" className="bg-black">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-center gap-x-16 gap-y-4 px-6 py-10 md:justify-between md:px-[100px]">
        <VersaceLogo className="text-[28px] md:text-[34px]" />
        <ZaraLogo className="h-[26px] w-auto md:h-[32px]" />
        <GucciLogo className="h-[28px] w-auto md:h-[36px]" />
        <PradaLogo className="text-[20px] md:text-[26px]" />
        <CalvinKleinLogo className="text-[26px] md:text-[32px]" />
      </div>
    </section>
  );
}
