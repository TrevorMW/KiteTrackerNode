"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const express_1 = require("express");
const db_1 = require("../db");
const router = (0, express_1.Router)();
/**
* GET /api/sightings
*/
router.get("/", async (_req, res) => {
    const [rows] = await db_1.pool.query("SELECT id, latitude, longitude, description, image_url, created_at FROM sightings ORDER BY created_at DESC");
    res.json(rows);
});
/**
* POST /api/sightings
*/
const upload = (0, multer_1.default)({ dest: "uploads/" });
router.post("/", upload.single("photo"), async (req, res) => {
    const body = req.body;
    const file = req.file;
    console.log(file);
    // Basic validation
    if (typeof body.latitude !== "string" ||
        typeof body.longitude !== "string" ||
        typeof body.description !== "string") {
        return res.status(400).json({ error: "Invalid payload" });
    }
    // Basic validation
    if (typeof file !== "string") {
        return res.status(400).json({ error: "Invalid File Upload" });
    }
    const { latitude, longitude, description, photo } = body;
    const [result] = await db_1.pool.execute(`INSERT INTO sightings (latitude, longitude, description, image_url)
    VALUES (?, ?, ?, ?)`, [latitude, longitude, description, photo]);
    res.status(201).json({
        id: result.insertId,
        latitude,
        longitude,
        description,
        photo
    });
});
exports.default = router;
//# sourceMappingURL=sightings.js.map