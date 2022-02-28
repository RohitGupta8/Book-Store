/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    }
});

export const upload = multer({
    storage: storage,
    fileFilter: (req, file, callback) => {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
            callback(null, true);
        } else {
            callback(null, false);
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 5
    }
});