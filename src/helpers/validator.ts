import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

export const validatorDto = async <T extends ClassConstructor<any>>(
    dto: T,
    // eslint-disable-next-line @typescript-eslint/ban-types
    obj: Object
) => {
    const objInstance = plainToClass(dto, obj);
    const errors = await validate(objInstance, { whitelist: true });
    if (errors.length > 0) {
        throw new TypeError(
            `validation failed. The error fields : ${errors.map(
                ({ property }) => property
            )}`
        );
    }
    return objInstance;
};
