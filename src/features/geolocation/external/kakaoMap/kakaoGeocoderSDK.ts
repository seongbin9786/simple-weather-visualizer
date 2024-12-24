import { KakaoGeocoder } from "./kakao";

const getSDKUrl = (accessKey: string) => {
  const isHttps = window.location.href.includes("https");
  const protocol = isHttps ? "https" : "http";

  return `${protocol}://dapi.kakao.com/v2/maps/sdk.js?appkey=${accessKey}&libraries=services&autoload=false`;
};

export const getKakaoGeocoderSDK = async (
  accessKey: string,
): Promise<KakaoGeocoder> =>
  new Promise((resolve) => {
    if (window.kakao?.maps?.services) {
      return resolve(new window.kakao.maps.services.Geocoder());
    }

    const loaderScriptTag = document.createElement("script");
    loaderScriptTag.src = getSDKUrl(accessKey);

    loaderScriptTag.addEventListener("load", () => {
      const kakaoLoader = window.kakao.maps;
      kakaoLoader.load(() => {
        resolve(new window.kakao.maps.services.Geocoder());
      });
    });

    document.head.appendChild(loaderScriptTag);
  });
