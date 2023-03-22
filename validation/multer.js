const multer = require("multer");

// const uploads = multer({ dest : "./upload/pics"});

/* storage engine */
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage, limits: { fileSize: 1000000 } });
module.exports = { upload };
