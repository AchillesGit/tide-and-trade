/**
 * Helper to rotate an array of [row, col] coordinates by 90° steps,
 * then normalise them so the smallest row/col is zero.
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
 * A single Tetris‑style piece. When disabled (grabbed != null),
 * pointer events are turned off so grid hover works over other pieces.
 * Clicking a cell reports its row/col to the parent via onClick(r,c).
 */
export default function TetrisItem({
  item,
  shapeCoords,
  onClick,
  disabled = false,
}) {
  const { row, col, color, orientation = 0 } = item;

  // rotate shape by the item's orientation
  const rotatedCoords = rotateCoords(shapeCoords, orientation);
  const rows = Math.max(...rotatedCoords.map(([r]) => r)) + 1;
  const cols = Math.max(...rotatedCoords.map(([, c]) => c)) + 1;

  const containerStyle = {
    position: "absolute",
    top: `calc(var(--cell-size) * ${row})`,
    left: `calc(var(--cell-size) * ${col})`,
    display: "grid",
    gridTemplateRows: `repeat(${rows}, var(--cell-size))`,
    gridTemplateColumns: `repeat(${cols}, var(--cell-size))`,
    width: `calc(var(--cell-size) * ${cols})`,
    height: `calc(var(--cell-size) * ${rows})`,
    zIndex: 10,
    cursor: "grab",
    pointerEvents: disabled ? "none" : "auto",
  };

  return (
    <div className='tetris-item' style={containerStyle}>
      {rotatedCoords.map(([r, c], idx) => (
        <div
          key={idx}
          className='border border-gray-600'
          style={{
            gridRowStart: r + 1,
            gridColumnStart: c + 1,
            backgroundColor: color,
            width: "100%",
            height: "100%",
          }}
          onClick={(e) => {
            // stop propagation and call onClick with cell coords
            e.stopPropagation();
            if (e.button === 0 && typeof onClick === "function" && !disabled) {
              onClick(r, c);
            }
          }}
        />
      ))}
    </div>
  );
}
