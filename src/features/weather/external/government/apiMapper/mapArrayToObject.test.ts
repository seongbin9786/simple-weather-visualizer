import { mapArrayToObject } from ".";

describe("기상청 API 배열에서 객체로 변환", () => {
  test("기본 Case", () => {
    const data = [
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
    ];
    const result = mapArrayToObject(data);
    expect(result).toEqual({
      "1시간 기온": "-6°C",
      동서성분: "동 (2.1 m/s)",
      남북성분: "남 (-2.6 m/s)",
      풍향: "북서",
      풍속: "3.3m/s",
      하늘상태: "맑음",
      강수형태: "없음",
      강수확률: "0%",
      파고: "-999M",
      "1시간 강수량": "강수없음",
      습도: "75%",
      "1시간 신적설": "적설없음",
    });
  });
});
