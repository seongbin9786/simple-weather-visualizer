"use server";

import { type NextRequest, NextResponse } from "next/server";
import {
  convertGeoCoordinatesToGridCoordinates,
  type GovernmentWeatherApiResponse,
  mapWeatherApiResponse,
} from "@/features/weather";
import { getTodayString } from "@/utils";

const WEATHER_API_DOMAIN = "apis.data.go.kr/1360000/VilageFcstInfoService_2.0";

async function GET(req: NextRequest) {
  const queryFromUser = req.nextUrl.searchParams;
  const latitude = queryFromUser.get("latitude");
  const longitude = queryFromUser.get("longitude");

  if (!latitude || !longitude) {
    return new Response(
      "위경도가 누락되었습니다. 날씨 데이터 제공을 위해서는 위경도가 필요합니다.",
      { status: 400 },
    );
  }

  const { x, y } = convertGeoCoordinatesToGridCoordinates({
    latitude: Number(latitude),
    longitude: Number(longitude),
  });

  const today = getTodayString();

  const queryToApiServer = new URLSearchParams({
    ServiceKey: process.env.WEATHER_API_KEY as string,
    pageNo: "1",
    numOfRows: "300",
    dataType: "JSON",
    base_date: today, // 오늘 날짜를 이 형식으로 가져와야 함
    base_time: "0500",
    nx: String(x),
    ny: String(y),
  });

  const url = `http://${WEATHER_API_DOMAIN}/getVilageFcst?${queryToApiServer.toString()}`;
  const weatherApiResponse = await fetch(url);

  if (!weatherApiResponse.ok) {
    return new Response("날씨 API 서버에서 데이터를 가져오는데 실패했습니다.", {
      status: 500,
    });
  }

  const responseBody =
    (await weatherApiResponse.json()) as GovernmentWeatherApiResponse;
  const allrawItems = responseBody.response.body.items.item;
  const todayRawItems = allrawItems.filter((item) => item.fcstDate === today);
  const result = mapWeatherApiResponse(todayRawItems);
  return NextResponse.json(result);
}

export { GET };
