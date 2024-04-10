import { Api } from './api';
import { Container } from 'inversify';

export interface Instance {
  api: Api;
  _container: Container;
  isInitialized: boolean;
}
