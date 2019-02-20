// Dependencies
import * as merge       from 'deepmerge';

// Local
import * as components  from '../components';
import * as normalizers from '../normalizers';
import * as types       from '../types';
import * as utils       from '../utils';


export interface BaseFormatterData extends types.FormatterData {}


export const baseFormatter = (
  data:    types.WithDynamicParams<BaseFormatterData>,
  options: types.FormatterOptions = utils.formatterOptionsDefaults,
) => {
  const opts           = merge(utils.formatterOptionsDefaults, options || {});
  const normalizedData = opts.shouldNormalize ? normalizers.base(data) : data as types.NormalizedLogEntry;

  return ''.concat(
    components.append({ text: components.date(normalizedData.date) }),
    components.append({ text: components.label(normalizedData.label) }),
    components.append({ text: components.category(normalizedData.category) }),
    components.append({ text: components.message(normalizedData.message) }),
  );
};
