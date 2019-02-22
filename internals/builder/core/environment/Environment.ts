// Dependencies
import * as merge from 'deepmerge';

// Local
import * as types from './types';


export class Environment<T> {
  defaults: T;
  presets:  types.PresetMap<T>;

  constructor(presets: types.Preset<T>[], defaults: T) {
    this.defaults = defaults;
    this.presets  = {};
    presets.forEach(preset => this.presets[preset.name] = preset.data);
  }

  getSettings(...presets: (string | T)[]) {
    return merge.all([this.defaults].concat(
      presets.map(preset =>
        typeof preset === 'string' ? this.presets[preset as string] : preset,
      ),
    ));
  }
}

export default Environment;
