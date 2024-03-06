import { createParamDecorator } from '@nestjs/common';

export const Payload = createParamDecorator((data, req) => {
  return req.user;
});
