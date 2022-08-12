import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { CreateGenreDto } from './dtos/create-genre.dto'
import { GenresService } from './genres.service'

@Controller('genre')
export class GenresController {
    constructor(private genresService: GenresService) {}

    @Get()
    getGenres() {
        return this.genresService.getAll()
    }

    @Get('/:id')
    getGenre(@Param('id') id: string) {
        return this.genresService.getById(+id)
    }

    @Post()
    addGenre(@Body() body: CreateGenreDto) {
        return this.genresService.add(body)
    }
}
