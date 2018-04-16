const jest = require('jest');
const config = require('./jest/jest.config');

jest.run(['--config', JSON.stringify(config)]);
