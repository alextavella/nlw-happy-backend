import FakeOrphanagesRepository from '../repositories/fakes/FakeOrphanagesRepository';
import CreateOrphanageService from './CreateOrphanageService';

let fakeOrphanagesRepository: FakeOrphanagesRepository;
let createOrphanageService: CreateOrphanageService;

describe('CreateOrphanage', () => {
  beforeEach(() => {
    fakeOrphanagesRepository = new FakeOrphanagesRepository();
    createOrphanageService = new CreateOrphanageService(
      fakeOrphanagesRepository,
    );
  });

  it('should be able to create a new orphanage', async () => {
    const orphanage = await createOrphanageService.execute({
      name: 'Orfanato Lar dos Meninos',
      latitude: -23.7116025,
      longitude: -46.5836981,
      about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      instructions:
        'Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Sed porttitor lectus nibh.',
      opening_hours: 'Das 8h às 18h',
      open_on_weekends: true,
      images: [],
    });

    expect(orphanage).toHaveProperty('id');
  });
});
