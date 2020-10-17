import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import OrphanagesController from '../controllers/OrphanagesController';
import OrphanagesValidations from '../validations/OrphanagesValidations';

const upload = multer(uploadConfig);

const router = Router();
const orphanagesController = new OrphanagesController();

router.post(
  '/',
  upload.array('images'),
  OrphanagesValidations.create,
  orphanagesController.create,
);

router.get('/', orphanagesController.index);

router.get('/:id', OrphanagesValidations.show, orphanagesController.show);

router.delete(
  '/:id',
  OrphanagesValidations.delete,
  orphanagesController.delete,
);

export default router;
