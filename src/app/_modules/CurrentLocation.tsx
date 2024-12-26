import { type GeoCoordinates } from "@/types";

interface CurrentLocationProps {
  locationName: string | null;
  geoCoordinates: GeoCoordinates | null;
}

export const CurrentLocation = ({
  locationName,
  geoCoordinates,
}: CurrentLocationProps) => (
  <div>
    <h2 className="text-lg">{locationName}</h2>
    <p className="text-gray-500">
      위도: {geoCoordinates?.latitude}, 경도:
      {geoCoordinates?.longitude}
    </p>
  </div>
);
