import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Genre } from 'lib/entities'
import { GenresController } from './genres.controller'
import { GenresService } from './genres.service'

@Module({
    imports: [TypeOrmModule.forFeature([Genre])],
    controllers: [GenresController],
    providers: [GenresService],
})
export class GenresModule {}
