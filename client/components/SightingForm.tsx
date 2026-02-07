import axios from 'axios';
import { useEffect, useRef, useState } from "react";
import { resolveUserLocation } from "../utils/resolveUserLocation";
import { GeoLocationResult  } from '../utils/geolocation';

const SightingForm = () => {
    const [center, setCenter] = useState<GeoLocationResult | null>(null);
    const [latitude, setLatitude] = useState<number>(0);
    const [longitude, setLongitude] = useState<number>(0);

    const handleSightingSubmission = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;

        // handle submission logic here. POST to /api/sightings
        if(form instanceof HTMLFormElement) {
            const data = new FormData(form);

            axios.post('/api/sightings', data, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }).then(() => {
                debugger;
            });
        }   
    }

    useEffect(() => {
        // lets load the center location
        async function loadLocation() {
            const geoResult = await resolveUserLocation();
    
            if(geoResult){
                setCenter(geoResult);
            }
        }

        loadLocation();

        console.log('GET BASE COORDS: ',center);
    })

    
    return (
        <form id="sightingForm" method="POST" onSubmit={handleSightingSubmission}>
            <fieldset>
                <legend>Photography:</legend>

                <div className="fieldControl">
                    <label htmlFor="photo" className="photoButton">
                        📸 Take Photo
                        <input id="photo" name="photo" type="file" accept="image/*" capture="environment" />
                    </label>
                </div>
            </fieldset>
            <fieldset>
                <legend className="hasAction">
                    <div>Location Details:</div>
                    <div><a onClick={() => { }}>Refresh Location <span className="material-symbols-outlined">refresh</span></a></div>
                </legend>

                <div className="fieldControl half">
                    <label htmlFor="latitude">Latitude</label>
                    <input id="latitude" type="number" name="latitude" value={ center?.lat } readOnly />
                </div>

                <div className="fieldControl half last">
                    <label htmlFor="longitude">Longitude</label>
                    <input id="longitude" type="number" name="longitude" value={ center?.lng } readOnly />
                </div>

            </fieldset>
            <fieldset>
                <legend>Sighting Description:</legend>

                <div className="fieldControl">
                    <label htmlFor="description">Description</label>
                    <textarea id="description" name="description" placeholder="Please add a description about what you saw the bird doing, or how it was acting."></textarea>
                </div>
            </fieldset>
            <fieldset className="submit">
                <button type="submit">Submit Sighting</button>
            </fieldset>
        </form>
    );
};

export default SightingForm;