export interface WeatherApiResponseItem {
  baseDate: string;
  baseTime: string;
  category: string;
  fcstDate: string;
  fcstTime: string;
  fcstValue: string;
  nx: number;
  ny: number;
}

export interface WeatherApiResponse {
  response: {
    body: {
      items: {
        item: WeatherApiResponseItem[];
      };
    };
  };
}
