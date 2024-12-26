import { FavoriteToggleButton } from "@/components";
import { type GeoCoordinates } from "@/types";

import { useFavorites } from "./useFavorites";

interface FavoriteLocationsProps {
  onSelect: (item: GeoCoordinates) => void;
}
export const FavoriteLocations = ({ onSelect }: FavoriteLocationsProps) => {
  const { favoriteLocations, toggleFavorite } = useFavorites();

  return (
    <div className="flex flex-1 flex-col gap-4 rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-lg font-semibold text-gray-800">즐겨 찾기</h2>
        <span className="text-gray-500">{favoriteLocations.length}곳</span>
      </div>
      <ul className="flex max-h-52 flex-col gap-2 overflow-y-auto">
        {favoriteLocations.map((item) => (
          <li
            key={item.location}
            className="flex cursor-pointer items-center rounded-lg border border-gray-200 px-1 hover:bg-gray-200"
            onClick={() => onSelect(item)}
          >
            <FavoriteToggleButton
              item={item}
              isToggled={true}
              onToggle={toggleFavorite}
            />
            <span>{item.location}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
