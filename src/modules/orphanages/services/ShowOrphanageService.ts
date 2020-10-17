import { inject, injectable } from 'tsyringe';
import Orphanage from '../infra/typeorm/entities/Orphanage';
import IOrphanagesRepository from '../repositories/IOrphanagesRepository';

interface IRequest {
  id: string;
}

type IResponse = Orphanage | undefined;

@injectable()
class ShowOrphanageService {
  constructor(
    @inject('OrphanagesRepository')
    private repository: IOrphanagesRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<IResponse> {
    const orphanage = await this.repository.show({ id });

    return orphanage;
  }
}

export default ShowOrphanageService;
