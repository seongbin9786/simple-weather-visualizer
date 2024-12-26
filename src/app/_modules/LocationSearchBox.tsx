import { FixedSizeList } from "react-window";

import { FavoriteToggleButton, SearchBar, SearchListItem } from "@/components";
import { type LocationWithGeoCoordinates } from "@/assets/locations_with_geocoordinates.type";
import locationsWithGeocoordinates from "@/assets/locations_with_geocoordinates.json";
import { useFavorites } from "./useFavorites";
import { type GeoCoordinates } from "@/types";

interface LocationSearchBoxProps {
  onSelect: (item: GeoCoordinates) => void;
}

export const LocationSearchBox = ({ onSelect }: LocationSearchBoxProps) => {
  const { toggleFavorite, checkIsToggled } = useFavorites();

  return (
    <div className="flex-1 flex-col gap-4 rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
      <h2 className="text-lg font-semibold text-gray-800">다른 지역 검색</h2>
      <SearchBar
        nameFn={(item) => item.location}
        items={locationsWithGeocoordinates as LocationWithGeoCoordinates[]}
        renderResult={(searchResult) => (
          <FixedSizeList
            itemKey={(index) => searchResult[index].location}
            width="100%"
            height={150}
            itemCount={searchResult.length}
            itemSize={65}
          >
            {({ index, style: reactWindowStyle }) => {
              const item = searchResult[index];
              return (
                <SearchListItem
                  style={reactWindowStyle}
                  key={item.location}
                  item={item}
                  name={item.location}
                  onClick={onSelect}
                  asideElement={
                    <FavoriteToggleButton
                      item={item}
                      isToggled={checkIsToggled(item)}
                      onToggle={toggleFavorite}
                    />
                  }
                />
              );
            }}
          </FixedSizeList>
        )}
      />
    </div>
  );
};
