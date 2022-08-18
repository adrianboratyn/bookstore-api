import { IsString, Length, MaxLength } from 'class-validator'

export class CreateAuthorDto {
    @IsString()
    @Length(3, 20)
    readonly firstName: string

    @IsString()
    @Length(3, 20)
    readonly lastName: string

    @IsString()
    @MaxLength(1000)
    readonly description: string
}
