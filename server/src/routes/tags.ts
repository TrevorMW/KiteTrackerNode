import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

/**
* GET /api/tags
*/
router.get("/", async (_req, res) => {
    const tags = await prisma.tag.findMany();
    const newTags = tags.map(tag => ({
        ...tag,
        id: Number(tag.id)
    }));

    res.json(newTags);
});

export default router;