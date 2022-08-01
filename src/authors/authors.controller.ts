import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { AuthorsService } from './authors.service'
import { CreateAuthorDto } from './dtos/create-author.dto'

@Controller('author')
export class AuthorsController {
    constructor(private authorsService: AuthorsService) {}

    @Get()
    getAuthors() {
        return this.authorsService.getAll()
    }

    @Get('/:id')
    getAuthor(@Param('id') id: string) {
        return this.authorsService.getById(+id)
    }

    @Post()
    addAuthor(@Body() body: CreateAuthorDto) {
        return this.authorsService.add(body)
    }
}
