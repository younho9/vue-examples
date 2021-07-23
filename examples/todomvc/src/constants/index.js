import { filters } from '../utils';

export const FILTERS = Object.fromEntries(
  Object.keys(filters).map((key) => [key, key]),
);

export const STORAGE_KEY = 'todomvc-vuejs-2.0-younho9';
