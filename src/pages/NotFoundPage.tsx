import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

export function NotFoundPage() {
  return (
    <main className="mx-auto max-w-[1240px] px-4 py-24 text-center">
      <h1 className="font-display text-[48px] leading-[58px]">404</h1>
      <p className="mt-4 text-lg text-black/60">This page doesn&rsquo;t exist.</p>
      <Link to="/" className="mt-8 inline-block">
        <Button>Back to Home</Button>
      </Link>
    </main>
  );
}
