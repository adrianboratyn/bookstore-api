import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Book } from '../books/book.entity'
import { Reader } from '../readers/reader.entity'
import { Loan } from './loan.entity'
import { LoansService } from './loans.service'
import { LoansController } from './loans.controller'

@Module({
    imports: [TypeOrmModule.forFeature([Loan, Book, Reader])],
    controllers: [LoansController],
    providers: [LoansService],
})
export class LoansModule {}
