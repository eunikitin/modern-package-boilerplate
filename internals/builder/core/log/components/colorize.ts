// Dependencies
import * as colors from 'colors';


export type ColorParam = colors.Color | colors.Color[];

export interface ColorizeParameters {
  text:  string;
  color: ColorParam;
}

export const colorize = ({ text, color }: ColorizeParameters) => {
  let colorizedText = text;
  if (color instanceof Array) {
    color.forEach(clr => colorizedText = clr(colorizedText));
  } else {
    colorizedText = color(colorizedText);
  }
  return colorizedText;
};

export default colorize;
