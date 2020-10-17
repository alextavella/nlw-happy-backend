import { inject, injectable } from 'tsyringe';
import IOrphanagesRepository from '../repositories/IOrphanagesRepository';

interface IRequest {
  id: string;
}

type IResponse = void;

@injectable()
class DeleteOrphanageService {
  constructor(
    @inject('OrphanagesRepository')
    private repository: IOrphanagesRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<IResponse> {
    await this.repository.delete({ id });
  }
}

export default DeleteOrphanageService;
