import { TextEncoder, TextDecoder } from 'util';

beforeAll(() => {
    global.TextEncoder = TextEncoder;
    global.TextDecoder = TextDecoder;
});