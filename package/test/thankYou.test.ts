import thankYou from 'src/thankYou';


test('thank you text should be valid', () => {
  expect(thankYou()).toBe(`
  \x1b[42m\x1b[30m                                         \x1b[0m
  \x1b[42m\x1b[30m  Thank you for using this boilerplate!  \x1b[0m
  \x1b[42m\x1b[30m                                         \x1b[0m

  Getting started

  1. Clone the repo from github (https://github.com/eunikitin/modern-package-boilerplate.git)
  2. Inside the repo directory run npm install && rm -r .git && git init
  3. Update package.json with your information'

`);
});
