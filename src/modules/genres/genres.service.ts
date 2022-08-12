import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Genre } from 'lib/entities'
import { CreateGenreDto } from './dtos/create-genre.dto'

@Injectable()
export class GenresService {
    constructor(@InjectRepository(Genre) private repo: Repository<Genre>) {}

    getAll() {
        this.repo.find().then(data => console.log(data))

        return this.repo.find()
    }

    getById(id: number) {
        return this.repo.findOne({ where: { id } })
    }

    add(body: CreateGenreDto) {
        const newGenre = this.repo.create({ ...body })

        return this.repo.save(newGenre)
    }
}
