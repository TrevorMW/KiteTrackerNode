import multer from "multer";
import { Router } from "express";
import { pool } from "../db";
import { Sighting } from "../../../shared/types/sighting";

const router = Router();

/**
* GET /api/sightings
*/
router.get("/", async (_req, res) => {
    const [rows] = await pool.query<any[]>(
        "SELECT id, latitude, longitude, description, image_url, created_at FROM sightings ORDER BY created_at DESC"
    );

    const sightings = rows.map(row => ({
        ...row,
        latitude: Number(row.latitude),
        longitude: Number(row.longitude),
    }));

    res.json(sightings);
});

/**
* POST /api/sightings
*/
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("photo"), async (req, res) => {
    const body = req.body as Partial<Sighting>;
    const file: Express.Multer.File | undefined = req.file;

    console.log(file);

    // Basic validation
    if (
        typeof body.latitude !== "string" ||
        typeof body.longitude !== "string" ||
        typeof body.description !== "string"
    ) {
        return res.status(400).json({ error: "Invalid payload" });
    }

    // Basic validation
    if (typeof file !== "string") {
        return res.status(400).json({ error: "Invalid File Upload" });
    }

    const { latitude, longitude, description, photo } = body;

    const [result] = await pool.execute(
        `INSERT INTO sightings (latitude, longitude, description, image_url)
    VALUES (?, ?, ?, ?)`,
        [latitude, longitude, description, photo]
    );

    res.status(201).json({
        id: (result as any).insertId,
        latitude,
        longitude,
        description,
        photo
    });
});

export default router;