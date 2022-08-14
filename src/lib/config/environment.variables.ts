import {
    IsEnum,
    IsInt,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString
} from 'class-validator'
import { Type } from 'class-transformer'
import { NodeEnv } from './constants'

export class EnvironmentVariables {
    @IsOptional()
    @IsEnum(NodeEnv)
    readonly NODE_ENV: NodeEnv = NodeEnv.Development

    @IsOptional()
    @IsNumber()
    readonly API_PORT: number = 3000

    @IsOptional()
    @IsString()
    readonly API_HOST: string = '0.0.0.0'

    @IsOptional()
    @IsString()
    readonly API_URL: string = 'http://localhost'

    @IsOptional()
    @IsString()
    readonly CORS_ALLOWED_ORIGINS: string = '*'

    @IsString()
    readonly TYPEORM_CONNECTION: 'mysql' | 'mariadb'

    @IsString()
    readonly TYPEORM_HOST: string

    @IsString()
    readonly TYPEORM_USERNAME: string

    @IsString()
    readonly TYPEORM_PASSWORD: string

    @IsString()
    readonly TYPEORM_DATABASE: string

    @IsInt()
    @IsPositive()
    readonly TYPEORM_PORT: number

    @Type(() => String)
    @IsString()
    readonly TYPEORM_LOGGING: string = 'false'

    @Type(() => String)
    @IsString()
    readonly TYPEORM_DEBUG: string = 'false'

    @Type(() => String)
    @IsString()
    readonly TYPEORM_SYNCHRONIZE: string = 'false'
}
