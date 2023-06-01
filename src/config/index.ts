// import { validateSync } from 'class-validator';
import { ConfigValidator } from './config.validator';
import { plainToClass } from 'class-transformer';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { Service } from 'typedi';
import * as fs from 'fs';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const srcDestinationDir = fs.existsSync('./build') ? 'build' : 'src'

@Service()
export class Config {
    public readonly env: ConfigValidator;
    constructor() {
        this.env = plainToClass(ConfigValidator, process.env);
        // const validationResult = validateSync(this.env);
        // if (validationResult.length) {
        //     console.error('env validation error', validationResult);
        //     throw Error('env validation error');
        // }
    }

    get port(): number {
        return this.env.PORT;
    }

    get accessTokenLife(): string {
        return this.env.ACCESS_TOKEN_LIFE;
    }

    get refreshTokenLife(): string {
        return this.env.REFRESH_TOKEN_LIFE;
    }

    get clubDomain(): string {
        return this.env.CLUB_DOMAIN;
    }

    get apiDomain(): string {
        return this.env.API_DOMAIN;
    }

    get bcryptGenSaltRounds(): number {
        return 10;
    }

    get tokenSecret(): string {
        return this.env.TOKEN_SECRET;
    }
}
