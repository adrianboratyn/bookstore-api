import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { PageOptionsDto, PageDto } from 'lib/dto'
import { LoanEntity } from 'lib/entities'
import { CreateLoanDto } from './dtos/create-loan.dto'
import { LoansService } from './loans.service'

@Controller()
export class LoansController {
    constructor(private loansService: LoansService) {}

    @Get('loan')
    getLoans() {
        return this.loansService.getAll()
    }

    @Get('loan/:id')
    getLoan(@Param('id') id: string) {
        return this.loansService.getById(+id)
    }

    @Post('user/book')
    startLoan(@Body() body: CreateLoanDto) {
        return this.loansService.loanBook(body)
    }

    @Get('user/books')
    async getLoansByUser(
      @Query() pageOptionsDto: PageOptionsDto,
      @Body() body: { id: string },
    ): Promise<PageDto<LoanEntity>> {
        return this.loansService.getByUser(pageOptionsDto, +body.id)
    }

    @Post('user/book/:id/return')
    endLoan(@Param('id') id: string) {
        return this.loansService.returnBook(+id)
    }
}
