

export interface Preset<T> {
  name: string;
  data: T;
}

export interface PresetMap<T> {
  [name: string]: T;
}
