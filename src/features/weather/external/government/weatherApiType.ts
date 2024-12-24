export interface GovernmentWeatherApiResponseItem {
  baseDate: string;
  baseTime: string;
  category: string;
  fcstDate: string;
  fcstTime: string;
  fcstValue: string;
  nx: number;
  ny: number;
}

export interface GovernmentWeatherApiResponse {
  response: {
    body: {
      items: {
        item: GovernmentWeatherApiResponseItem[];
      };
    };
  };
}
