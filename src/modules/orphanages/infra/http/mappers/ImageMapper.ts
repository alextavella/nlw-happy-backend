import uploadConfig from '@config/upload';
import Image from '@modules/orphanages/infra/typeorm/entities/Image';

export default {
  render(image: Image) {
    return {
      id: image.id,
      url: `${uploadConfig.uploadsView}/${image.path}`,
    };
  },

  renderMany(images: Image[]) {
    return images.map(this.render);
  },
};
