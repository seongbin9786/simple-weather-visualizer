"use client";

import { GeoCoordinates } from "@/types";
import { useEffect, useState } from "react";

export const useCurrentGeoCoordinates = () => {
  const [geoCoordinates, setGeoCoordinates] = useState<GeoCoordinates | null>(
    null,
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const isLoading = geoCoordinates === null;
  const isError = errorMessage !== null;
  useEffect(() => {
    if (!navigator.geolocation) {
      setErrorMessage("Geolocation API를 지원하지 않는 브라우저입니다.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setGeoCoordinates({ latitude, longitude });
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setErrorMessage("사용자가 위치 정보 접근을 거부했습니다.");
            break;
          case error.POSITION_UNAVAILABLE:
            setErrorMessage("위치 정보를 사용할 수 없습니다.");
            break;
          case error.TIMEOUT:
            setErrorMessage("위치 정보 요청 시간이 초과되었습니다.");
            break;
          default:
            setErrorMessage("알 수 없는 오류가 발생했습니다.");
        }
      },
    );
  }, []);

  return { geoCoordinates, isLoading, isError, errorMessage };
};
