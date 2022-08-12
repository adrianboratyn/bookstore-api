import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Author } from './author.entity'
import { CreateAuthorDto } from './dtos/create-author.dto'

@Injectable()
export class AuthorsService {
    constructor(@InjectRepository(Author) private repo: Repository<Author>) {}

    getAll() {
        return this.repo.find()
    }

    getById(id: number) {
        return this.repo.findOne({ where: { id } })
    }

    add(body: CreateAuthorDto) {
        const newAuthor = this.repo.create({ ...body })

        return this.repo.save(newAuthor)
    }
}
