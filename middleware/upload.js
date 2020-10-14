const util = require("util");
const multer = require("multer");
const maxSize = 8 * 1024 * 1024;

let storage = multer.diskStorage({
  destination: (req, files, cb) => {
    cb(null, __basedir + "/resources/static/assets/uploads/");
  },
  filename: (req, files, cb) => {
    console.log(files.originalname);
    cb(null, files.originalname);
  },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");
console.log();
let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;
