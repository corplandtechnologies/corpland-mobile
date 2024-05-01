import express from "express";
import {
  createRequest,
  getAllRequests,
  getRequestById,
  updateRequest,
  deleteRequest,
} from "./request.controller";
import parser from "../../libs/cloudinary";


const router = express.Router();

router.post("/", parser.single("image"), createRequest);
router.get("/", getAllRequests);
router.get("/:id", getRequestById);
router.put("/:id", updateRequest);
router.delete("/:id", deleteRequest);

export default router;
