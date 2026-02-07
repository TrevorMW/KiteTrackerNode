import { useEffect, useRef, useState } from "react";
import { setOptions, importLibrary, Loader } from "@googlemaps/js-api-loader";
import { resolveUserLocation } from "../utils/resolveUserLocation";
import { GeoLocationResult } from '../utils/geolocation';

export default function Map() {
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mapRef.current) return;

        async function getConfig(): Promise<string> {
            const config = await fetch("/api/config").then(r => r.json());
            return config.googleMapsKey;
        }

        async function init() {
            const apiKey = await getConfig();
            if (!apiKey) throw new Error("Missing Google Maps API key");

            const center: GeoLocationResult | null = await resolveUserLocation();
            if (!center) return;

            // const loader = new Loader({
            //     apiKey,
            //     version: "weekly",
            //     libraries: ["maps", "marker"],
            // });

            setOptions({
                key: apiKey,
            });

            const { Map } = (await google.maps.importLibrary("maps")) as google.maps.MapsLibrary;
            const { AdvancedMarkerElement } = (await google.maps.importLibrary("marker")) as google.maps.MarkerLibrary;

            if (center) {
                const map = new Map(mapRef.current!, {
                    mapId: 'b12820423a3f993d8a49cc1a',
                    center: {
                        lat: center.lat,
                        lng: center.lng
                    },
                    zoom: center.source === "gps" ? 14 : 6
                });

                new AdvancedMarkerElement({
                    map,
                    position: {
                        lat: center.lat,
                        lng: center.lng
                    }
                });
            }
        }

        init().catch(console.error);

    }, []);

    return (
        <div ref={mapRef} style={{ width: "100%", height: "100vh" }} />
    );
}