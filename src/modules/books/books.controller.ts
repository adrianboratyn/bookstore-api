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
    Query
} from '@nestjs/common'
import { PageOptionsDto, PageDto } from 'lib/dto'
import { BookEntity } from 'lib/entities'
import { BooksService } from './books.service'
import { CreateBookDto } from './dtos/create-book.dto'
import { UpdateBookDto } from './dtos/update-book.dto'

@Controller('book')
export class BooksController {
    constructor(private booksService: BooksService) {}

    @Get()
    async getBooks(
      @Query() pageOptionsDto: PageOptionsDto,
    ): Promise<PageDto<BookEntity>> {
        return this.booksService.getAll(pageOptionsDto)
    }

    @Get('/:id')
    async getBook(@Param('id') id: string) {
        const book = await this.booksService.getById(+id)

        if (!book) {
            return new HttpException('Book not found', HttpStatus.NOT_FOUND)
        }

        return book
    }

    @Post()
    async addBook(@Body() body: CreateBookDto) {
        return this.booksService.add(body)
    }

    @Delete('/:id')
    async removeBook(@Param('id') id: string) {
        return this.booksService.remove(+id)
    }

    @Patch('/:id')
    async updateBook(@Param('id') id: string, @Body() body: UpdateBookDto) {
        return this.booksService.update(+id, body)
    }
}
