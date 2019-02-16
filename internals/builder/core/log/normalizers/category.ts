// Local
import * as components from '../components';


export const category = (
  category: components.CategoryParameters | components.CategoryParameters['category'],
) => {
  const normalizedCategory: components.CategoryParameters = {
    category: typeof category === 'object' ? category.category : category,
  };

  if (typeof category === 'object' && (category as components.CategoryParameters).color) {
    normalizedCategory.color = (category as components.CategoryParameters).color;
  }

  return normalizedCategory;
};

export default category;
