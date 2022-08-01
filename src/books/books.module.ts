import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Author } from '../authors/author.entity'
import { Genre } from '../genres/genre.entity'
import { Book } from './book.entity'
import { BooksService } from './books.service'
import { BooksController } from './books.controller'

@Module({
    imports: [TypeOrmModule.forFeature([Book, Genre, Author])],
    controllers: [BooksController],
    providers: [BooksService],
})
export class BooksModule {}
