import { convertGeoCoordinatesToGridCoordinates } from ".";

describe("위경도 -> 격자 좌표 변환", () => {
  test("기본 Case", () => {
    const testData = {
      latitude: 37.5,
      longitude: 127.0,
    };
    const result = convertGeoCoordinatesToGridCoordinates(testData);
    expect(result).toEqual({ x: 60, y: 125 });
  });
});
