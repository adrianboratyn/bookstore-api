import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { GenreEntity } from 'lib/entities'
import { CreateGenreDto } from './dtos/create-genre.dto'

@Injectable()
export class GenresService {
    constructor(@InjectRepository(GenreEntity) private repo: Repository<GenreEntity>) {}

    getAll() {
        this.repo.find().then(data => console.log(data))

        return this.repo.find()
    }

    getById(id: number) {
        return this.repo.findOne({ where: { genreId: id } })
    }

    add(body: CreateGenreDto) {
        const newGenre = this.repo.create({ ...body })

        return this.repo.save(newGenre)
    }
}
