import { Middleware, ExpressErrorMiddlewareInterface } from 'routing-controllers';
import { Request, Response } from 'express';
import { ValidationError } from 'class-validator';
import { TypeORMError } from 'typeorm';

import { Exception } from '../modules/exeption';
import { HttpStatus, HttpStatusMessages } from '../enums';
import { Service } from 'typedi';

const recursive = (element: ValidationError, parentProperty: string | null = null): any => {

    if (element.children && element.children.length) {
        return element.children.map((e: ValidationError) => {
            return recursive(e, parentProperty ? `${parentProperty}|${element.property}` : `${element.property}`);
        })
    } else {

        return {
            // @ts-ignore
            message: Object.values(element.constraints).join(','),
            property: parentProperty ? `${parentProperty}|${element.property}` : element.property
        }
    }
}

@Service()
@Middleware({ type: 'after' })
export class AuthHandlerMiddleware implements ExpressErrorMiddlewareInterface {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
    error(error: any, request: Request, response: Response, next: (err: any) => any) {
        console.info(error)
        if (Array.isArray(error.errors) && error.errors.every((element: any) => element instanceof ValidationError)) {
            const responseObject: any[] = [];
            error.errors.forEach((element: ValidationError) => {
                const a = recursive(element);
                responseObject.push(a)
            });
            response.status(error.httpCode).send({ name: HttpStatusMessages.VALIDATION_ERROR, errors: responseObject });

        } else if (error instanceof TypeORMError) {

            if (error.name === 'EntityNotFoundError') {
                response.status(HttpStatus.NOT_FOUND).send(
                    { name: HttpStatusMessages.NOT_FOUND, errors: error.message }
                );

            } else {

                response.status(HttpStatus.BAD_REQUEST).send({
                    name: HttpStatusMessages.BAD_REQUEST,
                    errors: {
                        message: error.message,
                        stack: error.stack
                    }
                });

            }
        } else if (error instanceof Exception) {
            response.status(error.getDetails().httpCode).send(error.getDetails());
        } else {

            response.status(HttpStatus.NOT_IMPLEMENTED).send({
                name: HttpStatusMessages.UNKNOWN,
                stack: error.stack,
                errors: error
            });
        }
    }
}
