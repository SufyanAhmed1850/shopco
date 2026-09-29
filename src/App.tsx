import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./features/cart/cartStore";
import { AnnouncementBar } from "./components/layout/AnnouncementBar";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { RouteTransition } from "./components/RouteTransition";

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <CartProvider>
        <AnnouncementBar />
        <Header />
        <RouteTransition />
        <Footer />
      </CartProvider>
    </BrowserRouter>
  );
}
