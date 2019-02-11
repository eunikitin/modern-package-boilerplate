// Dependencies
import * as colors     from 'colors';
import * as merge      from 'deepmerge';

// Local
import * as components from './';


export interface CategoryParameters {
  category: string;
  color?:   components.ColorParam;
}

const categoryDefaults = {
  color: colors.cyan,
};

export const category = (params: CategoryParameters) => {
  const { category, color } = merge(categoryDefaults, params || {});

  return category ? `@${components.colorize({ text: category, color })}` : '';
};

export default category;
