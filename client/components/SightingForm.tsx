import axios from 'axios';
import { useEffect, useRef, useState } from "react";
import { resolveUserLocation } from "../utils/resolveUserLocation";
import { GeoLocationResult } from '../utils/geolocation';

import { Tag } from "../../shared/types/tag";

import { useUserLocation } from "./useUserLocations";
import { useTags } from "./useTags";

import { slugify } from "../../shared/helpers/stringHelper";


const SightingForm = () => {
    const center = useUserLocation();
    const { tags } = useTags();

    async function handleSightingSubmission() {
        
    }
    
    return (
        <form id="sightingForm" method="POST" onSubmit={handleSightingSubmission}>
            <input id="latitude" type="hidden" name="latitude" value={center?.lat} readOnly />
            <input id="longitude" type="hidden" name="longitude" value={center?.lng} readOnly />

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
                <legend>
                    <div>Sighting Details:</div>
                    {/* <div><a onClick={() => { }}>Refresh Location <span className="material-symbols-outlined">refresh</span></a></div> */}
                </legend>

                {/* <div className="fieldControl half">
                    <label htmlFor="latitude">Latitude</label>
                    <input id="latitude" type="number" name="latitude" value={ center?.lat } readOnly />
                </div>

                <div className="fieldControl half last">
                    <label htmlFor="longitude">Longitude</label>
                    <input id="longitude" type="number" name="longitude" value={ center?.lng } readOnly />
                </div> */}

                <ul className="sightingTagTypes">
                    { tags.map(tag => (
                        <li key={tag.tagValue}>
                            <label htmlFor={slugify(tag.tagName)}>
                                <input type="checkbox" id={slugify(tag.tagName)} name="sighting_tags[]" value={tag.tagValue} /> 
                                {tag.tagName}
                            </label>
                        </li>
                    ))}
                </ul>

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