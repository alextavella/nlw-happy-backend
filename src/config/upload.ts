import multer from 'multer';
import path from 'path';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');
const viewFilder = process.env.APP_API_URL ?? '';

export default {
  tmpFolder: tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, 'uploads'),
  uploadsView: path.join(viewFilder, 'uploads'),
  storage: multer.diskStorage({
    destination: path.join(tmpFolder, 'uploads'),
    filename: (request, file, cb) => {
      const fileName = `${Date.now()}-${file.originalname}`;

      cb(null, fileName);
    },
  }),
};
