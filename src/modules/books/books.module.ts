import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthorEntity, GenreEntity, BookEntity } from 'lib/entities'
import { BooksService } from './books.service'
import { BooksController } from './books.controller'

@Module({
    imports: [TypeOrmModule.forFeature([BookEntity, GenreEntity, AuthorEntity])],
    controllers: [BooksController],
    providers: [BooksService],
})
export class BooksModule {}
