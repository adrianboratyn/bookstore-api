import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Book, Reader, Loan } from 'lib/entities'
import { LoansService } from './loans.service'
import { LoansController } from './loans.controller'

@Module({
    imports: [TypeOrmModule.forFeature([Loan, Book, Reader])],
    controllers: [LoansController],
    providers: [LoansService],
})
export class LoansModule {}
