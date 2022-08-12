import {
    CACHE_MANAGER,
    HttpException,
    HttpStatus,
    Inject,
    Injectable,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { PageOptionsDto, PageDto, PageInfoDto } from 'lib/dto'
import { Book } from './book.entity'
import { CreateBookDto } from './dtos/create-book.dto'
import { UpdateBookDto } from './dtos/update-book.dto'
import { Genre } from '../../modules/genres/genre.entity'
import { Author } from '../authors/author.entity'
import { Cache } from 'cache-manager'

@Injectable()
export class BooksService {
    constructor(
      @InjectRepository(Book) private bookRepo: Repository<Book>,
      @InjectRepository(Genre) private genreRepo: Repository<Genre>,
      @InjectRepository(Author) private authorRepo: Repository<Author>,
      @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) {}

    async getAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<Book>> {
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
        return this.bookRepo.findOne({ where: { id } })
    }

    async add(body: CreateBookDto) {
        const genre = await this.genreRepo.findOne({ where: { id: body.genreId } })
        const author = await this.authorRepo.findOne({
            where: { id: body.authorId },
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
        const book = await this.bookRepo.findOne({ where: { id } })

        if (book === null) {
            return new HttpException('Book not found', HttpStatus.NOT_FOUND)
        }

        await this.bookRepo.remove(book)
    }

    async update(id: number, body: UpdateBookDto) {
        const bookToUpdate = await this.bookRepo.findOne({ where: { id } })
        const genre = await this.genreRepo.findOne({ where: { id: body.genreId } })
        const author = await this.authorRepo.findOne({
            where: { id: body.authorId },
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

        const updatedBook = this.bookRepo.create({ id, genre, author, ...body })

        return this.bookRepo.save(updatedBook)
    }
}
