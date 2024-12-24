import { groupByForecastTime } from ".";

describe("기상청 API 시간 별 그룹화", () => {
  test("기본 Case", () => {
    const testData = [
      {
        category: "TMP",
        fcstTime: "0600",
        fcstValue: "-6",
      },
      {
        category: "UUU",
        fcstTime: "0600",
        fcstValue: "2.1",
      },
      {
        category: "TMP",
        fcstTime: "0700",
        fcstValue: "-6",
      },
      {
        category: "UUU",
        fcstTime: "0700",
        fcstValue: "2",
      },
    ];
    const result = groupByForecastTime(testData);
    expect(result).toEqual({
      6: [
        {
          category: "TMP",
          fcstValue: "-6",
        },
        {
          category: "UUU",
          fcstValue: "2.1",
        },
      ],
      7: [
        {
          category: "TMP",
          fcstValue: "-6",
        },
        {
          category: "UUU",
          fcstValue: "2",
        },
      ],
    });
  });
});
