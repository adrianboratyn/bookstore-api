import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GenreEntity } from 'lib/entities'
import { GenresController } from './genres.controller'
import { GenresService } from './genres.service'

@Module({
    imports: [TypeOrmModule.forFeature([GenreEntity])],
    controllers: [GenresController],
    providers: [GenresService],
})
export class GenresModule {}
