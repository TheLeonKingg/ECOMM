const multer  = require('multer');
const path = require('path');

const Storage = multer.diskStorage({
    destination:"./public/",
    filename:(req,file,cb)=>{
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({ storage: Storage,
    fileFilter: (req, file, cb) => {
        const fileSize = parseInt(req.headers["content-length"])
        if ((file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") && fileSize <= 15000) {
          cb(null, true);
        } else {
          cb(null, false);
          return cb(new Error('Only .png, .jpg and .jpeg format allowed! and file size shoul be less then 15 kb'));
        }
      } }).single('file');

module.exports = upload;