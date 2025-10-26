import { useState } from "react";
import ItemGrid from "./components/ItemGrid";
import Shop from "./components/Shop";
import WorldMap from "./components/WorldMap";

/** Grid dimensions */
const rows = 10;
const cols = 10;

/** Names of the available shapes */
export type ShapeKey = "I" | "L" | "T" | "S" | "O" | "Z";

/** A single cell offset that defines a polyomino shape */
export type ShapeCoord = [number, number];

/** Map of shape name to its block coordinates */
export type ShapeMap = Record<ShapeKey, ShapeCoord[]>;

/** The rotation of a placed or grabbed item */
export type Orientation = 0 | 1 | 2 | 3;

/** An item that lives on the grid */
export interface GridItem {
  id: number;
  shape: ShapeKey;
  row: number;
  col: number;
  color: string;
  orientation: Orientation;
  price: number;
}

/** A shop catalog entry (infinite stock) */
export interface ShopItem {
  id: string;
  shape: ShapeKey;
  color: string;
  price: number;
}

/** Offset inside the rotated shape the user clicked (used while grabbing) */
export interface Offset {
  r: number;
  c: number;
}

/** Item picked up from the grid */
export interface GrabbedFromGrid {
  fromShop?: false;
  id: number;
  shape: ShapeKey;
  color: string;
  orientation: Orientation;
  price: number;
  offset?: Offset;
}

/** Item picked up from the shop */
export interface GrabbedFromShop {
  fromShop: true;
  id: null;
  shape: ShapeKey;
  color: string;
  orientation: Orientation;
  price: number;
  offset?: Offset;
}

/** Discriminated union for the currently grabbed item */
export type Grabbed = GrabbedFromGrid | GrabbedFromShop;

/** Initial base shapes */
const shapes = {
  I: [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
  ],
  L: [
    [0, 0],
    [1, 0],
    [2, 0],
    [2, 1],
  ],
  T: [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, 2],
  ],
  S: [
    [0, 1],
    [0, 2],
    [1, 0],
    [1, 1],
  ],
  O: [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1],
  ],
  Z: [
    [0, 0],
    [0, 1],
    [1, 1],
    [1, 2],
  ],
} satisfies ShapeMap;

/** Initial items placed on the grid */
const initialItems: GridItem[] = [
  {
    id: 1,
    shape: "L",
    row: 0,
    col: 0,
    color: "#f48fb1",
    orientation: 0,
    price: 5,
  },
  {
    id: 2,
    shape: "I",
    row: 2,
    col: 5,
    color: "#90caf9",
    orientation: 0,
    price: 5,
  },
  {
    id: 3,
    shape: "T",
    row: 5,
    col: 1,
    color: "#a5d6a7",
    orientation: 0,
    price: 5,
  },
  {
    id: 4,
    shape: "S",
    row: 7,
    col: 5,
    color: "#ffcc80",
    orientation: 0,
    price: 5,
  },
];

/** Shop inventory (infinite quantity) */
const shopItems: ShopItem[] = [
  { id: "shop-I", shape: "I", color: "#90caf9", price: 5 },
  { id: "shop-L", shape: "L", color: "#f48fb1", price: 5 },
  { id: "shop-T", shape: "T", color: "#a5d6a7", price: 5 },
  { id: "shop-S", shape: "S", color: "#ffcc80", price: 5 },
  { id: "shop-O", shape: "O", color: "#9575cd", price: 5 },
  { id: "shop-Z", shape: "Z", color: "#4db6ac", price: 5 },
];

/**
 * Top-level component: enthält Spielfeld, Shop und Status (Gold, Items, Grab).
 */
