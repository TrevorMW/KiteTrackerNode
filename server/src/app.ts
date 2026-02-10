import dotenv from "dotenv";
import path from "path";

dotenv.config({
    path: path.resolve(__dirname, "../../../../.env")
});

import express from "express";
import routes from "./routes";
import sightingsRouter from "./routes/sightings";
import geoRouter from "./routes/geo";
import tagsRouter from "./routes/tags";

import { Request, Response } from "express";

// __dirname = server/src OR dist/server (both OK)
const PROJECT_ROOT = path.resolve(__dirname, "../../../../");
const app = express();

app.use(express.json());

// Get google maps config key to keep from exposing it in other weird ways.
app.get("/api/config", (req, res) => {
    res.json({
        mapID: process.env.GOOGLE_MAPS_MAP_ID,
        apiKey: process.env.GOOGLE_MAPS_KEY,
    });
});

// Need this as a backup for browser based geolocation. 
// If that fails, we use this to determine a rough location
app.use("/api/geo", geoRouter);

// This is used to get sightings
app.use("/api/tags", tagsRouter);

// This is used to get sightings
app.use("/api/sightings", sightingsRouter);

// If we have an API route, this catches it first 
// and uses routes to figure out which one matches
app.use("/api", routes);

// Otherwise, check to see if we are asking for an assets 
// route to serve a static file or media.
app.use("/assets",
    express.static(
        path.join(PROJECT_ROOT, "assets")
    )
);

// Catch all route that handles the entrypoint into the app.
app.get(/.*/, (_req: Request, res: Response) => {
    res.sendFile(
        path.join(PROJECT_ROOT, "/client/index.html")
    );
});

export default app;