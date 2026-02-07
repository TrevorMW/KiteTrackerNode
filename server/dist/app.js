"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({
    path: path_1.default.resolve(__dirname, "../../.env")
});
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const sightings_1 = __importDefault(require("./routes/sightings"));
const geo_1 = __importDefault(require("./routes/geo"));
// __dirname = server/src OR dist/server (both OK)
const PROJECT_ROOT = path_1.default.resolve(__dirname, "../../");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Get google maps config key to keep from exposing it in other weird ways.
app.get("/api/config", (req, res) => {
    res.json({
        googleMapsKey: process.env.GOOGLE_MAPS_KEY,
    });
});
// Need this as a backup for browser based geolocation. 
// If that fails, we use this to determine a rough location
app.use("/api/geo", geo_1.default);
// This is used to get sightings
app.use("/api/sightings", sightings_1.default);
// If we have an API route, this catches it first 
// and uses routes to figure out which one matches
app.use("/api", routes_1.default);
// Otherwise, check to see if we are asking for an assets 
// route to serve a static file or media.
app.use("/assets", express_1.default.static(path_1.default.join(PROJECT_ROOT, "assets")));
// Catch all route that handles the entrypoint into the app.
app.get(/.*/, (_req, res) => {
    res.sendFile(path_1.default.join(PROJECT_ROOT, "/client/index.html"));
});
exports.default = app;
//# sourceMappingURL=app.js.map