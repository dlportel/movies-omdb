import { AuthInterceptor } from './auth-interceptor';
import {MaterialUtilsService} from '../../services/material-utils.service';

describe('AuthInterceptor', () => {
  it('should create an instance', () => {
    expect(new AuthInterceptor(new MaterialUtilsService(), null)).toBeTruthy();
  });
});
