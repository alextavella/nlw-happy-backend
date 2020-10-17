import FakeOrphanagesRepository from '../repositories/fakes/FakeOrphanagesRepository';
import CreateOrphanageService from './CreateOrphanageService';
import ListOrphanageService from './ListOrphanageService';

let fakeOrphanagesRepository: FakeOrphanagesRepository;
let createOrphanageService: CreateOrphanageService;
let listOrphanageService: ListOrphanageService;

describe('ListOrphanage', () => {
  beforeEach(() => {
    fakeOrphanagesRepository = new FakeOrphanagesRepository();
    createOrphanageService = new CreateOrphanageService(
      fakeOrphanagesRepository,
    );
    listOrphanageService = new ListOrphanageService(fakeOrphanagesRepository);
  });

  it('should be able to empty list of orphanages', async () => {
    const orphanages = await listOrphanageService.execute({});

    expect(orphanages.length).toBe(0);
  });

  it('should be able to list the orphanages', async () => {
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

    await createOrphanageService.execute(data);

    const orphanages = await listOrphanageService.execute({});

    expect(orphanages.length).toBe(1);
    expect(orphanages[0].name).toBe(data.name);
  });
});
