import ICreateOrphanageDTO from '@modules/orphanages/dtos/ICreateOrphanageDTO';
import OrphanageMapper from '@modules/orphanages/infra/http/mappers/OrphanagesMapper';
import Orphanage from '@modules/orphanages/infra/typeorm/entities/Orphanage';
import CreateOrphanageService from '@modules/orphanages/services/CreateOrphanageService';
import ListOrphanageService from '@modules/orphanages/services/ListOrphanageService';
import ShowOrphanageService from '@modules/orphanages/services/ShowOrphanageService';
import { Request, Response } from 'express';
import HttpStatus from 'http-status-codes';
import { container } from 'tsyringe';
import { getRepository } from 'typeorm';

export default class OrphanagesController {
  public async index(req: Request, res: Response) {
    const service = container.resolve(ListOrphanageService);

    const orphanages = await service.execute({});

    const result = orphanages ? OrphanageMapper.renderMany(orphanages) : [];

    return res.status(HttpStatus.OK).json(result);
  }

  public async show(req: Request, res: Response) {
    const { id } = req.params;

    const service = container.resolve(ShowOrphanageService);

    const orphanage = await service.execute({ id });

    const result = orphanage ? OrphanageMapper.render(orphanage) : null;

    return res.status(HttpStatus.OK).json(result);
  }

  public async create(req: Request, res: Response) {
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
    const images = requestImages?.map(image => ({
      path: image.filename,
    }));

    const createOrphanageService = container.resolve(CreateOrphanageService);

    const orphanage = await createOrphanageService.execute({
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images,
    });

    return res
      .status(HttpStatus.CREATED)
      .json(OrphanageMapper.render(orphanage));
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.params;

    const orphanagesRepository = getRepository(Orphanage);

    await orphanagesRepository.delete(id);

    return res.status(HttpStatus.OK).send();
  }
}
