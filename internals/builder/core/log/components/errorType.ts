// Dependencies
import * as colors     from 'colors';
import * as merge      from 'deepmerge';

// Local
import * as components from './';


export interface ErrorTypeParameters {
  type:  string;
  color: components.ColorParam;
}

export const errorTypeDefaults = {
  color: colors.red,
};

export const errorType = (params: ErrorTypeParameters) => {
  const { type, color } = merge(errorTypeDefaults, params || {});

  type ? components.colorize({ text: type, color }) : '';
};

export default errorType;
