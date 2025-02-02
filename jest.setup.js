import { TextEncoder, TextDecoder } from 'util';

// Polyfill TextEncoder and TextDecoder globally for tests
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
