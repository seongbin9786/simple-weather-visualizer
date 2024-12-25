"use client";

import {
  FavoriteToggleButton,
  SearchBar,
  SearchListItem,
  WeatherCard,
} from "@/components";
import {
  useCurrentGeoCoordinates,
  useCurrentLocation,
} from "@/features/geolocation";
import locationsWithGeocoordinates from "@/assets/locations_with_geocoordinates.json";
import { type LocationWithGeoCoordinates } from "@/assets/locations_with_geocoordinates.type";
import { useFetch, useLocalStorageState } from "@/utils";
import { getWeatherForGeoCoordinates } from "@/features/weather";

export default function Home() {
  const { geoCoordinates, isLoading, isError, errorMessage } =
    useCurrentGeoCoordinates();
  const { currentLocation } = useCurrentLocation(geoCoordinates);

  const { data: weatherData, isLoading: isWeahterApiLoading } = useFetch({
    enabled: !!geoCoordinates,
    fetchFn: () => getWeatherForGeoCoordinates(geoCoordinates!),
    onError: () => alert("날씨 정보를 가져오는 중 에러 발생"),
    deps: [geoCoordinates],
  });

  const [favoriteLocations, setFavoriteLocations] = useLocalStorageState<
    LocationWithGeoCoordinates[]
  >("favoriteLocations", []);

  const addToFavorites = (location: LocationWithGeoCoordinates) => {
    setFavoriteLocations([...favoriteLocations, location]);
  };

  const removeFromFavorites = (location: LocationWithGeoCoordinates) => {
    setFavoriteLocations(favoriteLocations.filter((item) => item !== location));
  };

  if (isError) {
    return <p>에러 발생: {errorMessage}</p>;
  }

  if (isLoading) {
    return <p>현재 위치를 가져오는 중...</p>;
  }

  if (isWeahterApiLoading) {
    return <p>날씨 정보를 가져오는 중...</p>;
  }

  return (
    <div className="m-4 flex flex-col gap-8 rounded-md border border-gray-300 bg-gray-50 p-8">
      <h1 className="text-md text-gray-500">오늘의 날씨</h1>
      <div>
        <h2 className="text-lg">{currentLocation}</h2>
        <p className="text-gray-500">
          위도: {geoCoordinates?.latitude}, 경도 {geoCoordinates?.longitude}
        </p>
      </div>
      <div className="flex gap-4">
        <div className="flex-1 flex-col gap-4 rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-gray-800">
            다른 지역 검색
          </h2>
          <SearchBar
            nameFn={(item) => item.location}
            items={locationsWithGeocoordinates as LocationWithGeoCoordinates[]}
            renderItem={(item) => (
              <SearchListItem
                key={item.location}
                item={item}
                name={item.location}
                onClick={(item) => console.log(item)}
                asideElement={
                  <FavoriteToggleButton
                    item={item}
                    isToggled={false}
                    onToggle={addToFavorites}
                  />
                }
              />
            )}
          />
        </div>
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
              >
                <FavoriteToggleButton
                  item={item}
                  isToggled={true}
                  onToggle={removeFromFavorites}
                />
                <span>{item.location}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {weatherData && (
        <div className="flex flex-row space-x-4 overflow-x-auto">
          {Object.entries(weatherData).map(([hour, weather]) => (
            <WeatherCard key={hour} hour={hour} weather={weather} />
          ))}
        </div>
      )}
    </div>
  );
}
