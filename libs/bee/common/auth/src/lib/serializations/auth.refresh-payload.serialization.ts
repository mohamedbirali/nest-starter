import { ApiProperty, OmitType } from '@nestjs/swagger';
import { AuthAccessPayloadSerialization } from '.';
// import { ResponseIdSerialization } from '@bee/common/response'; ///serializations/response.id.serialization';

export class AuthRefreshPayloadSerialization extends OmitType(
  AuthAccessPayloadSerialization,
  ['user'] as const,
) {
  @ApiProperty({
    required: true,
    nullable: false,
    // type: ResponseIdSerialization,
  })
  user: Record<string, any>;
}
