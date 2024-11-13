
import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req: any, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        const uniqueFileName = Date.now() + '-' + Math.round(Math.random());
        cb(null, uniqueFileName + file.originalname)
    }
});

const upload = multer({
    storage: storage
});

export default upload;