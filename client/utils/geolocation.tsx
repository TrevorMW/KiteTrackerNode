export interface GeoLocationResult {
    lat: number;
    lng: number;
    accuracy?: number;
    source: "gps" | "ip" | "fallback";
}

export function getBrowserLocation(
    timeoutMs = 8000
): Promise<GeoLocationResult> {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error("Geolocation not supported"));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                resolve({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                    accuracy: pos.coords.accuracy,
                    source: "gps"
                });
            },
            (err) => reject(err),
            {
                enableHighAccuracy: true,
                timeout: timeoutMs,
                maximumAge: 60_000
            }
        );
    });
}