import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import type { Product } from "../../data/products";
import { productById } from "../../data/products";

/** A line in the cart: product + variant + quantity. */
export interface CartLine {
  productId: string;
  size: string;
  color: string;
  quantity: number;
}

interface CartState {
  lines: CartLine[];
  promoApplied: boolean;
}

type CartAction =
  | { type: "add"; line: CartLine }
  | { type: "remove"; productId: string; size: string; color: string }
  | { type: "setQuantity"; productId: string; size: string; color: string; quantity: number }
  | { type: "applyPromo" }
  | { type: "clear" };

const STORAGE_KEY = "shopco-cart-v1";
export const PROMO_CODE = "SAVE20";
const PROMO_RATE = 0.2;
const DELIVERY_FEE = 15;

function init(): CartState {
  // Default cart matches the design's cart page so the route is pixel-faithful
  // on first visit; afterwards localStorage wins.
  const fallback: CartState = {
    lines: [
      { productId: "gradient-graphic-t-shirt", size: "Large", color: "White", quantity: 1 },
      { productId: "checkered-shirt", size: "Medium", color: "Red", quantity: 1 },
      { productId: "skinny-fit-jeans", size: "Large", color: "Blue", quantity: 1 },
    ],
    promoApplied: true,
  };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as CartState;
    if (!Array.isArray(parsed.lines)) return fallback;
    return { lines: parsed.lines, promoApplied: !!parsed.promoApplied };
  } catch {
    return fallback;
  }
}

function sameLine(a: CartLine, b: Pick<CartLine, "productId" | "size" | "color">) {
  return a.productId === b.productId && a.size === b.size && a.color === b.color;
}

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "add": {
      const existing = state.lines.find((l) => sameLine(l, action.line));
      if (existing) {
        return {
          ...state,
          lines: state.lines.map((l) =>
            sameLine(l, action.line) ? { ...l, quantity: l.quantity + action.line.quantity } : l,
          ),
        };
      }
      return { ...state, lines: [...state.lines, action.line] };
    }
    case "remove":
      return { ...state, lines: state.lines.filter((l) => !sameLine(l, action)) };
    case "setQuantity": {
      if (action.quantity <= 0) {
        return { ...state, lines: state.lines.filter((l) => !sameLine(l, action)) };
      }
      return {
        ...state,
        lines: state.lines.map((l) =>
          sameLine(l, action) ? { ...l, quantity: action.quantity } : l,
        ),
      };
    }
    case "applyPromo":
      return { ...state, promoApplied: true };
    case "clear":
      return { lines: [], promoApplied: false };
  }
}

export interface CartLineView extends CartLine {
  product: Product;
  lineTotal: number;
}

interface CartContextValue {
  lines: CartLineView[];
  count: number;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  promoApplied: boolean;
  addLine: (line: CartLine) => void;
  removeLine: (productId: string, size: string, color: string) => void;
  setQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  applyPromo: (code: string) => boolean;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, init);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage unavailable — cart still works in memory */
    }
  }, [state]);

  const addLine = useCallback((line: CartLine) => dispatch({ type: "add", line }), []);
  const removeLine = useCallback(
    (productId: string, size: string, color: string) =>
      dispatch({ type: "remove", productId, size, color }),
    [],
  );
  const setQuantity = useCallback(
    (productId: string, size: string, color: string, quantity: number) =>
      dispatch({ type: "setQuantity", productId, size, color, quantity }),
    [],
  );
  const applyPromo = useCallback((code: string) => {
    if (code.trim().toUpperCase() === PROMO_CODE) {
      dispatch({ type: "applyPromo" });
      return true;
    }
    return false;
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const lines: CartLineView[] = state.lines.flatMap((l) => {
      const product = productById(l.productId);
      if (!product) return [];
      return [{ ...l, product, lineTotal: product.price * l.quantity }];
    });
    const subtotal = lines.reduce((sum, l) => sum + l.lineTotal, 0);
    const discount = state.promoApplied ? Math.round(subtotal * PROMO_RATE) : 0;
    const deliveryFee = lines.length > 0 ? DELIVERY_FEE : 0;
    const total = subtotal - discount + deliveryFee;
    const count = lines.reduce((sum, l) => sum + l.quantity, 0);
    return {
      lines,
      count,
      subtotal,
      discount,
      deliveryFee,
      total,
      promoApplied: state.promoApplied,
      addLine,
      removeLine,
      setQuantity,
      applyPromo,
    };
  }, [state, addLine, removeLine, setQuantity, applyPromo]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
