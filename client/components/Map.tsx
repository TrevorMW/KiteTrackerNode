import { useEffect, useRef, useState } from "react";

import { setOptions, importLibrary, Loader } from "@googlemaps/js-api-loader";
import { MarkerClusterer } from "@googlemaps/markerclusterer";

import { resolveUserLocation } from "../utils/resolveUserLocation";
import { GeoLocationResult } from '../utils/geolocation';
import { Sighting } from '../../shared/types/sighting';
import { Config } from '../../shared/types/config';

export default function Map() {
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mapRef.current) return;

        async function getConfig(): Promise<Config> {
            const config = await fetch("/api/config").then(r => r.json());
            console.log(config)
            return config;
        }

        async function getSightings(): Promise<Sighting[]> {
            const sightings = await fetch("/api/sightings").then(r => r.json());
            return sightings;
        }

        async function init() {
            let markers: google.maps.marker.AdvancedMarkerElement[] = [];

            const config = await getConfig();
            if (!config) throw new Error("Missing Google Maps API key");

            const center: GeoLocationResult | null = await resolveUserLocation();
            if (!center) return;

            setOptions({
                key: config.apiKey
            });

            const { Map } = (await google.maps.importLibrary("maps")) as google.maps.MapsLibrary;
            const { AdvancedMarkerElement } = (await google.maps.importLibrary("marker")) as google.maps.MarkerLibrary;

            if (center) {
                const bounds = new google.maps.LatLngBounds();
                const map = new Map(mapRef.current!, {
                    mapId: config.mapID,
                    center: {
                        lat: center.lat,
                        lng: center.lng
                    },
                    zoom: center.source === "gps" ? 14 : 6
                });

                const sightings = await getSightings();

                if (sightings.length > 0) {
                    for (const sighting of sightings) {
                        const marker = new AdvancedMarkerElement({
                            map,
                            position: {
                                lat: sighting.latitude,
                                lng: sighting.longitude
                            }
                        });

                        markers.push(marker);

                        bounds.extend({ lat: sighting.latitude, lng: sighting.longitude });
                    }

                    new MarkerClusterer({
                        map,
                        markers,
                    });

                    map.fitBounds(bounds);
                }
            }
        }

        init().catch(console.error);

    }, []);

    return (
        <div ref={mapRef} style={{ width: "100%", height: "100vh" }} />
    );
}