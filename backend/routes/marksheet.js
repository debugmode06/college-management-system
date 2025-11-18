import express from "express";
import multer from "multer";
import { processMarksheet } from "../helpers/marksheetExtract.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/ocr-marksheet", upload.single("marksheet"), async (req, res) => {
  try {
    const result = await processMarksheet(req.file.path);
    res.json(result);
  } catch (err) {
    console.error("OCR error:", err);
    res.status(500).json({ error: "OCR extraction failed" });
  }
});

export default router;
