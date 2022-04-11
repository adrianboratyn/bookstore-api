import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './dtos/create-book.dto';
import { UpdateBookDto } from './dtos/update-book.dto';
import { Genre } from 'src/genres/genre.entity';
import { Author } from 'src/authors/author.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private repo: Repository<Book>,
    @InjectRepository(Genre) private repo2: Repository<Genre>,
    @InjectRepository(Genre) private repo3: Repository<Author>,
  ) {}

  async getAll() {
    return await this.repo.find();
  }

  async getById(id: number) {
    return await this.repo.findOne({ where: { id: id } });
  }

  async add(body: CreateBookDto) {
    const genre = await this.repo2.findOne({ where: { id: body.genreId } });
    const author = await this.repo3.findOne({ where: { id: body.authorId } });

    if (!genre)
      return new HttpException('Genre not found', HttpStatus.NOT_FOUND);
    if (!author)
      return new HttpException('Author not found', HttpStatus.NOT_FOUND);

    const newBook = this.repo.create({ genre, author, ...body });
    return await this.repo.save(newBook);
  }

  async remove(id: number) {
    const book = await this.repo.findOne({ where: { id: id } });

    if (book === null) {
      console.log(book);
      return new HttpException('Book not found', HttpStatus.NOT_FOUND);
    }

    await this.repo.remove(book);
  }

  async update(id: number, body: UpdateBookDto) {
    const bookToUpdate = await this.repo.findOne({ where: { id: id } });
    const genre = await this.repo2.findOne({ where: { id: body.genreId } });
    const author = await this.repo3.findOne({ where: { id: body.authorId } });

    if (!bookToUpdate)
      return new HttpException('Book not found', HttpStatus.NOT_FOUND);
    if (!genre)
      return new HttpException('Genre not found', HttpStatus.NOT_FOUND);
    if (!author)
      return new HttpException('Author not found', HttpStatus.NOT_FOUND);

    const updatedBook = this.repo.create({ id, genre, author, ...body });
    return await this.repo.save(updatedBook);
  }
}
