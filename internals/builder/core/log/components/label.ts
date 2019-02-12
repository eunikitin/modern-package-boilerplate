// Dependencies
import * as colors  from 'colors';
import * as merge   from 'deepmerge';

// Components
import { colorize } from './colorize';


export interface LabelOptions {
  display?:    boolean;
  background?: colors.Color;
  foreground?: colors.Color;
  extra?:      colors.Color[];
}

export interface LabelParameters {
  label?:   string;
  options?: LabelOptions;
}

export const labelDefaults = {
  options: {
    display:    true,
    background: colors.bgWhite,
    foreground: colors.black,
    extra:      [],
  },
};

export const label = (params: LabelParameters) => {
  const { label, options } = merge(labelDefaults, params || {});

  return label && options.display
    ? colorize({ text: ` ${label} `, color: [options.background, options.foreground].concat(options.extra) })
    : '';
};

export default label;
