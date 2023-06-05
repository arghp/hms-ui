module.exports = {
  rootDir: 'src',
  moduleFileExtensions: ['js', 'json', 'jsx','vue'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.vue$': '@vue/vue3-jest',
  },
  transformIgnorePatterns: ['/node_modules/(?!(@vue/vue3-jest|vue-router))'],
  moduleNameMapper: {
    "^vue$": "@vue/runtime-dom",

  },
//  setupFilesAfterEnv: ['./setupTests.js'],

//  testEnvironment: 'jsdom',
};
