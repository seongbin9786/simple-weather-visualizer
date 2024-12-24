import { type WeatherApiResponse } from "@/types/api";

interface WeatherCardProps {
  hour: string;
  weather: WeatherApiResponse;
}

export const WeatherCard = ({ hour, weather }: WeatherCardProps) => {
  return (
    <div className="mb-4 flex w-80 shrink-0 flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
      <h1 className="mb-4 text-xl font-bold text-gray-800">{hour}시</h1>
      <ul className="space-y-2">
        {Object.entries(weather).map(([key, value]) => (
          <li
            key={key}
            className="flex justify-between border-b pb-2 last:border-b-0"
          >
            <span className="font-medium">{key}</span>
            <span>{value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
