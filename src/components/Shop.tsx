import ShopItemCard from "./ShopItem"; // visual component (was ./ShopItem.js)
import type { ShapeMap, Grabbed, ShopItem as ShopCatalogItem } from "../App";

export interface ShopProps {
  shopItems: ShopCatalogItem[];
  shapes: ShapeMap;
  gold: number;
  grabbed: Grabbed | null;
  onGrabShopItem: (item: ShopCatalogItem, r: number, c: number) => void;
  onSellGrabbed: () => void;
  onBackToMap: () => void;
  currentCity: string;
}

/**
 * Shop zeigt verfügbare Teile, ihren Preis und das Goldbudget.
 * Ein Klick auf ein Teil nimmt es auf (sofern gerade kein Teil gehalten wird).
 * Klickt man mit einem gehaltenen Grid-Teil auf den Shop, wird es verkauft.
 */
export default function Shop({
  shopItems,
  shapes,
  gold,
  grabbed,
  onGrabShopItem,
  onSellGrabbed,
  onBackToMap,
  currentCity,
}: ShopProps) {
  return (
    <div
      className='p-4 border-l border-gray-300 flex flex-col items-center'
      style={{ minWidth: "200px" }}
      onClick={() => {
        // Beim Klick mit gehaltenem Grid-Teil verkaufen
        if (grabbed && !grabbed.fromShop) {
          onSellGrabbed();
        }
      }}
    >
      <div className='flex flex-col items-center w-full mb-4'>
        <button
          onClick={onBackToMap}
          className='mb-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors'
        >
          Back to Map
        </button>
        <div className='text-lg font-semibold'>Shop - {currentCity}</div>
        <div className='mt-2'>Gold: {gold}</div>
      </div>

      {/* Shopartikel */}
      <div className='flex flex-col space-y-2 w-full items-center'>
        {shopItems.map((item) => (
          <div
            key={item.id}
            className='flex items-center justify-between w-full'
          >
            <ShopItemCard
              coords={shapes[item.shape]}
              color={item.color}
              disabled={!!grabbed}
              onClick={(r: number, c: number) => onGrabShopItem(item, r, c)}
            />
            <span className='ml-2 text-sm'>{item.price}g</span>
          </div>
        ))}
      </div>

      <div className='mt-4 text-sm text-gray-600 text-center'>
        Drop a held piece here to sell
      </div>
    </div>
  );
}
