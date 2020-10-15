import { Request, Response, NextFunction } from "express";
import * as Yup from "yup";

export default {
  async create(req: Request, res: Response, next: NextFunction) {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    } = req.body;

    const requestImages = req.files as Express.Multer.File[];
    const images = requestImages?.map((image) => ({
      path: image.filename,
    }));

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required("Nome é obrigatório"),
      latitude: Yup.number().required("Latitude é obrigatório"),
      longitude: Yup.number().required("Longitude é obrigatório"),
      about: Yup.string().max(600, "Sobre deve ter no máximo 600 caracteres"),
      instructions: Yup.string(),
      opening_hours: Yup.string(),
      open_on_weekends: Yup.string(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
        })
      ),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    next(data);
  },
};
