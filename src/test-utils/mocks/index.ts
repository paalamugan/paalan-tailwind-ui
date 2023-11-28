import { mockCookieStorage } from './cookie';
import { mockImage } from './image';
import { mockLocalStorage } from './local-storage';
import { mockMatchMedia } from './match-media';
import { mockSessionStorage } from './session-storage';

export const mocks = {
  image: mockImage,
  cookie: mockCookieStorage,
  localStorage: mockLocalStorage,
  sessionStorage: mockSessionStorage,
  matchMedia: mockMatchMedia,
};
