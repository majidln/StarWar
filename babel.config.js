module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@common-component': './src/components/common',
          '@screen-component': './src/components/screen',
          '@screens': './src/screen',
          '@services': './src/services',
          '@themes': './src/services/theme',
        },
      },
    ],
  ],
};
