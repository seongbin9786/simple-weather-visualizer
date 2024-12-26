declare global {
  interface Window {
    kakao: {
      maps: {
        load: (cb: () => void) => void;
        services: {
          Geocoder: {
            new (): KakaoGeocoder;
          };
          Status: {
            OK: string; // 확인 필요함
          };
        };
      };
    };
  }
}

export interface KakaoGeocoder {
  coord2RegionCode: KakaoCoord2RegionCodeApi;
}

export type KakaoCoord2RegionCodeApi = (
  longitude: number,
  latitude: number,
  cb: (result: KakaoCoord2RegionCodeResult[], status: string) => void,
) => void;

export interface KakaoCoord2RegionCodeResult {
  region_type: string;
  address_name: string;
}

export enum KakaoMapRegionType {
  법정동 = "B",
  행정동 = "H",
}
