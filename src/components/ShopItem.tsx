import React from "react";

/**
 * Hilfsfunktion zum Rotieren – im Shop immer Orientierung 0.
 */
function rotateCoords(coords, orientation) {
  let rotated = coords.map(([r, c]) => [r, c]);
  for (let i = 0; i < orientation; i++) {
    rotated = rotated.map(([r, c]) => [c, -r]);
    const minR = Math.min(...rotated.map(([r]) => r));
    const minC = Math.min(...rotated.map(([, c]) => c));
    rotated = rotated.map(([r, c]) => [r - minR, c - minC]);
  }
  return rotated;
}

/**
 * Kleinere Darstellung einer Form im Shop. Jede Zelle hat fixe Größe (24 px).
 * Beim Klicken wird (r,c) zurückgegeben.
 */
export default function ShopItem({ coords, color, onClick, disabled = false }) {
  const rotatedCoords = rotateCoords(coords, 0);
  const rows = Math.max(...rotatedCoords.map(([r]) => r)) + 1;
  const cols = Math.max(...rotatedCoords.map(([, c]) => c)) + 1;
  const cellSize = 24;

  const containerStyle = {
    display: "grid",
    gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
    gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
    margin: "0.25rem",
    cursor: disabled ? "not-allowed" : "grab",
  };

  return (
    <div style={containerStyle} className='relative'>
      {rotatedCoords.map(([r, c], idx) => (
        <div
          key={idx}
          className='border border-gray-500'
          style={{
            gridRowStart: r + 1,
            gridColumnStart: c + 1,
            width: `${cellSize}px`,
            height: `${cellSize}px`,
            backgroundColor: color,
          }}
          onClick={(e) => {
            if (disabled) return;
            e.stopPropagation();
            if (e.button === 0 && typeof onClick === "function") {
              onClick(r, c);
            }
          }}
        />
      ))}
    </div>
  );
}
