const path = require('path');
let appPath = process.cwd();

module.exports = {
  rootDir: appPath,
  unmockedModulePathPatterns: ['__tests__', 'node_modules', '.*'],
  testPathDirs: [`<rootDir>/src/`],
  collectCoverage: true,
  coverageReporters: ['json', 'html', 'json-summary', 'text'],
  transform: {
    '^.+\\.js$': path.join(__dirname, 'jsPreProcessor.js'),
    '^.+\\.css$': path.resolve(__dirname, 'cssPreProcessor.js')
  },
  testRegex: '__tests__.*?.(test|spec).(js|json|node)$',
  setupFiles: [path.join(__dirname, 'jest.setup.js')],
  verbose: true
};
