import FakeOrphanagesRepository from '../repositories/fakes/FakeOrphanagesRepository';
import CreateOrphanageService from './CreateOrphanageService';
import ShowOrphanageService from './ShowOrphanageService';

let fakeOrphanagesRepository: FakeOrphanagesRepository;
let createOrphanageService: CreateOrphanageService;
let showOrphanageService: ShowOrphanageService;

describe('ListOrphanage', () => {
  beforeEach(() => {
    fakeOrphanagesRepository = new FakeOrphanagesRepository();
    createOrphanageService = new CreateOrphanageService(
      fakeOrphanagesRepository,
    );
    showOrphanageService = new ShowOrphanageService(fakeOrphanagesRepository);
  });

  it('should be able to return undefined when not found orphanage', async () => {
    const orphanage = await showOrphanageService.execute({
      id: 'orphanage-id',
    });

    expect(orphanage).toBeUndefined();
  });

  it('should be able to show the orphanage', async () => {
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

    const orphanage = await showOrphanageService.execute({ id });

    expect(orphanage?.id).toBeTruthy();
    expect(orphanage?.name).toBe(data.name);
  });
});
