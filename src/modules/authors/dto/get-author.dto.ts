import { IsUUID } from 'class-validator'

export class GetAuthorDto {
    @IsUUID(4)
    readonly authorUUID: string
}
