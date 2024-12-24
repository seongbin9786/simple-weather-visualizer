"use client";

import {
  useCurrentGeoCoordinates,
  useCurrentLocation,
} from "@/features/geolocation/hooks";

export default function Home() {
  const { geoCoordinates, isLoading, isError, errorMessage } =
    useCurrentGeoCoordinates();
  const { currentLocation } = useCurrentLocation(geoCoordinates);

  return (
    <div>
      {isError ? (
        <p>에러 발생: {errorMessage}</p>
      ) : isLoading ? (
        <p>현재 위치를 가져오는 중...</p>
      ) : (
        <div>
          현재 위치:
          <ol>
            <li>위도 {geoCoordinates?.latitude}</li>
            <li>경도 {geoCoordinates?.longitude}</li>
            <li>행정구역: {currentLocation}</li>
          </ol>
        </div>
      )}
    </div>
  );
}
