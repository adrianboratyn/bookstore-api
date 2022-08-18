import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthorEntity } from 'lib/entities'
import { AuthorsController } from './authors.controller'
import { AuthorsService } from './authors.service'

@Module({
    imports: [
        TypeOrmModule.forFeature([
            AuthorEntity
        ])
    ],
    controllers: [AuthorsController],
    providers: [AuthorsService],
})
export class AuthorsModule {}
