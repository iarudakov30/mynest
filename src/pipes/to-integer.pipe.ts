import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform
} from '@nestjs/common';

export class ToIntegerPipe implements PipeTransform<string> {
  transform(value: string, metadata: ArgumentMetadata): number {
    const val = parseInt(value);
    if (isNaN(val)) {
      throw new BadRequestException('pipe to number failed' + value);
    }

    return val;
  }
}
