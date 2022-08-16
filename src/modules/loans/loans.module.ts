import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BookEntity, ReaderEntity, LoanEntity } from 'lib/entities'
import { LoansService } from './loans.service'
import { LoansController } from './loans.controller'

@Module({
    imports: [TypeOrmModule.forFeature([LoanEntity, BookEntity, ReaderEntity])],
    controllers: [LoansController],
    providers: [LoansService],
})
export class LoansModule {}
