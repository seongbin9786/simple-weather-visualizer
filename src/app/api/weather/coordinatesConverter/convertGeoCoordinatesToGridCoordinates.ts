type Coordinates = {
  latitude: number; // 위도
  longitude: number; // 경도
};

type GridCoordinates = {
  x: number; // 격자 X 좌표
  y: number; // 격자 Y 좌표
};

export const convertGeoCoordinatesToGridCoordinates = ({
  latitude,
  longitude,
}: Coordinates): GridCoordinates => {
  const RE = 6371.00877; // 지구 반경 (km)
  const GRID = 5.0; // 격자 간격 (km)
  const SLAT1 = 30.0; // 투영 위도1 (degree)
  const SLAT2 = 60.0; // 투영 위도2 (degree)
  const OLON = 126.0; // 기준점 경도 (degree)
  const OLAT = 38.0; // 기준점 위도 (degree)
  const XO = 43; // 기준점 X좌표 (GRID)
  const YO = 136; // 기준점 Y좌표 (GRID)

  const DEGRAD = Math.PI / 180.0;

  const re = RE / GRID;
  const slat1 = SLAT1 * DEGRAD;
  const slat2 = SLAT2 * DEGRAD;
  const olon = OLON * DEGRAD;
  const olat = OLAT * DEGRAD;

  const sn =
    Math.tan(Math.PI * 0.25 + slat2 * 0.5) /
    Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  const snLog = Math.log(Math.cos(slat1) / Math.cos(slat2));
  const snValue = Math.log(sn);
  const snFinal = snLog / snValue;

  const sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  const sfValue = (Math.pow(sf, snFinal) * Math.cos(slat1)) / snFinal;

  const ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
  const roValue = (re * sfValue) / Math.pow(ro, snFinal);

  // 변환된 좌표 계산
  const ra = Math.tan(Math.PI * 0.25 + latitude * DEGRAD * 0.5);
  const raValue = (re * sfValue) / Math.pow(ra, snFinal);

  let theta = longitude * DEGRAD - olon;
  if (theta > Math.PI) theta -= 2.0 * Math.PI;
  if (theta < -Math.PI) theta += 2.0 * Math.PI;

  theta *= snFinal;

  const x = Math.floor(raValue * Math.sin(theta) + XO + 0.5);
  const y = Math.floor(roValue - raValue * Math.cos(theta) + YO + 0.5);

  return { x, y };
};
