import { mapForecastItem } from ".";

describe("기상청 API 이름, 코드 값 매핑", () => {
  test("기본 데이터 변환", () => {
    const data = [
      {
        category: "TMP",
        fcstValue: "-6",
      },
      {
        category: "UUU",
        fcstValue: "2.1",
      },
      {
        category: "VVV",
        fcstValue: "-2.6",
      },
      {
        category: "VEC",
        fcstValue: "322",
      },
      {
        category: "WSD",
        fcstValue: "3.3",
      },
      {
        category: "SKY",
        fcstValue: "1",
      },
      {
        category: "PTY",
        fcstValue: "0",
      },
      {
        category: "POP",
        fcstValue: "0",
      },
      {
        category: "WAV",
        fcstValue: "-999",
      },
      {
        category: "PCP",
        fcstValue: "강수없음",
      },
      {
        category: "REH",
        fcstValue: "75",
      },
      {
        category: "SNO",
        fcstValue: "적설없음",
      },
    ];
    const result = data.map(mapForecastItem);
    expect(result).toEqual([
      { name: "1시간 기온", value: "-6°C" },
      { name: "동서성분", value: "동 (2.1 m/s)" },
      { name: "남북성분", value: "남 (-2.6 m/s)" },
      { name: "풍향", value: "북서" },
      { name: "풍속", value: "3.3m/s" },
      { name: "하늘상태", value: "맑음" },
      { name: "강수형태", value: "없음" },
      { name: "강수확률", value: "0%" },
      { name: "파고", value: "-999M" },
      { name: "1시간 강수량", value: "강수없음" },
      { name: "습도", value: "75%" },
      { name: "1시간 신적설", value: "적설없음" },
    ]);
  });
});
