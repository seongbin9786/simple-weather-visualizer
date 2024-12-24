const symbolNameMap: Record<string, string> = {
  POP: "강수확률",
  PTY: "강수형태",
  PCP: "1시간 강수량",
  REH: "습도",
  SNO: "1시간 신적설",
  SKY: "하늘상태",
  TMP: "1시간 기온",
  TMN: "일 최저기온",
  TMX: "일 최고기온",
  WSD: "풍속",
  WAV: "파고",
  VEC: "풍향",
  UUU: "동서성분",
  VVV: "남북성분",
};

const RainType: Record<string, string> = {
  0: "없음",
  1: "비",
  2: "비/눈",
  3: "눈",
  4: "소나기",
};

const SkyType: Record<string, string> = {
  1: "맑음",
  3: "구름많음",
  4: "흐림",
};

const getPrecipitationDescription = (precipitation: string) => {
  if (precipitation === "강수없음") {
    return "강수없음";
  }
  const numValue = parseFloat(precipitation);
  if (numValue < 1) {
    return "1mm 미만";
  }
  if (numValue < 30) {
    return `${numValue}mm`;
  }
  if (numValue < 50) {
    return "30.0~50.0mm";
  }
  return "50.0mm 이상";
};

const getSnowCoverDescription = (snowCoverAmount: string) => {
  if (snowCoverAmount === "적설없음") {
    return "적설없음";
  }
  const numValue = parseFloat(snowCoverAmount);
  if (numValue < 0.5) {
    return "0.5cm 미만";
  }
  if (numValue < 5) {
    return `${numValue}cm`;
  }
  return "5.0cm 이상";
};

const getWindDirectionByDegree = (degree: number) => {
  const directions = [
    "북",
    "북북동",
    "북동",
    "동북동",
    "동",
    "동남동",
    "남동",
    "남남동",
    "남",
    "남남서",
    "남서",
    "서남서",
    "서",
    "서북서",
    "북서",
    "북북서",
  ];

  const index = Math.round(degree / 22.5) % 16;

  return directions[index];
};

interface ForeCastItem {
  category: string;
  fcstValue: string;
  fcstTime: string;
}

const getDescription = ({ category, fcstValue }: ForeCastItem) => {
  switch (category) {
    case "POP": // 강수확률
    case "REH": // 습도
      return `${fcstValue}%`;
    case "PTY": // 강수형태
      return RainType[fcstValue];
    case "PCP": // 1시간 강수량
      return getPrecipitationDescription(fcstValue);
    case "SNO": // 1시간 신적설
      return getSnowCoverDescription(fcstValue);
    case "SKY": // 하늘상태
      return SkyType[fcstValue];
    case "TMP": // 1시간 기온
    case "TMN": // 일 최저기온
    case "TMX": // 일 최고기온
      return `${fcstValue}°C`;
    case "WSD": // 풍속
      return `${fcstValue}m/s`;
    case "WAV": // 파고
      return `${fcstValue}M`;
    case "VEC": // 풍향
      return `${getWindDirectionByDegree(Number(fcstValue))}`;
    case "UUU": // 동서성분
      return `${Number(fcstValue) > 0 ? "동" : "서"} (${fcstValue} m/s)`;
    case "VVV": // 남북성분
      return `${Number(fcstValue) > 0 ? "북" : "남"} (${fcstValue} m/s)`;
    default:
      return fcstValue;
  }
};

export const mapForecastItem = (item: ForeCastItem) => {
  const { category, fcstTime } = item;

  return {
    name: symbolNameMap[category],
    value: getDescription(item),
    fcstTime,
  };
};
