import { inject, injectable } from 'tsyringe';
import Orphanage from '../infra/typeorm/entities/Orphanage';
import IOrphanagesRepository from '../repositories/IOrphanagesRepository';

interface IRequest {}

type IResponse = Orphanage[];

@injectable()
class ListOrphanageService {
  constructor(
    @inject('OrphanagesRepository')
    private repository: IOrphanagesRepository,
  ) {}

  public async execute(_req: IRequest): Promise<IResponse> {
    const orphanages = await this.repository.find({});

    return orphanages;
  }
}

export default ListOrphanageService;
