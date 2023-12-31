import { faker } from '@faker-js/faker';
import { ApiProperty, PickType } from '@nestjs/swagger';
import {
  ResponseDefaultSerialization,
  ResponseMetadataSerialization,
} from '../serializations/response.default.serialization';

enum ENUM_PAGINATION_ORDER_DIRECTION_TYPE {
  ASC = 'asc',
  DESC = 'desc',
}
export class ResponsePaginationCursorSerialization {
  nextPage: string;
  previousPage: string;
  firstPage: string;
  lastPage: string;
}

export class ResponsePaginationSerialization {
  total: number;
  totalPage: number;
  @ApiProperty({
    required: true,
    nullable: false,
    example: faker.person.fullName(),
  })
  search: string;

  @ApiProperty({
    required: true,
    nullable: false,
    example: {},
  })
  filters: Record<
    string,
    string | number | boolean | Array<string | number | boolean>
  >;

  @ApiProperty({
    required: true,
    nullable: false,
    example: 1,
  })
  page: number;

  @ApiProperty({
    required: true,
    nullable: false,
    example: 20,
  })
  perPage: number;

  @ApiProperty({
    required: true,
    nullable: false,
    example: 'createdAt',
  })
  orderBy: string;

  @ApiProperty({
    required: true,
    nullable: false,
    example: ENUM_PAGINATION_ORDER_DIRECTION_TYPE.ASC,
  })
  orderDirection: ENUM_PAGINATION_ORDER_DIRECTION_TYPE;

  @ApiProperty({
    required: true,
    nullable: false,
    example: ['name'],
  })
  availableSearch: string[];

  @ApiProperty({
    required: true,
    nullable: false,
    example: ['name', 'createdAt'],
  })
  availableOrderBy: string[];

  @ApiProperty({
    required: true,
    nullable: false,
    example: Object.values(ENUM_PAGINATION_ORDER_DIRECTION_TYPE),
  })
  availableOrderDirection: ENUM_PAGINATION_ORDER_DIRECTION_TYPE[];
}
export interface ResponsePagingMetadataSerialization
  extends ResponseMetadataSerialization {
  cursor?: ResponsePaginationCursorSerialization;
  pagination?: ResponsePaginationSerialization;
}

export class ResponsePagingSerialization<
  T = Record<string, any>,
> extends PickType(ResponseDefaultSerialization, [
  'statusCode',
  'message',
] as const) {
  @ApiProperty({
    name: '_metadata',
    required: true,
    nullable: false,
    description: 'Contain metadata about API',
    type: 'object',
    example: {
      languages: ['en'],
      timestamp: 1660190937231,
      timezone: 'Asia/Jakarta',
      requestId: '40c2f734-7247-472b-bc26-8eff6e669781',
      path: '/api/v1/test/hello',
      version: '1',
      repoVersion: '1.0.0',
      pagination: {
        search: faker.person.fullName(),
        page: 1,
        perPage: 20,
        orderBy: 'createdAt',
        orderDirection: ENUM_PAGINATION_ORDER_DIRECTION_TYPE.ASC,
        availableSearch: ['name'],
        availableOrderBy: ['createdAt'],
        availableOrderDirection: Object.values(
          ENUM_PAGINATION_ORDER_DIRECTION_TYPE,
        ),
        total: 100,
        totalPage: 5,
      },
      cursor: {
        nextPage: `http://217.0.0.1/__path?perPage=10&page=3&search=abc`,
        previousPage: `http://217.0.0.1/__path?perPage=10&page=1&search=abc`,
        firstPage: `http://217.0.0.1/__path?perPage=10&page=1&search=abc`,
        lastPage: `http://217.0.0.1/__path?perPage=10&page=20&search=abc`,
      },
    },
  })
  readonly _metadata: ResponsePagingMetadataSerialization;

  readonly data: T[];
}
