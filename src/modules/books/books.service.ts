import {
    HttpException,
    HttpStatus,
    Injectable,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { PageOptionsDto, PageDto, PageInfoDto } from 'lib/dto'
import { BookEntity, GenreEntity, AuthorEntity } from 'lib/entities'
import { CreateBookDto } from './dtos/create-book.dto'
import { UpdateBookDto } from './dtos/update-book.dto'

@Injectable()
export class BooksService {
    constructor(
      @InjectRepository(BookEntity) private bookRepo: Repository<BookEntity>,
      @InjectRepository(GenreEntity) private genreRepo: Repository<GenreEntity>,
      @InjectRepository(AuthorEntity) private authorRepo: Repository<AuthorEntity>
    ) {}

    async getAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<BookEntity>> {
        const queryBuilder = this.bookRepo.createQueryBuilder('book')

        queryBuilder
            .leftJoinAndSelect('book.genre', 'genre')
            .skip(pageOptionsDto.offset)
            .take(pageOptionsDto.limit)

        const itemCount = await queryBuilder.getCount()
        const { entities } = await queryBuilder.getRawAndEntities()

        const pageInfoDto = new PageInfoDto({ itemCount, pageOptionsDto })

        return new PageDto(entities, pageInfoDto)
    }

    async getById(id: number) {
        return this.bookRepo.findOne({ where: { bookId: id } })
    }

    async add(body: CreateBookDto) {
        const genre = await this.genreRepo.findOne({ where: { genreId: body.genreId } })
        const author = await this.authorRepo.findOne({
            where: { authorId: body.authorId },
        })

        if (!genre) {
            return new HttpException('Genre not found', HttpStatus.NOT_FOUND)
        }

        if (!author) {
            return new HttpException('Author not found', HttpStatus.NOT_FOUND)
        }

        const newBook = this.bookRepo.create({ genre, author, ...body })

        return this.bookRepo.save(newBook)
    }

    async remove(id: number) {
        const book = await this.bookRepo.findOne({ where: { bookId: id } })

        if (book === null) {
            return new HttpException('Book not found', HttpStatus.NOT_FOUND)
        }

        await this.bookRepo.remove(book)
    }

    async update(id: number, body: UpdateBookDto) {
        const bookToUpdate = await this.bookRepo.findOne({ where: { bookId: id } })
        const genre = await this.genreRepo.findOne({ where: { genreId: body.genreId } })
        const author = await this.authorRepo.findOne({
            where: { authorId: body.authorId },
        })

        if (!bookToUpdate) {
            return new HttpException('Book not found', HttpStatus.NOT_FOUND)
        }

        if (!genre) {
            return new HttpException('Genre not found', HttpStatus.NOT_FOUND)
        }

        if (!author) {
            return new HttpException('Author not found', HttpStatus.NOT_FOUND)
        }

        const updatedBook = this.bookRepo.create({ bookId: id, genre, author, ...body })

        return this.bookRepo.save(updatedBook)
    }
}
