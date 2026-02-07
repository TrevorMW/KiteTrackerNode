import { Router } from "express";

interface GeoResponse {
    latitude: number;
    longitude: number;
}

const router = Router();

router.get("/approx", async (req, res) => {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "";

    // Example using ipapi.co (no key for dev)
    const response = await fetch(`https://ipapi.co/json/`);
    const data = await response.json() as GeoResponse;

    //console.log(data);

    res.json({
        lat: data.latitude,
        lng: data.longitude,
        source: "ip"
    });
});

export default router;