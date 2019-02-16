// Local
import { ELevels }       from './config';
import * as components   from './components';


export type WithDynamicParams<T extends FormatterData, D = {}> = T & D & {
  timestamp: Date;
  err?:      Error;
};

export interface FormatterData {
  level:     ELevels;
  date?:     components.DateParameters     | components.DateParameters['date'];
  label?:    components.LabelParameters    | components.LabelParameters['label'];
  category?: components.CategoryParameters | components.CategoryParameters['category'];
  message?:  components.MessageParameters  | components.MessageParameters['message'];
}

export interface TraceData {
  code?:  components.CodeParameters  | components.CodeParameters['code'];
  stack?: components.StackParameters | components.StackParameters['stack'];
}

export interface NormalizedLogEntry {
  level:     ELevels;
  timestamp: Date;
  date?:     components.DateParameters;
  label?:    components.LabelParameters;
  category?: components.CategoryParameters;
  message?:  components.MessageParameters;
}

export interface NormalizedErrorData extends NormalizedLogEntry {
  code?:  components.CodeParameters;
  stack?: components.StackParameters;
}

export interface FormatterOptions {
  shouldNormalize: boolean;
}

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type OmitDynamicData<T extends FormatterData> = Omit<T, 'level'>;
