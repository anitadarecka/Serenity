const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, "../../public/uploads/"));
  },
  filename(req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    const fileName = file.originalname.substring(
      0,
      file.originalname.lastIndexOf(".")
    );
    cb(null, `${fileName}-${Date.now()}.${ext}`);
  },
});

const upload = multer({ storage });

module.exports = upload;
