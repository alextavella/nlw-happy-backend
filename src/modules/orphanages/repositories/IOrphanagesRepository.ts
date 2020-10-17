import ICreateOrphanageDTO from '../dtos/ICreateOrphanageDTO';
import IDeleteOrphanageDTO from '../dtos/IDeleteOrphanageDTO';
import IListOrphanageDTO from '../dtos/IListOrphanageDTO';
import IShowOrphanageDTO from '../dtos/IShowOrphanageDTO';

import Orphanage from '../infra/typeorm/entities/Orphanage';

export default interface IOrphanagesRepository {
  create(data: ICreateOrphanageDTO): Promise<Orphanage>;
  find(data: IListOrphanageDTO): Promise<Orphanage[]>;
  show(data: IShowOrphanageDTO): Promise<Orphanage | undefined>;
  delete(data: IDeleteOrphanageDTO): Promise<void>;
}
