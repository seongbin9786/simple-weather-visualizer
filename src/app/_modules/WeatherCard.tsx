import { type WeatherApiResponse } from "@/types/api";
import clsx from "clsx";

interface WeatherCardLineProps {
  name: string;
  value: string;
}

const WeatherCardLine = ({ name, value }: WeatherCardLineProps) => (
  <li className="flex justify-between border-b pb-2 last:border-b-0">
    <span className="font-medium">{name}</span>
    <span>{value}</span>
  </li>
);

interface WeatherCardProps {
  hour: string;
  weather: WeatherApiResponse;
}

export const WeatherCard = ({ hour, weather }: WeatherCardProps) => {
  const temperature = weather["1시간 기온"];
  const humidity = weather["습도"];
  const precipitationProbability = weather["강수확률"];

  const skyType = weather["하늘상태"];
  const rainType = weather["강수형태"];
  const precipitation = weather["1시간 강수량"];
  const snow = weather["1시간 신적설"];

  const displayedFields = [
    {
      name: "기온",
      value: temperature,
    },
    {
      name: "습도",
      value: humidity,
    },
    {
      name: "하늘상태",
      value: skyType,
    },
    {
      name: "강수형태",
      value: rainType,
    },
    {
      name: "강수확률",
      value: precipitationProbability,
    },
  ];

  const isRaining =
    rainType === "비" || rainType === "비/눈" || rainType === "소나기";
  const isSnowing = rainType === "눈";
  if (isSnowing) {
    displayedFields.push({
      name: "1시간 신적설",
      value: snow,
    });
  } else if (isRaining) {
    displayedFields.push({
      name: "1시간 강수량",
      value: precipitation,
    });
  }

  return (
    <div
      className={clsx(
        "mb-4 flex w-52 shrink-0 flex-col rounded-lg border border-gray-200 p-6 shadow-lg",
        skyType === "맑음" && "bg-white",
        skyType === "구름많음" && "bg-sky-100",
        skyType === "흐림" && "bg-gray-200",
      )}
    >
      <h1 className="mb-4 text-xl font-bold text-gray-800">{hour}시</h1>
      <ul className="space-y-2">
        {displayedFields.map(({ name, value }) => (
          <WeatherCardLine key={name} name={name} value={value} />
        ))}
      </ul>
    </div>
  );
};
