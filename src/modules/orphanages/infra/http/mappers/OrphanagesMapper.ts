import Orphanage from '@modules/orphanages/infra/typeorm/entities/Orphanage';
import ImageMapper from './ImageMapper';

export default {
  render(orphanage: Orphanage) {
    return {
      id: orphanage.id,
      name: orphanage.name,
      latitude: Number(orphanage.latitude),
      longitude: Number(orphanage.longitude),
      about: orphanage.about,
      instructions: orphanage.instructions,
      opening_hours: orphanage.opening_hours,
      open_on_weekends: Boolean(orphanage.open_on_weekends),
      images: ImageMapper.renderMany(orphanage.images),
    };
  },

  renderMany(orphanages: Orphanage[]) {
    return orphanages.map(this.render);
  },
};
