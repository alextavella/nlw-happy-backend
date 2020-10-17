import ListOrphanageService from '@modules/orphanages/services/ListOrphanageService';
import FakeOrphanagesRepository from '../repositories/fakes/FakeOrphanagesRepository';
import CreateOrphanageService from './CreateOrphanageService';
import DeleteOrphanageService from './DeleteOrphanageService';

let fakeOrphanagesRepository: FakeOrphanagesRepository;
let createOrphanageService: CreateOrphanageService;
let deleteOrphanageService: DeleteOrphanageService;
let listOrphanageService: ListOrphanageService;

describe('DeleteOrphanage', () => {
  beforeEach(() => {
    fakeOrphanagesRepository = new FakeOrphanagesRepository();
    createOrphanageService = new CreateOrphanageService(
      fakeOrphanagesRepository,
    );
    deleteOrphanageService = new DeleteOrphanageService(
      fakeOrphanagesRepository,
    );
    listOrphanageService = new ListOrphanageService(fakeOrphanagesRepository);
  });

  it('should be able to delete the orphanage', async () => {
    const data = {
      name: 'Orfanato Lar dos Meninos',
      latitude: -23.7116025,
      longitude: -46.5836981,
      about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      instructions:
        'Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Sed porttitor lectus nibh.',
      opening_hours: 'Das 8h às 18h',
      open_on_weekends: true,
      images: [],
    };

    const { id } = await createOrphanageService.execute(data);

    await deleteOrphanageService.execute({ id });

    const orphanages = await listOrphanageService.execute({});

    expect(orphanages.length).toBe(0);
  });
});
