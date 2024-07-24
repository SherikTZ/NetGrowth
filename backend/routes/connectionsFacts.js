import express from "express";

const router = express.Router();

import ConnectionsFactsController from "../controllers/connectionsFacts.js";

router.get(
  "/api/connectionFacts/:id/get",
  ConnectionsFactsController.getConnectionFacts
);

router.post(
  "/api/connectionFacts/:id/post",
  ConnectionsFactsController.addConnectionFacts
);

router.patch(
  "/api/connectionFacts/:id/patch",
  ConnectionsFactsController.updateConnectionFacts
);

router.delete(
  "/api/connectionFacts/:id/delete",
  ConnectionsFactsController.deleteConnectionFacts
);

export default router;
