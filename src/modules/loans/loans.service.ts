import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Book } from '../books/book.entity'
import { PageInfoDto, PageOptionsDto, PageDto } from 'lib/dto'
import { Reader } from '../readers/reader.entity'
import { Repository } from 'typeorm'
import { CreateLoanDto } from './dtos/create-loan.dto'
import { Loan } from './loan.entity'

@Injectable()
export class LoansService {
    constructor(
      @InjectRepository(Loan) private loanRepo: Repository<Loan>,
      @InjectRepository(Book) private bookRepo: Repository<Book>,
      @InjectRepository(Reader) private readerRepo: Repository<Reader>,
    ) {}

    getAll() {
        return this.loanRepo.find()
    }

    getById(id: number) {
        return this.loanRepo.findOne({ where: { id } })
    }

    async loanBook(body: CreateLoanDto) {
        const book = await this.bookRepo.findOne({ where: { id: body.bookId } })
        const reader = await this.readerRepo.findOne({
            where: { id: body.readerId },
        })

        if (book === null) {
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
        const loan = await this.loanRepo.findOneOrFail({ where: { id } })
        loan.until = new Date()
        loan.book.quantity += 1

        return this.loanRepo.save(loan)
    }

    async getByUser(
        pageOptionsDto: PageOptionsDto,
        readerId: number,
    ): Promise<PageDto<Loan>> {
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
