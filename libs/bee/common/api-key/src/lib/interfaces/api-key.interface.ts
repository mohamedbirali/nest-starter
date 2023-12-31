import { ENUM_API_KEY_TYPE } from '../constants/api-key.enum.constant';

export interface IApiKeyPayload {
  _id: string;
  key: string;
  type: ENUM_API_KEY_TYPE;
  name: string;
}

export interface IApiKeyCreated {
  secret: string;
}
