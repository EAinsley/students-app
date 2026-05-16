import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  /**
   *
   * @param value the input value of the data currently being handled before it is received by our route handler
   * @param metadata metadata of the above data
   * @returns whatever value is returned by this function will completly override the previous value
   */
  transform(value: string, metadata: ArgumentMetadata) {
    const val = parseInt(value, 10);

    console.log(metadata);
    if (isNaN(val)) {
      throw new BadRequestException(
        `Validation failed. "${val}" is not an integer.`,
      );
    }
    return val;
  }
}
