import express from "express";
const router = express.Router();

import factsController from "../controllers/facts.js";

router.get("/api/facts/:id/get", factsController.getFacts);
router.post("/api/facts/:id/post", factsController.addFact);
router.delete("/api/facts/:id/delete", factsController.deleteFact);

export default router;
