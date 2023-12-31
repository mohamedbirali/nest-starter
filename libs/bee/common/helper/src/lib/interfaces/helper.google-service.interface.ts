import {
  IHelperGooglePayload,
  IHelperGoogleRefresh,
} from '../interfaces/helper.interface';

export interface IHelperGoogleService {
  getTokenInfo(accessToken: string): Promise<IHelperGooglePayload>;
  refreshToken(refreshToken: string): Promise<IHelperGoogleRefresh>;
}
