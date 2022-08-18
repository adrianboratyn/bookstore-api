import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { AuthorsService } from './authors.service'
import { CreateAuthorDto, GetAuthorDto } from './dto'
import { AUTHOR } from './constants'

@Controller(AUTHOR)
export class AuthorsController {
    constructor(
        private readonly authorsService: AuthorsService
    ) {}

    @Get()
    getAuthors() {
        return this.authorsService.getAll()
    }

    @Get('details')
    getAuthor(@Query() dto: GetAuthorDto) {
        return this.authorsService.getDetails(dto)
    }

    @Post()
    addAuthor(@Body() dto: CreateAuthorDto) {
        return this.authorsService.add(dto)
    }
}
