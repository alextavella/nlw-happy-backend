import uploadConfig from "../config/upload";
import Image from "../models/Image";

export default {
  render(image: Image) {
    return {
      id: image.id,
      url: `${uploadConfig.baseUrl}/uploads/${image.path}`,
    };
  },

  renderMany(images: Image[]) {
    return images.map(this.render);
  },
};
