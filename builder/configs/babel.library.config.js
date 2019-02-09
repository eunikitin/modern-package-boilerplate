

export default {
  presets: [
    ['@babel/preset-env', { modules: false }],
    '@babel/preset-react',
    '@babel/preset-flow',
  ],
  plugins: [
    ['module-resolver', {
      root: ['./src'],
    }],
  ],
};
