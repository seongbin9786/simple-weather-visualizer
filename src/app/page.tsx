"use client";

import { useEffect, useState } from "react";
import { FullPageSpinner, FullPageErrorMessage } from "@/components";
import {
  useCurrentGeoCoordinates,
  useLocationNameByGeoCoordinates,
} from "@/features/geolocation";
import { useFetch } from "@/utils";
import { getWeatherForGeoCoordinates } from "@/features/weather";
import { type GeoCoordinates } from "@/types";

import {
  CurrentLocation,
  FavoriteLocations,
  LocationSearchBox,
  WeatherCard,
} from "./_modules";

export default function Home() {
  const {
    geoCoordinates: myGeoCoordinates,
    isLoading: myGeoCoordinatesIsLoading,
    isError: myGeoCoordinatesIsError,
    errorMessage: myGeoCoordinatesErrorMessage,
  } = useCurrentGeoCoordinates();

  const [selectedGeoCoordinates, setSelectedGeoCoordinates] =
    useState<GeoCoordinates | null>(null);

  useEffect(() => {
    setSelectedGeoCoordinates(myGeoCoordinates);
  }, [myGeoCoordinates]);

  const { locationName } = useLocationNameByGeoCoordinates(
    selectedGeoCoordinates,
  );

  const { data: weatherData, isLoading: isWeahterApiLoading } = useFetch({
    enabled: !!selectedGeoCoordinates,
    fetchFn: () => getWeatherForGeoCoordinates(selectedGeoCoordinates!),
    onError: () => {
      alert("기상청 API 호출에 실패했습니다. 다시 시도해주세요."); // NOTE: 기상청 API 호출 실패는 사용자가 해결할 수 없는 오류
      window.location.reload(); // NOTE: 페이지 리프레시 수행
    },
    deps: [selectedGeoCoordinates],
  });

  if (myGeoCoordinatesIsError) {
    return (
      <FullPageErrorMessage
        description={`현재 위치를 가져오는 도중 에러가 발생했습니다. 다시 시도해주세요.\n사유: ${myGeoCoordinatesErrorMessage}`}
      />
    );
  }

  if (myGeoCoordinatesIsLoading) {
    return <FullPageSpinner description="현재 위치를 가져오는 중..." />;
  }

  if (isWeahterApiLoading) {
    return <FullPageSpinner description="날씨 정보를 가져오는 중..." />;
  }

  return (
    <div className="m-4 flex flex-col gap-8 rounded-md border border-gray-300 bg-gray-50 p-8">
      <h1 className="text-md text-gray-500">오늘의 날씨</h1>
      <CurrentLocation
        locationName={locationName}
        geoCoordinates={selectedGeoCoordinates}
      />
      <div className="flex gap-4">
        <LocationSearchBox onSelect={setSelectedGeoCoordinates} />
        <FavoriteLocations onSelect={setSelectedGeoCoordinates} />
      </div>
      <div className="flex flex-row space-x-4 overflow-x-auto">
        {Object.entries(weatherData).map(([hour, weather]) => (
          <WeatherCard key={hour} hour={hour} weather={weather} />
        ))}
      </div>
    </div>
  );
}
