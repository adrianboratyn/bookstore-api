import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { getUnixTime } from 'date-fns'
import { BookEntity, LoanEntity, ReaderEntity } from 'lib/entities'
import { PageInfoDto, PageOptionsDto, PageDto } from 'lib/dto'
import { CreateLoanDto } from './dtos/create-loan.dto'

@Injectable()
export class LoansService {
    constructor(
      @InjectRepository(LoanEntity) private loanRepo: Repository<LoanEntity>,
      @InjectRepository(BookEntity) private bookRepo: Repository<BookEntity>,
      @InjectRepository(ReaderEntity) private readerRepo: Repository<ReaderEntity>,
    ) {}

    getAll() {
        return this.loanRepo.find()
    }

    getById(id: number) {
        return this.loanRepo.findOne({ where: { loanId: id } })
    }

    async loanBook(body: CreateLoanDto) {
        const book = await this.bookRepo.findOne({ where: { bookId: body.bookId } })
        const reader = await this.readerRepo.findOne({
            where: { readerId: body.readerId },
        })

        if (!book) {
            return new HttpException('Book not found', HttpStatus.NOT_FOUND)
        }

        if (reader === null) {
            return new HttpException('Reader not found', HttpStatus.NOT_FOUND)
        }

        if (book.quantity === 0) {
            return new HttpException(
                'There is no book in a stock',
                HttpStatus.EXPECTATION_FAILED,
            )
        }

        book.quantity -= 1
        const newLoan = this.loanRepo.create({ book, reader })
        await this.bookRepo.save(book)

        return this.loanRepo.save(newLoan)
    }

    async returnBook(id: number) {
        const loan = await this.loanRepo.findOneOrFail({ where: { loanId: id } })
        loan.untilDate = getUnixTime(new Date())
        loan.book.quantity += 1

        return this.loanRepo.save(loan)
    }

    async getByUser(
        pageOptionsDto: PageOptionsDto,
        readerId: number,
    ): Promise<PageDto<LoanEntity>> {
        const queryBuilder = this.loanRepo.createQueryBuilder('loan')

        queryBuilder
            .leftJoinAndSelect('loan.reader', 'reader')
            .where('loan.readerId = :id', { id: readerId })
            .skip(pageOptionsDto.offset)
            .take(pageOptionsDto.limit)

        const itemCount = await queryBuilder.getCount()
        const { entities } = await queryBuilder.getRawAndEntities()

        const pageInfoDto = new PageInfoDto({ itemCount, pageOptionsDto })

        return new PageDto(entities, pageInfoDto)
    }
}
