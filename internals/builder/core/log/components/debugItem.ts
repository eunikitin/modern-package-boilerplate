// Dependencies
import * as util   from 'util';
import * as colors from 'colors';
import * as merge  from 'deepmerge';


export interface DebugItemOptions {
  showHidden?: boolean;
  depth?:      number;
  colors?:     boolean;
  compact?:    boolean;
}

export interface DebugItemParameters {
  key:      string;
  value:    object;
  options?: DebugItemOptions;
}

export const debugItemDefaults = {
  options: {
    colors:     true,
    compact:    true,
    depth:      null,
    showHidden: false,
  },
};

export const debugItem = (params: DebugItemParameters) => {
  const { key, value, options } = merge(debugItemDefaults, params || {});

  return `\n \n${colors.magenta(key)}: ${util.inspect(value, options)}`;
};

export default debugItem;
