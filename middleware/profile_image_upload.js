const multer = require("multer");

// setup storage for uploaded image
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/images/profile_images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// create multer instance
const profileImgUpload = multer({ storage: storage });

module.exports = profileImgUpload;
