import useInventoryStore from "../store/inventoryStore";

export default function Inventory() {
  const { itemRegistry, inventoryGrid, grabItem, releaseItem } =
    useInventoryStore();

  return (
    <div>
      <h2>Inventory</h2>
      <div
        className='grid'
        style={{
          gridTemplateColumns: `repeat(${inventoryGrid[0].length}, 50px)`,
        }}
      >
        {inventoryGrid.map((row, rowIndex) =>
          row.map((_, colIndex) => {
            const item = itemRegistry.find(
              (ir) =>
                ir.position.row === rowIndex && ir.position.col === colIndex
            )?.item;
            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className='border border-gray-300 w-[50px] h-[50px] flex items-center justify-center'
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  releaseItem({ row: rowIndex, col: colIndex });
                }}
              >
                {item ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className='absolute cursor-grab'
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setDragImage(
                        e.currentTarget,
                        e.currentTarget.clientWidth / 2,
                        e.currentTarget.clientHeight / 2
                      );

                      requestAnimationFrame(() => {
                        grabItem(item.id);
                      });
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
