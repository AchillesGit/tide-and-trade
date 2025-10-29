import useInventoryStore from "../store/inventoryStore";

export default function Inventory() {
  const { itemRegistry, rows, cols, grabItem, releaseItem } =
    useInventoryStore();

  return (
    <div>
      <h2>Inventory</h2>
      <div
        className='grid'
        style={{ gridTemplateColumns: `repeat(${cols}, 50px)` }}
      >
        {Array.from({ length: rows }).map((_, row) =>
          Array.from({ length: cols }).map((_, col) => {
            const item = itemRegistry.find(
              (ir) => ir.position.row === row && ir.position.col === col
            )?.item;
            return (
              <div
                key={`${row}-${col}`}
                className='border border-gray-300 w-[50px] h-[50px] flex items-center justify-center'
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  releaseItem({ row, col });
                }}
              >
                {item ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className='absolute'
                    draggable
                    onDragStart={(e) => {
                      grabItem(item.id);
                      // Helper to drag the image always from center
                      const img = e.currentTarget as HTMLImageElement;
                      const dragIcon = img.cloneNode(true) as HTMLImageElement;
                      dragIcon.style.position = "absolute";
                      dragIcon.style.top = "-9999px";
                      dragIcon.style.left = "-9999px";
                      document.body.appendChild(dragIcon);
                      e.dataTransfer?.setDragImage(
                        dragIcon,
                        dragIcon.width / 2,
                        dragIcon.height / 2
                      );
                      setTimeout(() => document.body.removeChild(dragIcon), 0);
                    }}
                  />
                ) : null}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
