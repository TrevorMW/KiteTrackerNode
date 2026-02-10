import { useEffect, useState } from "react";
import { resolveUserLocation } from "../utils/resolveUserLocation";
import { GeoLocationResult } from "../utils/geolocation";

export function useUserLocation() {
  const [location, setLocation] = useState<GeoLocationResult | null>(null);

  useEffect(() => {
    resolveUserLocation().then(setLocation);
  }, []);

  return location;
}