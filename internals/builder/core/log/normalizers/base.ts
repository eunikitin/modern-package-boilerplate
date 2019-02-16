// Local
import * as types       from '../types';
import * as normalizers from '../normalizers';


export const base = (data: types.WithDynamicParams<types.FormatterData>): types.NormalizedLogEntry => {
  const normalizedData: any = data;

  normalizedData.date                        = normalizers.date(data.date, data.timestamp);
  if (data.label)    normalizedData.label    = normalizers.label(data.label, data.level);
  if (data.category) normalizedData.category = normalizers.category(data.category);
  if (data.message)  normalizedData.message  = normalizers.message(data.message);

  return normalizedData;
};
