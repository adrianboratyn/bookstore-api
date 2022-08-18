import { HttpStatus } from '@nestjs/common'

export enum InternalErrorCode {
    AuthorNotFound = 101
}

export type ErrorResponse = {
    code: HttpStatus,
    message?: string,
    internalCode?: InternalErrorCode
}
