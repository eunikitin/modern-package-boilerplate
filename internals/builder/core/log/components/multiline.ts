

export interface MultilineParameters {
  text:  string;
  check: boolean;
}

export const multiline = (
  text:  MultilineParameters['text'],
  check: MultilineParameters['check'] = true,
) => (
  text.includes('\n') || !check ? `\n\n${text}\n` : `${text}`
);

export default multiline;
