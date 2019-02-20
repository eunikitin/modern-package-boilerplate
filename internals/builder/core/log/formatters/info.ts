// Dependencies
import * as colors      from 'colors';
import * as merge       from 'deepmerge';

// Local
import * as types       from '../types';
import * as normalizers from '../normalizers';
import * as formatters  from './';


export interface InfoFormatterData extends types.FormatterData {}

export const infoFormatter = (data: types.WithDynamicParams<InfoFormatterData>) => {
  const normalizedData: types.NormalizedLogEntry = normalizers.base(data);

  return ''.concat(
    formatters.baseFormatter(merge(
      { label: { label: 'info', options: { background: colors.bgBlue } } },
      {
        timestamp: normalizedData.timestamp,
        ...normalizedData,
      },
    )),
  );
};
