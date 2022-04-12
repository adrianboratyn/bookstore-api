import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PageOptionsDto } from '../common/dtos/page-options.dto';
import { PageDto } from '../common/dtos/page.dto';
import { Book } from './book.entity';
import { BooksService } from './books.service';
import { CreateBookDto } from './dtos/create-book.dto';
import { UpdateBookDto } from './dtos/update-book.dto';

@Controller('book')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  async getBooks(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<Book>> {
    return await this.booksService.getAll(pageOptionsDto);
  }

  @Get('/:id')
  async getBook(@Param('id') id: string) {
    const book = await this.booksService.getById(+id);
    if (!book) {
      return new HttpException('Book not found', HttpStatus.NOT_FOUND);
    }
    return book;
  }

  @Post()
  async addBook(@Body() body: CreateBookDto) {
    return await this.booksService.add(body);
  }

  @Delete('/:id')
  async removeBook(@Param('id') id: string) {
    return await this.booksService.remove(+id);
  }

  @Patch('/:id')
  async updateBook(@Param('id') id: string, @Body() body: UpdateBookDto) {
    return await this.booksService.update(+id, body);
  }
}
