import { startTransition, useEffect, useState, ViewTransition } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { CategoryPage } from "../pages/CategoryPage";
import { ProductDetailPage } from "../pages/ProductDetailPage";
import { CartPage } from "../pages/CartPage";
import { NotFoundPage } from "../pages/NotFoundPage";

/**
 * Page transitions powered by React 19's <ViewTransition>.
 *
 * React Router doesn't wrap navigations in startTransition (and view
 * transitions only fire for transition updates), so the displayed location is
 * deferred by one transition: the URL updates immediately, the route tree
 * re-renders inside startTransition, and <ViewTransition> animates the swap —
 * including shared-element morphs for elements with matching names
 * (e.g. product card image -> product gallery image).
 */
export function RouteTransition() {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);

  useEffect(() => {
    if (location.key !== displayLocation.key) {
      startTransition(() => {
        setDisplayLocation(location);
        window.scrollTo(0, 0);
      });
    }
  }, [location, displayLocation]);

  return (
    <ViewTransition name="page">
      <Routes location={displayLocation}>
        <Route path="/" element={<HomePage />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ViewTransition>
  );
}
