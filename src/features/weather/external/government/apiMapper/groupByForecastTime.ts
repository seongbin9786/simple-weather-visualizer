interface RawForeCastItem {
  fcstTime: string;
  name: string;
  value: string;
}

interface Item {
  name: string;
  value: string;
}

export const groupByForecastTime = (forecastForToday: RawForeCastItem[]) => {
  return forecastForToday.reduce(
    (sum, curr) => {
      const { fcstTime, ...itemFields } = curr;
      const hour = Number(fcstTime.slice(0, 2));

      if (!sum[hour]) {
        sum[hour] = [];
      }
      sum[hour].push({ ...itemFields });
      return sum;
    },
    {} as Record<string, Item[]>,
  );
};
