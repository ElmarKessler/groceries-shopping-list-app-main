module.exports = {
    testEnvironment: 'jsdom',
    setupFiles: ['./jest.setup.js'],
};
if (typeof TextEncoder === 'undefined') {
    global.TextEncoder = require('text-encoding').TextEncoder;
    global.TextDecoder = require('text-encoding').TextDecoder;
  }