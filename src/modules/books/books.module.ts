import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Author, Genre, Book } from 'lib/entities'
import { BooksService } from './books.service'
import { BooksController } from './books.controller'

@Module({
    imports: [TypeOrmModule.forFeature([Book, Genre, Author])],
    controllers: [BooksController],
    providers: [BooksService],
})
export class BooksModule {}
