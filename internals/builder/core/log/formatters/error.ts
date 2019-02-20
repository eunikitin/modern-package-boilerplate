// Dependencies
import * as colors      from 'colors';
import * as merge       from 'deepmerge';

// Local
import * as components  from '../components';
import * as normalizers from '../normalizers';
import * as types       from '../types';
import * as formatters  from './';


export interface ErrorFormatterData extends types.FormatterData, types.TraceData {
  level:    'error' | 'fatal';
  name?:    string;
  err?:     Error;
  promise?: Promise<any>;
}

export function errorFormatter(data: types.WithDynamicParams<ErrorFormatterData>) {
  const normalizedData: types.NormalizedErrorData = normalizers.warn(data);

  return ''.concat(
    formatters.baseFormatter(merge(
      { label: { label: 'error', options: { background: colors.bgRed } } },
      normalizedData,
    )),
    normalizedData.code ? '\n ' : '',
    normalizedData.code ? '\n ' : '',
    components.code(normalizedData.code),
    normalizedData.stack ? '\n ' : '',
    components.stack(normalizedData.stack),
    normalizedData.stack ? '\n ' : '',
  );
}
