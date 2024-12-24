"use client";

import { WeatherCard } from "@/components";
import {
  useCurrentGeoCoordinates,
  useCurrentLocation,
} from "@/features/geolocation/hooks";
import { type GeoCoordinates } from "@/types";
import { type WeatherApiResponse } from "@/types/api";
import { useEffect, useState } from "react";

const getWeatherForGeoCoordinates = async (
  geoCoordinates: GeoCoordinates,
): Promise<Record<string, WeatherApiResponse>> => {
  const response = await fetch(
    `/api/weather?latitude=${geoCoordinates.latitude}&longitude=${geoCoordinates.longitude}`,
  );
  return response.json();
};

export default function Home() {
  const { geoCoordinates, isLoading, isError, errorMessage } =
    useCurrentGeoCoordinates();
  const { currentLocation } = useCurrentLocation(geoCoordinates);

  const [weatherData, setWeatherData] = useState<Record<
    string,
    WeatherApiResponse
  > | null>(null);

  useEffect(() => {
    if (!geoCoordinates) {
      return;
    }

    (async function () {
      try {
        const weatherData = await getWeatherForGeoCoordinates(geoCoordinates);
        setWeatherData(weatherData);
      } catch (error) {
        console.error("날씨 정보를 가져오는 중 에러 발생:", error);
      }
    })();
  }, [geoCoordinates]);

  if (isError) {
    return <p>에러 발생: {errorMessage}</p>;
  }

  if (isLoading) {
    return <p>현재 위치를 가져오는 중...</p>;
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
          <input
            type="text"
            className="w-1/2 rounded-md border border-gray-200 px-2 py-1"
          />
        </div>
        <div className="flex-1 flex-col gap-4 rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-gray-800">
            즐겨 찾는 장소
          </h2>
          <ul className="list-inside list-disc">
            <li>서울특별시</li>
            <li>서울특별시 동대문구</li>
            <li>세종특별자치시</li>
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
