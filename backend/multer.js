const path = require('path');
const config = require('./config');
const multer = require('multer');
const {nanoid} = require('nanoid');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'avatar') {
            cb(null, config.userAvatar);
        } else {
            cb(null, config.productImage);
        }
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

module.exports = upload;