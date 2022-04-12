import {
  CACHE_MANAGER,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './dtos/create-book.dto';
import { UpdateBookDto } from './dtos/update-book.dto';
import { Genre } from '../genres/genre.entity';
import { Author } from '../authors/author.entity';
import { PageOptionsDto } from '../common/dtos/page-options.dto';
import { PageDto } from '../common/dtos/page.dto';
import { PageInfoDto } from '../common/dtos/page-info.dto';
import { Cache } from 'cache-manager';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private bookRepo: Repository<Book>,
    @InjectRepository(Genre) private genreRepo: Repository<Genre>,
    @InjectRepository(Genre) private authorRepo: Repository<Author>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getOrSetCache(key: string, cb) {
    const value: string = await this.cacheManager.get(key);
    console.log(key);
    if (value) {
      console.log('Return from cache');
      return JSON.parse(value);
    }
    const data = await cb();
    await this.cacheManager.set(key, JSON.stringify(data));
    console.log('Return from db');
    return data;
  }

  async getAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<Book>> {
    const data = await this.getOrSetCache(
      `book?page=${pageOptionsDto.page}&limit=${pageOptionsDto.limit}`,
      async () => {
        const queryBuilder = this.bookRepo.createQueryBuilder('book');

        queryBuilder
          .leftJoinAndSelect('book.genre', 'genre')
          .skip(pageOptionsDto.offset)
          .take(pageOptionsDto.limit);

        const itemCount = await queryBuilder.getCount();
        const { entities } = await queryBuilder.getRawAndEntities();

        const pageInfoDto = new PageInfoDto({ itemCount, pageOptionsDto });

        return new PageDto(entities, pageInfoDto);
      },
    );
    return data;
  }

  async getById(id: number) {
    const book = await this.getOrSetCache(`book/${id}`, async () => {
      return await this.bookRepo.findOne({ where: { id: id } });
    });
    return book;
  }

  async add(body: CreateBookDto) {
    const genre = await this.genreRepo.findOne({ where: { id: body.genreId } });
    const author = await this.authorRepo.findOne({
      where: { id: body.authorId },
    });
    if (!genre)
      return new HttpException('Genre not found', HttpStatus.NOT_FOUND);
    if (!author)
      return new HttpException('Author not found', HttpStatus.NOT_FOUND);

    const newBook = this.bookRepo.create({ genre, author, ...body });
    return await this.bookRepo.save(newBook);
  }

  async remove(id: number) {
    const book = await this.bookRepo.findOne({ where: { id: id } });

    if (book === null) {
      return new HttpException('Book not found', HttpStatus.NOT_FOUND);
    }
    await this.cacheManager.del(`book/${id}`);
    await this.bookRepo.remove(book);
  }

  async update(id: number, body: UpdateBookDto) {
    const bookToUpdate = await this.bookRepo.findOne({ where: { id: id } });
    const genre = await this.genreRepo.findOne({ where: { id: body.genreId } });
    const author = await this.authorRepo.findOne({
      where: { id: body.authorId },
    });

    if (!bookToUpdate)
      return new HttpException('Book not found', HttpStatus.NOT_FOUND);
    if (!genre)
      return new HttpException('Genre not found', HttpStatus.NOT_FOUND);
    if (!author)
      return new HttpException('Author not found', HttpStatus.NOT_FOUND);

    const updatedBook = this.bookRepo.create({ id, genre, author, ...body });
    await this.cacheManager.del(`book/${id}`);
    return await this.bookRepo.save(updatedBook);
  }
}
