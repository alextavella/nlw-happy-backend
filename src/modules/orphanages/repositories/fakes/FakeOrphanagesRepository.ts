import ICreateOrphanageDTO from '@modules/orphanages/dtos/ICreateOrphanageDTO';
import IDeleteOrphanageDTO from '@modules/orphanages/dtos/IDeleteOrphanageDTO';
import IListOrphanageDTO from '@modules/orphanages/dtos/IListOrphanageDTO';
import IShowOrphanageDTO from '@modules/orphanages/dtos/IShowOrphanageDTO';
import Orphanage from '@modules/orphanages/infra/typeorm/entities/Orphanage';
import IOrphanagesRepository from '@modules/orphanages/repositories/IOrphanagesRepository';
import { v4 as uuid } from 'uuid';

export default class FakeOrphanagesRepository implements IOrphanagesRepository {
  private orphanages: Orphanage[] = [];

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
    const orphanage: Orphanage = new Orphanage();

    Object.assign(orphanage, {
      id: uuid(),
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images,
    });

    this.orphanages.push(orphanage);

    return orphanage;
  }

  public async find(data: IListOrphanageDTO): Promise<Orphanage[]> {
    return this.orphanages;
  }

  public async show({ id }: IShowOrphanageDTO): Promise<Orphanage | undefined> {
    return this.orphanages.find(item => item.id === id);
  }

  public async delete({ id }: IDeleteOrphanageDTO): Promise<void> {
    this.orphanages = this.orphanages.filter(item => item.id !== id);
  }
}
