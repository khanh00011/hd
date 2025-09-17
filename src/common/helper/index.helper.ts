import { BadRequestException } from '@nestjs/common';
import { EMAIL_REGEX } from '../regex';

const helper = {
  validateEmail(email: string) {
    if (!EMAIL_REGEX.test(email)) {
      throw new BadRequestException('EMail không hợp lệ');
    }
  },
};
export default helper;
