"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/approx", async (req, res) => {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "";
    // Example using ipapi.co (no key for dev)
    const response = await fetch(`https://ipapi.co/json/`);
    const data = await response.json();
    //console.log(data);
    res.json({
        lat: data.latitude,
        lng: data.longitude,
        source: "ip"
    });
});
exports.default = router;
//# sourceMappingURL=geo.js.map