const multer = require("multer");

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Please upload a pdf file."));
    }
    cb(null, true);
  },
  limits: 5 * 1024 * 1024,
});

module.exports = upload;
