const multer = require("multer");

const upload = multer({
  storage: multer.diskStorage({
    destination: "tmp",
    filename: (req, file, cb) => {
      cb(null, `${req.user}-${file.originalname}`);
    },
  }),
});

module.exports = upload;
