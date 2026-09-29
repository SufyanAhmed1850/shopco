/** Inline SVG icons matching the Figma design. */

import { asset } from "../lib/utils";

/** Gold rating star with fractional fill support. */
export function StarIcon({
  fill = 1,
  className = "",
}: {
  fill?: number; // 0..1
  className?: string;
}) {
  const pct = Math.max(0, Math.min(1, fill)) * 100;
  const id = `star-${Math.round(pct)}`;
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={id}>
          <stop offset={`${pct}%`} stopColor="#FFC633" />
          <stop offset={`${pct}%`} stopColor="#E5E5E5" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${id})`}
        d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 14.9l-5.3 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z"
      />
    </svg>
  );
}

/** Four-point sparkle used in the hero. */
export function SparkleIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path
        d="M50 0 C54 35 65 46 100 50 C65 54 54 65 50 100 C46 65 35 54 0 50 C35 46 46 35 50 0 Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Green verified check used next to reviewer names. */
export function VerifiedIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden="true">
      <circle cx="10" cy="10" r="10" fill="#01AB31" />
      <path
        d="M6.5 10.2l2.4 2.4 4.6-5"
        stroke="#fff"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Social icons (lucide-react no longer ships brand icons). */
function SocialSvg({ path, className = "size-3.5" }: { path: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d={path} />
    </svg>
  );
}

export function TwitterIcon({ className }: { className?: string }) {
  return (
    <SocialSvg
      className={className}
      path="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-4.9-6.4L6.4 22H3.3l7.3-8.3L1.6 2H8l4.4 5.9L18.9 2zm-1.1 17.8h1.7L7 3.9H5.2l12.6 15.9z"
    />
  );
}

export function FacebookIcon({ className }: { className?: string }) {
  return (
    <SocialSvg
      className={className}
      path="M13.5 22v-8.2h2.8l.4-3.2h-3.2V8.5c0-.9.3-1.6 1.6-1.6h1.7V4c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.4H7.3v3.2h2.8V22h3.4z"
    />
  );
}

export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className ?? "size-3.5"} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function GithubIcon({ className }: { className?: string }) {
  return (
    <SocialSvg
      className={className}
      path="M12 2C6.5 2 2 6.5 2 12c0 4.4 2.9 8.2 6.8 9.5.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.2-3.4-1.2-.4-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.2-.4-1.3.1-2.6 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.3.2 2.4.1 2.6.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10 10 0 0 0 22 12c0-5.5-4.5-10-10-10z"
    />
  );
}
export function ZaraLogo({ className = "" }: { className?: string }) {
  return <img src={asset("assets/zara.svg")} alt="Zara" className={className} />;
}

export function GucciLogo({ className = "" }: { className?: string }) {
  return <img src={asset("assets/gucci.svg")} alt="Gucci" className={className} />;
}

export function VersaceLogo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-display text-white tracking-wide ${className}`}
      style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 700 }}
    >
      VERSACE
    </span>
  );
}

export function PradaLogo({ className = "" }: { className?: string }) {
  return (
    <span className={`font-sans text-white font-medium ${className}`} style={{ letterSpacing: "0.35em" }}>
      PRADA
    </span>
  );
}

export function CalvinKleinLogo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`text-white ${className}`}
      style={{ fontFamily: "'Brush Script MT', 'Segoe Script', cursive", fontSize: "1.35em" }}
    >
      Calvin Klein
    </span>
  );
}

/** Payment badges in the footer. */
function BadgeShell({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <span
      role="img"
      aria-label={label}
      className="inline-flex h-[26px] min-w-[46px] items-center justify-center rounded-[5px] border border-black/10 bg-white px-2"
    >
      {children}
    </span>
  );
}

export function VisaBadge() {
  return (
    <BadgeShell label="Visa">
      <span className="text-[11px] font-black italic tracking-tight text-[#1434CB]">VISA</span>
    </BadgeShell>
  );
}

export function MastercardBadge() {
  return (
    <BadgeShell label="Mastercard">
      <svg viewBox="0 0 28 18" className="h-[16px]" aria-hidden="true">
        <circle cx="11" cy="9" r="7" fill="#EB001B" />
        <circle cx="17" cy="9" r="7" fill="#F79E1B" fillOpacity="0.9" />
      </svg>
    </BadgeShell>
  );
}

export function PaypalBadge() {
  return (
    <BadgeShell label="PayPal">
      <span className="text-[10px] font-black italic tracking-tight">
        <span className="text-[#179BD7]">Pay</span>
        <span className="text-[#0a4d8c]">Pal</span>
      </span>
    </BadgeShell>
  );
}

export function ApplePayBadge() {
  return (
    <BadgeShell label="Apple Pay">
      <span className="text-[10px] font-semibold text-black"> Pay</span>
    </BadgeShell>
  );
}

export function GPayBadge() {
  return (
    <BadgeShell label="Google Pay">
      <span className="text-[10px] font-bold">
        <span className="text-[#4285F4]">G</span> <span className="text-black/70">Pay</span>
      </span>
    </BadgeShell>
  );
}
