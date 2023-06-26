import { Inject, Service } from 'typedi';
import { Config } from '../../config';
import * as  bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { IGenerateHash } from './interfaces';
import { ErrorMessages, HttpStatusMessages, TokenTypes } from '../../enums';
import { Exception } from '../exeption';

interface IPayload {
    userId: string;
    type: TokenTypes;
}

@Service()
export class Security {
    public constructor(@Inject() private readonly config: Config) {
    }

    /**
     * @param password
     */
    public async passAndSalt(password: string): Promise<IGenerateHash> {
        const salt = await bcrypt.genSalt(this.config.bcryptGenSaltRounds);
        const hashPassword = await bcrypt.hash(password, salt);
        return {
            password: hashPassword,
            salt
        };
    }

    /**
     * @param password
     * @param hashedPassword
     */
    public async checkPassword(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }

    /**
     * @param data
     * @param tokenType
     */
    public generateToken(data: { [key: string]: string }, tokenType: TokenTypes) {
        let expiresIn: string;

        switch (tokenType) {
            case TokenTypes.REFRESH:
                expiresIn = this.config.refreshTokenLife as string;
                break;
            case TokenTypes.FORGOT_PASSWORD:
                expiresIn = this.config.refreshTokenLife as string;
                break;
            case TokenTypes.ACCESS:
                expiresIn = this.config.accessTokenLife as string;
                break;
            default:
                expiresIn = this.config.refreshTokenLife as string;
        }

        return jwt.sign({ data }, this.config.tokenSecret as string, { expiresIn });
    }

    public verifyJwt(token: string): IPayload {
        try {
            return <IPayload>jwt.verify(token, this.config.tokenSecret);
        } catch (e) {
            throw new Exception(HttpStatusMessages.BAD_REQUEST, { error: ErrorMessages.TOKEN_PARSE_ERROR });
        }
    }
}
