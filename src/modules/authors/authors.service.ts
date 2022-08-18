import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { v4 } from 'uuid'
import { AuthorEntity } from 'lib/entities'
import { ErrorResponse } from 'lib/common'
import { en_US } from 'lib/locale'
import { CreateAuthorDto, GetAuthorDto } from './dto'
import { GetAuthorDao } from './dao'

@Injectable()
export class AuthorsService {
    constructor(
        @InjectRepository(AuthorEntity) private authorRepository: Repository<AuthorEntity>
    ) {}

    getAll() {
        return this.authorRepository
            .createQueryBuilder('A')
            .select(`
                A.authorUUID,
                A.firstName,
                A.lastName,
                A.description
            `)
            .where('A.isDeleted = 0')
            .getRawMany<GetAuthorDao>()
    }

    async getDetails(dto: GetAuthorDto) {
        const author = await this.authorRepository
            .createQueryBuilder('A')
            .select(`
                A.authorUUID,
                A.firstName,
                A.lastName,
                A.description
            `)
            .where('A.authorUUID = :authorUUID', { authorUUID: dto.authorUUID })
            .andWhere('A.isDeleted = 0')
            .getRawOne<GetAuthorDao>()

        if (!author) {
            const error: ErrorResponse = {
                code: HttpStatus.BAD_REQUEST,
                message: en_US.author.authorNotFound
            }

            throw new BadRequestException(error)
        }

        return author
    }

    async add(dto: CreateAuthorDto) {
        const authorUUID = v4()
        await this.authorRepository.insert({
            authorUUID,
            ...dto
        })

        return this.getDetails({ authorUUID })
    }
}
