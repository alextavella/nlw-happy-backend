import ICreateOrphanageDTO from '@modules/orphanages/dtos/ICreateOrphanageDTO';
import IDeleteOrphanageDTO from '@modules/orphanages/dtos/IDeleteOrphanageDTO';
import IListOrphanageDTO from '@modules/orphanages/dtos/IListOrphanageDTO';
import IShowOrphanageDTO from '@modules/orphanages/dtos/IShowOrphanageDTO';
import IOrphanagesRepository from '@modules/orphanages/repositories/IOrphanagesRepository';
import { getRepository, Repository } from 'typeorm';
import Orphanage from '../entities/Orphanage';

class OrphanagesRepository implements IOrphanagesRepository {
  private readonly ormRepository: Repository<Orphanage>;

  constructor() {
    this.ormRepository = getRepository(Orphanage);
  }

  public async create({
    name,
    latitude,
    longitude,
    about,
    instructions,
    opening_hours,
    open_on_weekends,
    images,
  }: ICreateOrphanageDTO): Promise<Orphanage> {
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

    const orphanage = this.ormRepository.create(data);

    await this.ormRepository.save(orphanage);

    return orphanage;
  }

  public async find(_data: IListOrphanageDTO): Promise<Orphanage[]> {
    const orphanages = await this.ormRepository.find({
      relations: ['images'],
    });

    return orphanages;
  }

  public async show({ id }: IShowOrphanageDTO): Promise<Orphanage | undefined> {
    const orphanage = await this.ormRepository.findOne(id, {
      relations: ['images'],
    });

    return orphanage;
  }

  public async delete({ id }: IDeleteOrphanageDTO): Promise<void> {
    this.ormRepository.delete(id);
  }
}

export default OrphanagesRepository;
