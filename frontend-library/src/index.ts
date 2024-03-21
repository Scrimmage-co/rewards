import 'reflect-metadata';
import { create } from './create';
import { Instance } from './types/Instance';
import { InitOptions } from './types/InitOptions';

let instance: Instance;

const init = (options: InitOptions) => {
  instance = create(options);
};

export { init, create };
