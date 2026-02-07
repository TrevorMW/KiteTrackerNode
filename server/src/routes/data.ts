import { Router } from "express";
import { submitData } from "../controllers/data.controller";

const router = Router();

router.post("/", submitData);

export default router;