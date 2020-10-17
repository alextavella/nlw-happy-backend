import { inject, injectable } from 'tsyringe';
import Orphanage from '../infra/typeorm/entities/Orphanage';
import IOrphanagesRepository from '../repositories/IOrphanagesRepository';

interface IRequest {
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: {
    path: string;
  }[];
}

type IResponse = Orphanage;

@injectable()
class CreateOrphanageService {
  constructor(
    @inject('OrphanagesRepository')
    private repository: IOrphanagesRepository,
  ) {}

  public async execute({
    name,
    latitude,
    longitude,
    about,
    instructions,
    opening_hours,
    open_on_weekends,
    images,
  }: IRequest): Promise<IResponse> {
    const orphanage = await this.repository.create({
      name,
      latitude: String(latitude),
      longitude: String(longitude),
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images,
    });

    return orphanage;
  }
}

export default CreateOrphanageService;
