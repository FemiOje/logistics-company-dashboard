import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

const originalError = console.error;
console.error = (...args) => {
  if (/ReactDOMTestUtils.act|react-dom\/test-utils/.test(args[0])) {
    return;
  }
  if (/ReactDOM.render|unmountComponentAtNode|react-dom\/test-utils/.test(args[0])) {
    return;
  }
  originalError(...args);
};

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;