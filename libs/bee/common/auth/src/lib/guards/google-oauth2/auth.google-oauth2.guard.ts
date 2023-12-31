import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ENUM_AUTH_STATUS_CODE_ERROR } from '../../constants';
import { AuthService } from '../../services';
import { IHelperGooglePayload } from '@bee/common/helper'; ///interfaces/helper.interface';

@Injectable()
export class AuthGoogleOauth2Guard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;
    const acArr = authorization.split('Bearer ');
    if (acArr.length !== 2) {
      throw new UnauthorizedException({
        statusCode: ENUM_AUTH_STATUS_CODE_ERROR.AUTH_GOOGLE_SSO_ERROR,
        message: 'auth.error.googleSSO',
      });
    }

    const accessToken: string = acArr[1];

    try {
      const payload: IHelperGooglePayload =
        await this.authService.googleGetTokenInfo(accessToken);

      request.user = {
        user: {
          email: payload.email,
        },
      };

      return true;
    } catch (err: any) {
      throw new UnauthorizedException({
        statusCode: ENUM_AUTH_STATUS_CODE_ERROR.AUTH_GOOGLE_SSO_ERROR,
        message: 'auth.error.googleSSO',
      });
    }
  }
}
