// Local
import * as components from '../components';
import { ELevels }     from '../config';


export const label = (
  label: components.LabelParameters | components.LabelParameters['label'],
  level: ELevels,
) => {
  const normalizedLabel: components.LabelParameters = {
    label: typeof label === 'object' ? label.label || level : label || level,
  };

  if (typeof label === 'object' && label.options) {
    normalizedLabel.options = label.options;
  }

  return normalizedLabel;
};

export default label;
