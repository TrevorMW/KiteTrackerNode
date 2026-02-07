export interface GeoLocationResult {
    lat: number;
    lng: number;
    accuracy?: number;
    source: "gps" | "ip" | "fallback";
}
export declare function getBrowserLocation(timeoutMs?: number): Promise<GeoLocationResult>;
//# sourceMappingURL=geolocation.d.ts.map