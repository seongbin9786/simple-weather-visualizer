"use client";

import { useCurrentGeolocation } from "@/hooks";

export default function Home() {
  const { location, isLoading, isError, errorMessage } =
    useCurrentGeolocation();

  return (
    <div>
      {isError ? (
        <p>에러 발생: {errorMessage}</p>
      ) : isLoading ? (
        <p>현재 위치를 가져오는 중...</p>
      ) : (
        <p>
          현재 위치:
          <ol>
            <li>위도 {location?.latitude}</li>
            <li>경도 {location?.longitude}</li>
          </ol>
        </p>
      )}
    </div>
  );
}
