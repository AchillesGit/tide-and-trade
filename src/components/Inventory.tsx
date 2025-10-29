import useInventoryStore from "../store/inventoryStore";

export default function Inventory() {
  const { itemRegistry, rows, cols } = useInventoryStore();

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
            console.log(JSON.stringify(item));

            return (
              <div
                key={`${row}-${col}`}
                className='border border-gray-300 w-[50px] h-[50px] flex items-center justify-center'
              >
                {item ? (
                  <img src={item.image} alt={item.name} className='absolute' />
                ) : null}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
