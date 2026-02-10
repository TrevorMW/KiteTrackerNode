import multer from "multer";
import { Router } from "express";
import { PrismaClient } from "@prisma/client";

import type { CreateSightingInput } from "../../../shared/types/sighting";

const prisma = new PrismaClient();
const router = Router();

/**
* GET /api/sightings
*/
router.get("/", async (_req, res, next) => {
    try {
        const rows = await prisma.sighting.findMany({
            include: { tags: true }
        });

        const sightings = rows.map(sighting => ({
            ...sighting,
            id: Number(sighting.id),
            latitude: Number(sighting.latitude),
            longitude: Number(sighting.longitude),
        }));

        res.json(sightings);
    } catch (err) {
        next(err);
    }
});

/**
* POST /api/sightings
*/
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("photo"), async (req, res) => {
    const body = req.body as Partial<CreateSightingInput>;
    const file: Express.Multer.File | undefined = req.file;

    // Basic validation
    if (
        typeof body.latitude !== "string" ||
        typeof body.longitude !== "string" ||
        typeof body.description !== "string"
    ) {
        return res.status(400).json({ error: "Invalid payload" });
    }

    if (!file) {
        return res.status(400).json({ error: "Invalid File Upload" });
    }

    const { latitude, longitude, description, photo } = body;

    const result = await prisma.sighting.create({
        data: {
            latitude,
            longitude,
            description,
            image_url: file.path,
        },
    });

    res.status(201).json({
        id: (result as any).insertId,
        latitude,
        longitude,
        description,
        photo
    });
});

export default router;