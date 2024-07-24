import express from "express";
const router = express.Router();

import connectionsController from "../controllers/connections.js";

router.get("/api/connections/:id/get", connectionsController.getConnections);
router.post("/api/connections/:id/post", connectionsController.addConnection);
router.delete(
  "/api/connections/:id/delete",
  connectionsController.deleteConnection
);

export default router;
