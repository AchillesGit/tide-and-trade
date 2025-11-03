import useResourcesStore from "../store/resourcesStore";

export default function ResourcesBar() {
  const { gold } = useResourcesStore();

  return <div className='flex gap-4'>{gold} Gold</div>;
}