export default function App() {
  const [items, setItems] = useState<GridItem[]>(initialItems);
  const [grabbed, setGrabbed] = useState<Grabbed | null>(null);
  const [gold, setGold] = useState<number>(20);
  const [currentCity, setCurrentCity] = useState<string | null>(null);

  /**
   * Stück aus dem Grid aufnehmen. r/c sind die Koordinaten des
   * angeklickten Blocks innerhalb der rotierten Form.
   */
  function handleGrab(id: number, r: number, c: number): void {
    if (grabbed != null) return;
    setItems((prev) => {
      const item = prev.find((it) => it.id === id);
      if (!item) return prev;
      setGrabbed({ ...item, offset: { r, c } });
      return prev.filter((it) => it.id !== id);
    });
  }

  /**
   * Stück aus dem Shop aufnehmen. Es erhält keine id, da es neu erzeugt wird,
   * sobald es erfolgreich platziert wird.
   */
  function handleGrabShopItem(item: ShopItem, r: number, c: number): void {
    if (grabbed != null) return;
    const picked: GrabbedFromShop = {
      id: null,
      shape: item.shape,
      color: item.color,
      orientation: 0,
      price: item.price,
      fromShop: true,
      offset: { r, c },
    };
    setGrabbed(picked);
  }

  /**
   * Verkaufe das aktuell gehaltene Stück (nur Grid-Stücke). Preis wird gutgeschrieben.
   */
  function handleSellGrabbed(): void {
    setGrabbed((curr) => {
      if (!curr || curr.fromShop) return curr;
      const refund = curr.price ?? 0;
      setGold((g) => g + refund);
      return null;
    });
  }

  /**
   * Stück platzieren: unterscheide Kauf aus dem Shop und normales
   * Umpositionieren. Für Shopstücke wird der Preis abgezogen und eine neue id
   * vergeben. Für Gridstücke bleibt die id erhalten.
   */
  function handlePlaceGrabbed(row: number, col: number): void {
    if (!grabbed) return;

    if (grabbed.fromShop) {
      const cost = grabbed.price ?? 0;
      if (gold < cost) return;

      setGold((g) => g - cost);
      setItems((prev) => {
        const nextId =
          (prev.length ? Math.max(...prev.map((it) => it.id)) : 0) + 1;

        const next: GridItem = {
          id: nextId,
          shape: grabbed.shape,
          row,
          col,
          color: grabbed.color,
          orientation: grabbed.orientation ?? 0,
          price: grabbed.price,
        };
        return [...prev, next];
      });
      setGrabbed(null);
    } else {
      // Teil neu positionieren
      const moved: GridItem = {
        id: grabbed.id,
        shape: grabbed.shape,
        row,
        col,
        color: grabbed.color,
        orientation: grabbed.orientation ?? 0,
        price: grabbed.price ?? 0,
      };
      setItems((prev) => [...prev, moved]);
      setGrabbed(null);
    }
  }

  /**
   * Stück rotieren, inklusive Anpassung des Offset (damit der gewählte Block
   * weiterhin die Mausposition repräsentiert).
   */
  function handleRotateGrabbed(): void {
    function rotateOne([row, col]: [number, number]): [number, number] {
      return [col, -row];
    }

    setGrabbed((curr) => {
      if (!curr) return curr;

      const newOrientation = (((curr.orientation ?? 0) + 1) % 4) as Orientation;

      let newOffset = curr.offset;
      if (newOffset) {
        const [r, c] = rotateOne([newOffset.r, newOffset.c]);
        const minR = Math.min(r, 0);
        const minC = Math.min(c, 0);
        newOffset = { r: r - minR, c: c - minC };
      }

      return { ...curr, orientation: newOrientation, offset: newOffset };
    });
  }

  const handleCitySelect = (city: string) => {
    setCurrentCity(city);
  };

  const handleBackToMap = () => {
    setCurrentCity(null);
  };

  return (
    <div className='p-4'>
      {currentCity === null ? (
        <WorldMap onCitySelect={handleCitySelect} />
      ) : (
        <>
          <div className='flex'>
            <div className='grow'>
              <ItemGrid
                rows={rows}
                cols={cols}
                shapes={shapes}
                items={items}
                grabbed={grabbed}
                onGrab={handleGrab}
                onPlaceGrabbed={handlePlaceGrabbed}
                onRotateGrabbed={handleRotateGrabbed}
              />
            </div>
            <Shop
              shopItems={shopItems}
              shapes={shapes}
              gold={gold}
              grabbed={grabbed}
              onGrabShopItem={handleGrabShopItem}
              onSellGrabbed={handleSellGrabbed}
              onBackToMap={handleBackToMap}
              currentCity={currentCity}
            />
          </div>
        </>
      )}
    </div>
  );
}
