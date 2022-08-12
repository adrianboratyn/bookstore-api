import { IsNumber, Min } from 'class-validator'

export class CreateLoanDto {
    @IsNumber()
    @Min(0)
    bookId: number

    @IsNumber()
    @Min(0)
    readerId: number
}
