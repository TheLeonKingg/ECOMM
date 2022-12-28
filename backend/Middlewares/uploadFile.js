const multer  = require('multer');
const path = require('path');

const Storage = multer.diskStorage({
    destination:"./public/",
    filename:(req,file,cb)=>{
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({ storage: Storage }).single('file');

module.exports = upload;