const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const app = express();
const port = 5001;
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./upload");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.put("/upload", upload.single("file"), (req, res) => {
  if (req.file) {
    res.json({ message: "File uploaded successfully." });
  } else {
    res.status(400).json({ error: "No file provided." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
