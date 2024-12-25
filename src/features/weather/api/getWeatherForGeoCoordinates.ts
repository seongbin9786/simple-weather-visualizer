import { type GeoCoordinates } from "@/types";
import { type WeatherApiResponse } from "@/types/api";

export const getWeatherForGeoCoordinates = async (
  geoCoordinates: GeoCoordinates,
): Promise<Record<string, WeatherApiResponse>> => {
  const response = await fetch(
    `/api/weather?latitude=${geoCoordinates.latitude}&longitude=${geoCoordinates.longitude}`,
  );
  return response.json();
};
