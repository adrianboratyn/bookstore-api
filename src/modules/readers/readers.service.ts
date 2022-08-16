import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ReaderEntity } from 'lib/entities'
import { CreateReaderDto } from './dtos/create-reader.dto'

@Injectable()
export class ReadersService {
    constructor(@InjectRepository(ReaderEntity) private repo: Repository<ReaderEntity>) {}

    getAll() {
        this.repo.find().then(data => console.log(data))

        return this.repo.find()
    }

    getById(id: number) {
        return this.repo.findOne({ where: { readerId: id } })
    }

    add(body: CreateReaderDto) {
        const newReader = this.repo.create({ ...body })

        return this.repo.save(newReader)
    }
}
