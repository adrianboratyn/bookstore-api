import { IsString, Length } from 'class-validator'

export class CreateAuthorDto {
    @IsString()
    @Length(3, 20)
    firstName: string

    @IsString()
    @Length(3, 20)
    lastName: string
}
