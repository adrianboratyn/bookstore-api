import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './dtos/create-book.dto';
import { UpdateBookDto } from './dtos/update-book.dto';
import { Genre } from 'src/genres/genre.entity';
import { Author } from 'src/authors/author.entity';
import { PageOptionsDto } from 'src/common/dtos/page-options.dto';
import { PageDto } from 'src/common/dtos/page.dto';
import { PageInfoDto } from 'src/common/dtos/page-info.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private bookRepo: Repository<Book>,
    @InjectRepository(Genre) private genreRepo: Repository<Genre>,
    @InjectRepository(Genre) private authorRepo: Repository<Author>,
  ) {}

  async getAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<Book>> {
    // return await this.repo.find();
    const queryBuilder = this.bookRepo.createQueryBuilder('book');

    queryBuilder.skip(pageOptionsDto.offset).take(pageOptionsDto.limit);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageInfoDto = new PageInfoDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageInfoDto);
  }

  async getById(id: number) {
    return await this.bookRepo.findOne({ where: { id: id } });
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
      console.log(book);
      return new HttpException('Book not found', HttpStatus.NOT_FOUND);
    }

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
    return await this.bookRepo.save(updatedBook);
  }
}
