import {
    PipeTransform,
    Injectable,
    ArgumentMetadata,
    BadRequestException,
} from '@nestjs/common';
import { ZodType } from 'zod';

@Injectable()
export class ValidationPipe implements PipeTransform {
    constructor(private readonly _schema: ZodType) { }

    transform(value: unknown, _metadata: ArgumentMetadata) {
        const { error, data, success } = this._schema.safeParse(value);

        if (!success) {
            console.log(
                error.issues.map((issue) => {
                    return { path: issue.path, message: issue.message }
                })
            );
            throw new BadRequestException('Validation failed');
        }



        return data;
    }
}
