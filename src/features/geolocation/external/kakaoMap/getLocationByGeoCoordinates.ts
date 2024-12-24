import { getKakaoGeocoderSDK } from "..";
import { GeoCoordinates } from "@/types";

export const getLocationByGeoCoordinates = async ({
  latitude,
  longitude,
}: GeoCoordinates): Promise<string> =>
  new Promise(async (resolve, reject) => {
    if (!process.env.NEXT_PUBLIC_KAKAO_JS_SDK_KEY) {
      reject("유효하지 않은 카카오 API Key입니다.");
      return;
    }

    const geocoder = await getKakaoGeocoderSDK(
      process.env.NEXT_PUBLIC_KAKAO_JS_SDK_KEY,
    );

    geocoder.coord2RegionCode(longitude, latitude, (searchResult, status) => {
      if (status !== window.kakao.maps.services.Status.OK) {
        reject("카카오 API가 정상 동작하지 않습니다.");
      }
      for (const item of searchResult) {
        if (item.region_type === "H") {
          resolve(item.address_name);
          return;
        }
      }
      reject("적절한 행정동 데이터를 찾을 수 없었습니다.");
    });
  });
