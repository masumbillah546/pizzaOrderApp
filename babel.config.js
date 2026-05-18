module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-worklets/plugin', 
    [
      'module-resolver',
      {
        root: ['./app'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        alias: {
          '@': './app', // 👈 Match this with your tsconfig.json "paths"
        },
      },
    ],
  ],
};
