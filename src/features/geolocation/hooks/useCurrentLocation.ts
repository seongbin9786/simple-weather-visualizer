import { getLocationByGeoCoordinates } from "..";
import { type GeoCoordinates } from "@/types";
import { useEffect, useState } from "react";

export const useCurrentLocation = (geoCoordinates: GeoCoordinates | null) => {
  const [currentLocation, setCurrentLocation] = useState<string | null>(null);

  useEffect(() => {
    if (!geoCoordinates) {
      return;
    }

    (async function () {
      const address = await getLocationByGeoCoordinates(geoCoordinates);
      setCurrentLocation(address);
    })();
  }, [geoCoordinates]);

  return { currentLocation };
};
