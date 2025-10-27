import { useEffect, useMemo, useRef, useState } from "react";
import type { MouseEvent } from "react";
import TetrisItem from "./TetrisItem";
import type { ShapeMap, GridItem, Grabbed, Orientation } from "../App"; // adjust the import path if your types live elsewhere

/** A single cell offset */
type Coord = [number, number];

interface PreviewState {
  cells: string[]; // "r-c" keys
  valid: boolean;
}

interface HoverCell {
  row: number;
  col: number;
}

export interface ItemGridProps {
  rows: number;
  cols: number;
  items: GridItem[];
  shapes: ShapeMap;
  grabbed: Grabbed | null;
  onGrab: (id: number, r: number, c: number) => void;
  onPlaceGrabbed: (row: number, col: number) => void;
  onRotateGrabbed: () => void;
}

/**
 * Rotate an array of [row, col] coordinates by 90° steps.
 * After each rotation the coords are normalized so that the
 * smallest row/col becomes zero.
 */
function rotateCoords(
  coords: Coord[],
  orientation: Orientation | number
): Coord[] {
  let rotated: Coord[] = coords.map(([r, c]) => [r, c]);
  for (let i = 0; i < orientation; i++) {
    rotated = rotated.map(([r, c]) => [c, -r]);
    const minR = Math.min(...rotated.map(([r]) => r));
    const minC = Math.min(...rotated.map(([, c]) => c));
    rotated = rotated.map(([r, c]) => [r - minR, c - minC]);
  }
  return rotated;
}

/**
 * Grid component: allows grabbing, rotating (right click) and placing pieces.
 * A blue preview shows a valid placement; red indicates a collision/out-of-bounds.
 */
export default function ItemGrid({
  rows,
  cols,
  items,
  shapes,
  grabbed,
  onGrab,
  onPlaceGrabbed,
  onRotateGrabbed,
}: ItemGridProps) {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [floatCell, setFloatCell] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [preview, setPreview] = useState<PreviewState>({
    cells: [],
    valid: false,
  });
  const [lastHover, setLastHover] = useState<HoverCell | null>(null);

  // Recompute the preview after rotations or on release.
  useEffect(() => {
    if (!grabbed) {
      setPreview({ cells: [], valid: false });
      setLastHover(null);
    } else if (lastHover) {
      handleCellEnter(lastHover.row, lastHover.col);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grabbed]);

  // Build a set of occupied grid coordinates from placed pieces
  const occupied = useMemo<Set<string>>(() => {
    const occ = new Set<string>();
    items.forEach((item) => {
      const coords = rotateCoords(shapes[item.shape], item.orientation ?? 0);
      coords.forEach(([r, c]) => {
        const row = item.row + r;
        const col = item.col + c;
        occ.add(`${row}-${col}`);
      });
    });
    return occ;
  }, [items, shapes]);

  // Compute preview when hovering over a cell
  function handleCellEnter(row: number, col: number): void {
    if (!grabbed) {
      setPreview({ cells: [], valid: false });
      return;
    }
    const rotated = rotateCoords(
      shapes[grabbed.shape],
      grabbed.orientation ?? 0
    );
    const offset = grabbed.offset ?? { r: 0, c: 0 };
    const cells: string[] = [];
    let valid = true;

    for (const [rOff, cOff] of rotated) {
      // align the clicked offset with the hovered cell
      const r = row + (rOff - offset.r);
      const c = col + (cOff - offset.c);
      const key = `${r}-${c}`;
      cells.push(key);
      if (r < 0 || r >= rows || c < 0 || c >= cols || occupied.has(key)) {
        valid = false;
      }
    }
    setPreview({ cells, valid });
    setLastHover({ row, col });
  }

  // Track mouse position inside the grid to render the floating piece.
  function handleMouseMove(e: MouseEvent) {
    if (!gridRef.current) return;
    const rect = gridRef.current.getBoundingClientRect();
    const cellSize = rect.width / cols;
    const rowFloat = (e.clientY - rect.top) / cellSize;
    const colFloat = (e.clientX - rect.left) / cellSize;
    if (!grabbed) {
      setFloatCell(null);
      return;
    }
    setFloatCell({ row: rowFloat, col: colFloat });
    // update integer preview as before
    handleCellEnter(Math.floor(rowFloat), Math.floor(colFloat));
  }

  function handleMouseLeave() {
    setFloatCell(null);
    setPreview({ cells: [], valid: false });
    setLastHover(null);
  }

  // Place grabbed piece on click if preview is valid
  function handleCellClick(row: number, col: number): void {
    if (grabbed && preview.valid) {
      const offset = grabbed.offset ?? { r: 0, c: 0 };
      const placeRow = row - offset.r;
      const placeCol = col - offset.c;
      onPlaceGrabbed(placeRow, placeCol);
    }
  }

  return (
    <div
      className='flex justify-center items-start mt-4'
      onContextMenu={(e) => {
        if (grabbed) {
          e.preventDefault();
          onRotateGrabbed();
        }
      }}
    >
      <div
        ref={gridRef}
        className='relative grid bg-gray-50 border-2 border-gray-400 [--cell-size:36px]'
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          gridTemplateRows: `repeat(${rows}, var(--cell-size, 36px))`,
          gridTemplateColumns: `repeat(${cols}, var(--cell-size, 36px))`,
        }}
      >
        {Array.from({ length: rows }).map((_, r) =>
          Array.from({ length: cols }).map((_, c) => {
            const key = `${r}-${c}`;
            const isPreview = preview.cells.includes(key);
            const previewColor = preview.valid ? "bg-blue-200" : "bg-red-200";
            return (
              <div
                key={key}
                className={`${
                  isPreview ? previewColor : ""
                } border border-dashed border-gray-300`}
                style={{
                  width: "var(--cell-size)",
                  height: "var(--cell-size)",
                }}
                onMouseEnter={() => handleCellEnter(r, c)}
                onClick={() => handleCellClick(r, c)}
              />
            );
          })
        )}
        {items.map((item) => (
          <TetrisItem
            key={item.id}
            item={item}
            shapeCoords={shapes[item.shape]}
            disabled={!!grabbed}
            onClick={(r: number, c: number) => onGrab(item.id, r, c)}
          />
        ))}

        {/* floating piece follows the cursor while grabbed */}
        {grabbed && floatCell
          ? (() => {
              const offset = grabbed.offset ?? { r: 0, c: 0 };
              const placeRow = floatCell.row - offset.r;
              const placeCol = floatCell.col - offset.c;
              const floatingItem: GridItem = {
                id: -999,
                shape: grabbed.shape,
                row: placeRow,
                col: placeCol,
                color: grabbed.color,
                orientation: (grabbed.orientation ?? 0) as any,
                price: grabbed.price ?? 0,
              };
              return (
                <TetrisItem
                  key='__floating__'
                  item={floatingItem}
                  shapeCoords={shapes[grabbed.shape]}
                  disabled={true}
                  opacity={preview.valid ? 1 : 0.35}
                />
              );
            })()
          : null}
      </div>
    </div>
  );
}
