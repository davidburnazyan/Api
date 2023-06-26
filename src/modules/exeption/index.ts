import { Service } from 'typedi';
import { HttpStatus, HttpStatusMessages } from '../../enums';

@Service()
export class Exception extends Error {
    public httpCode: number;
    public errors: any | null;

    constructor(code: string = HttpStatusMessages.UNKNOWN, errors: any = null) {
        super(code);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = code;
        this.httpCode = HttpStatus.NOT_IMPLEMENTED;
        this.errors = errors;
        switch (code) {
            case HttpStatusMessages.VALIDATION_ERROR:
                this.httpCode = HttpStatus.BAD_REQUEST;
                break;
            case HttpStatusMessages.BAD_REQUEST:
                this.httpCode = HttpStatus.BAD_REQUEST;
                break;
            case HttpStatusMessages.UNAUTHORIZED:
                this.httpCode = HttpStatus.UNAUTHORIZED;
                break;
            case HttpStatusMessages.FORBIDDEN:
                this.httpCode = HttpStatus.FORBIDDEN;
                break;
            case HttpStatusMessages.NOT_FOUND:
                this.httpCode = HttpStatus.NOT_FOUND;
                break;
            default:
                this.httpCode = HttpStatus.NOT_IMPLEMENTED;
                break;
        }
    }

    public getDetails() {
        return {
            httpCode: this.httpCode,
            errors: this.errors
        };
    }
}