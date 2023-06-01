import { Type } from 'class-transformer';
import { IsDefined, IsInt, IsNotEmpty, Max, Min } from 'class-validator';

export class ConfigValidator {
    @IsDefined()
    @Type(() => Number)
    @IsNotEmpty()
    @IsInt()
    @Min(1000)
    @Max(9999)
    PORT!: number;

    @IsDefined()
    @Type(() => String)
    @IsNotEmpty()
    POSTGRES_HOST!: string;

    @IsDefined()
    @Type(() => String)
    @IsNotEmpty()
    POSTGRES_USER!: string;

    @IsDefined()
    @Type(() => String)
    @IsNotEmpty()
    POSTGRES_PASSWORD!: string;

    @IsDefined()
    @Type(() => String)
    @IsNotEmpty()
    POSTGRES_DATABASE!: string;

    @IsDefined()
    @Type(() => String)
    @IsNotEmpty()
    POSTGRES_SCHEMA!: string;

    @IsDefined()
    @Type(() => Number)
    @IsNotEmpty()
    POSTGRES_PORT!: number;

    @IsDefined()
    @Type(() => String)
    @IsNotEmpty()
    ACCESS_TOKEN_LIFE!: string;

    @IsDefined()
    @Type(() => String)
    @IsNotEmpty()
    REFRESH_TOKEN_LIFE!: string;

    @IsDefined()
    @Type(() => String)
    @IsNotEmpty()
    TOKEN_SECRET!: string;

    @IsDefined()
    @Type(() => String)
    @IsNotEmpty()
    SENDGRID_API_KEY!: string;

    @IsDefined()
    @Type(() => String)
    @IsNotEmpty()
    SENDGRID_SENDER_EMAIL!: string;

    @IsDefined()
    @Type(() => String)
    @IsNotEmpty()
    MEMBER_DOMAIN!: string;

    @IsDefined()
    @Type(() => String)
    @IsNotEmpty()
    API_DOMAIN!: string;

    @IsDefined()
    @Type(() => String)
    @IsNotEmpty()
    CLUB_DOMAIN!: string;

    @IsDefined()
    @Type(() => String)
    @IsNotEmpty()
    AWS_S3_BUCKET!: string;

    @IsDefined()
    @Type(() => String)
    @IsNotEmpty()
    AWS_ACCESS_KEY_ID!: string;

    @IsDefined()
    @Type(() => String)
    @IsNotEmpty()
    AWS_SECRET_ACCESS_KEY!: string;
}
