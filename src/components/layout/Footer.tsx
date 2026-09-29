import { useState } from "react";
import { Mail } from "lucide-react";
import { Logo } from "./Header";
import { footerColumns } from "../../data/content";
import {
  ApplePayBadge,
  FacebookIcon,
  GPayBadge,
  GithubIcon,
  InstagramIcon,
  MastercardBadge,
  PaypalBadge,
  TwitterIcon,
  VisaBadge,
} from "../icons";
import { cn } from "../../lib/utils";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <div className="flex flex-col items-center justify-between gap-8 rounded-[20px] bg-black px-8 py-9 md:flex-row md:px-16">
        <h2 className="max-w-[551px] text-center font-display text-[32px] leading-[40px] text-white md:text-left md:text-[40px] md:leading-[45px]">
          STAY UPTO DATE ABOUT OUR LATEST OFFERS
        </h2>
        <form
          className="flex w-full max-w-[349px] flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (email.trim()) setDone(true);
          }}
        >
          <div className="relative">
            <Mail className="pointer-events-none absolute top-1/2 left-5 size-5 -translate-y-1/2 text-black/40" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              aria-label="Email address"
              className="h-12 w-full rounded-full bg-white pr-4 pl-12 text-sm text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-white/40"
            />
          </div>
          <button
            type="submit"
            className="h-12 w-full cursor-pointer rounded-full bg-white text-sm font-medium text-black transition-colors hover:bg-white/85"
          >
            {done ? "You're subscribed!" : "Subscribe to Newsletter"}
          </button>
        </form>
    </div>
  );
}

const socials = [
  { Icon: TwitterIcon, label: "Twitter" },
  { Icon: FacebookIcon, label: "Facebook" },
  { Icon: InstagramIcon, label: "Instagram" },
  { Icon: GithubIcon, label: "GitHub" },
];

export function Footer() {
  return (
    <footer>
      {/* Newsletter card overlaps the gray footer by 90px, like in the design */}
      <div className="relative z-10 mx-auto -mb-[90px] max-w-[1240px] px-4 md:px-0">
        <Newsletter />
      </div>

      <div className="bg-[#f0f0f0] pt-[180px]">
        <div className="mx-auto max-w-[1240px] px-4 pb-10 md:px-0">
        <div className="grid gap-10 md:grid-cols-[248px_1fr]">
          <div>
            <Logo />
            <p className="mt-6 max-w-[248px] text-sm leading-[22px] text-black/60">
              We have clothes that suits your style and which you&rsquo;re proud to wear. From women
              to men.
            </p>
            <div className="mt-8 flex gap-3">
              {socials.map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className={cn(
                    "flex size-7 items-center justify-center rounded-full border border-black/20",
                    "text-black transition-colors hover:bg-black hover:text-white",
                  )}
                >
                  <Icon className="size-3.5" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h3 className="text-base font-medium tracking-[3px] text-black uppercase">
                  {col.title}
                </h3>
                <ul className="mt-6 space-y-4">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-base text-black/60 transition-colors hover:text-black"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <hr className="mt-12 border-black/10" />

        <div className="mt-6 flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-black/60">Shop.co &copy; 2000-2023, All rights reserved</p>
          <div className="flex gap-2.5">
            <VisaBadge />
            <MastercardBadge />
            <PaypalBadge />
            <ApplePayBadge />
            <GPayBadge />
          </div>
        </div>
        </div>
      </div>
    </footer>
  );
}
