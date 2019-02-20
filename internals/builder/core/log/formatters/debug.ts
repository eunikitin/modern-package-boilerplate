// Dependencies
import * as colors      from 'colors';
import * as merge       from 'deepmerge';

// Local
import * as components  from '../components';
import * as normalizers from '../normalizers';
import * as types       from '../types';
import * as formatters  from './';


export interface DebugFormatterData extends types.FormatterData {
  message?: string;
  options?: components.DebugItemOptions;
  data:     any;
}

const dataItem = (data, options) => {
  if (data instanceof Array) {
    return data.map((item, i) => components.debugItem({ key: i.toString(), value: item, options })).join();
  }
  return components.debugItem({ key: typeof data, value: data, options });
};

export function debugFormatter(data: types.WithDynamicParams<DebugFormatterData>) {
  const normalizedData: types.NormalizedErrorData = normalizers.base(data);

  return ''.concat(
    formatters.baseFormatter(merge(
      { label: { label: 'debug', options: { background: colors.bgMagenta } } },
      normalizedData,
    )),
    dataItem(data.data, data.options),
    '\n\n ',
  );
}
