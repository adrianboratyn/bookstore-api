import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateLoanDto } from './dtos/create-loan.dto';
import { LoansService } from './loans.service';

@Controller('loan')
export class LoansController {
  constructor(private loansService: LoansService) {}

  @Get()
  getLoans() {
    return this.loansService.getAll();
  }

  @Get('/:id')
  getLoan(@Param('id') id: string) {
    return this.loansService.getById(+id);
  }

  @Post('user/book')
  startLoan(@Body() body: CreateLoanDto) {
    return this.loansService.loanBook(body);
  }

  @Get('user/books')
  getLoansByUser(@Body() body: { id: string }) {
    return this.loansService.getByUser(+body.id);
  }

  @Post('/:id/return')
  endLoan(@Param('id') id: string) {
    return this.loansService.returnBook(+id);
  }
}
