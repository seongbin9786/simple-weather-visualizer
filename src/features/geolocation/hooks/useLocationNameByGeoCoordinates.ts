import { getLocationByGeoCoordinates } from "..";
import { type GeoCoordinates } from "@/types";
import { useEffect, useState } from "react";

export const useLocationNameByGeoCoordinates = (
  geoCoordinates: GeoCoordinates | null,
) => {
  const [locationName, setLocationName] = useState<string | null>(null);

  useEffect(() => {
    if (!geoCoordinates) {
      return;
    }

    (async function () {
      const address = await getLocationByGeoCoordinates(geoCoordinates);
      setLocationName(address);
    })();
  }, [geoCoordinates]);

  return { locationName };
};
