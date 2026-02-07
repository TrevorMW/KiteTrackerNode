import { getBrowserLocation, GeoLocationResult } from "./geolocation";

const FALLBACK_LOCATION = {
    lat: 39.5,
    lng: -98.35,
    source: "fallback" as const
};

export async function resolveUserLocation(): Promise<GeoLocationResult> {
    try {
        return  await getBrowserLocation();
    } catch {
        try {
            // const res = await fetch("/api/geo/approx");
            // if (!res.ok) throw new Error("IP lookup failed");
            // return await res.json();
            return FALLBACK_LOCATION;
        } catch {
            return FALLBACK_LOCATION;
        }
    }
}