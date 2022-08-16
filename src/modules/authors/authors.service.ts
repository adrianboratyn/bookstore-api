import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { AuthorEntity } from 'lib/entities'
import { CreateAuthorDto } from './dtos/create-author.dto'

@Injectable()
export class AuthorsService {
    constructor(@InjectRepository(AuthorEntity) private repo: Repository<AuthorEntity>) {}

    getAll() {
        return this.repo.find()
    }

    getById(id: number) {
        return this.repo.findOne({ where: { authorId: id } })
    }

    add(body: CreateAuthorDto) {
        const newAuthor = this.repo.create({ ...body })

        return this.repo.save(newAuthor)
    }
}
