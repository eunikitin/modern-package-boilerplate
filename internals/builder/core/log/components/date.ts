// Dependencies
import * as day        from 'dayjs';
import * as colors     from 'colors';
import * as merge      from 'deepmerge';

// Local
import * as components from './';


export interface DateOptions {
  display?: boolean;
  format?:  string;
  color?:   components.ColorParam;
}

export interface DateParameters {
  date:     Date;
  options?: DateOptions;
}

export const dateDefaults = {
  options: {
    display: true,
    format:  'HH:mm:ss',
    color:   colors.cyan,
  },
};

export const date = (params: DateParameters) => {
  const { date, options } = merge(dateDefaults, params || {});

  return options.display ? components.colorize({ text: day(date).format(options.format), color: options.color }) : '';
};

export default date;
