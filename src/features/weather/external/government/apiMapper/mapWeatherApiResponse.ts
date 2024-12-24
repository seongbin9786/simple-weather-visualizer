import { WeatherApiResponseItem } from "../weatherApiType";

import { groupByForecastTime, mapArrayToObject, mapForecastItem } from ".";

export const mapWeatherApiResponse = (items: WeatherApiResponseItem[]) => {
  const mappedItems = items.map(mapForecastItem);
  const groupedItems = groupByForecastTime(mappedItems);
  const groupedItemsAsObject = Object.entries(groupedItems).reduce(
    (today, [hour, array]) => {
      today[hour] = mapArrayToObject(array);
      return today;
    },
    {} as Record<string, Record<string, string>>,
  );

  return groupedItemsAsObject;
};
