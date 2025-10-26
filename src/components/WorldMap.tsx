interface WorldMapProps {
  onCitySelect: (city: string) => void;
}

export default function WorldMap({ onCitySelect }: WorldMapProps) {
  const cities = [
    "Port Royal",
    "Havana",
    "Nassau",
    "Tortuga",
    "Santo Domingo",
    "Kingston",
    "Bridgetown",
    "Port-au-Prince",
    "San Juan",
    "Cartagena",
  ];

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-6 text-center'>
        Caribbean Trading Map
      </h1>
      <div className='grid grid-cols-2 gap-4 max-w-2xl mx-auto'>
        {cities.map((city) => (
          <button
            key={city}
            onClick={() => onCitySelect(city)}
            className='p-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors'
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
}
