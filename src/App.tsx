import Inventory from "./components/Inventory";
import ResourcesBar from "./components/ResourcesBar";
import Shop from "./components/Shop";

export default function App() {
  return (
    <>
      <ResourcesBar />
      <div className='flex gap-4'>
        <Inventory />
        <Shop />
      </div>
    </>
  );
}
