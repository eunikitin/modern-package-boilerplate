// Dependencies
import * as colors      from 'colors';
import * as merge       from 'deepmerge';

// Local
import * as components  from '../components';
import * as types       from '../types';
import * as normalizers from '../normalizers';
import * as formatters  from './';


export interface WarnFormatterData extends types.FormatterData, types.TraceData {}

export function warnFormatter(data: types.WithDynamicParams<WarnFormatterData>) {
  const normalizedData: types.NormalizedErrorData = normalizers.warn(data);

  return ''.concat(
    formatters.baseFormatter(merge(
      { label: { label: 'warn', options: { background: colors.bgYellow } } },
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
