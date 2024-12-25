import { type LocationWithGeoCoordinates } from "@/assets/locations_with_geocoordinates.type";
import { useLocalStorageState } from "@/utils";

export const useFavorites = () => {
  const [favoriteLocations, setFavoriteLocations] = useLocalStorageState<
    LocationWithGeoCoordinates[]
  >("favoriteLocations", []);

  const addToFavorites = (toggledItem: LocationWithGeoCoordinates) => {
    setFavoriteLocations([...favoriteLocations, toggledItem]);
  };

  const removeFromFavorites = (toggledItem: LocationWithGeoCoordinates) => {
    setFavoriteLocations(
      favoriteLocations.filter((item) => item !== toggledItem),
    );
  };

  const toggleFavorite = (toggledItem: LocationWithGeoCoordinates) => {
    if (
      favoriteLocations.find((item) => item.location === toggledItem.location)
    ) {
      removeFromFavorites(toggledItem);
    } else {
      addToFavorites(toggledItem);
    }
  };

  const checkIsToggled = (item: LocationWithGeoCoordinates) =>
    !!favoriteLocations.find((location) => location.location === item.location);

  return { favoriteLocations, toggleFavorite, checkIsToggled };
};
