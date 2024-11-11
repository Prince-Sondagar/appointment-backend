
import multer from 'multer';

const storag = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        const uniqueFileName = Date.now() + '-' + Math.round(Math.random());
        cb(null, uniqueFileName + file.originalname)
    }
});

const upload = multer({
    storage: storag
});

export default upload;