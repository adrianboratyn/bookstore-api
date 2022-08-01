import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Genre } from '../genres/genre.entity'
import { Author } from '../authors/author.entity'
import { Book } from './book.entity'
import { BooksService } from './books.service'
import { CACHE_MANAGER } from '@nestjs/common'

describe('BooksService', () => {
    let booksService: BooksService

    const mockBookRepository = {
        create: jest.fn(dto => dto),
        save: jest
            .fn()
            .mockImplementation(dto => Promise.resolve({ id: 1, ...dto })),
    }
    const mockAuthorRepository = {
        findOne: jest.fn(id => ({ id, firstName: 'a', lastName: 'a' })),
    }
    const mockGenreRepository = {
        findOne: jest.fn(id => ({ id, name: 'a', description: 'a' })),
    }
    const mockCache = {}

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                BooksService,
                {
                    provide: getRepositoryToken(Book),
                    useValue: mockBookRepository,
                },
                {
                    provide: getRepositoryToken(Author),
                    useValue: mockAuthorRepository,
                },
                {
                    provide: getRepositoryToken(Genre),
                    useValue: mockGenreRepository,
                },
                {
                    provide: CACHE_MANAGER,
                    useValue: mockCache,
                },
            ],
        }).compile()

        booksService = module.get<BooksService>(BooksService)
    })

    it('should be defined', () => {
        expect(booksService).toBeDefined()
    })

    it('should create and return new book record', async () => {
        const dto = {
            genreId: 1,
            authorId: 1,
            title: 'James Joyce',
            pages: 912,
            year: 1922,
            quantity: 3,
            ISBN: '978885413934',
            cost: 12,
        }
        expect(await booksService.add(dto)).toEqual({
            id: expect.any(Number),
            ...dto,
            genre: {
                id: {
                    where: {
                        id: dto.genreId,
                    },
                },
                name: 'a',
                description: 'a',
            },
            author: {
                id: {
                    where: {
                        id: dto.authorId,
                    },
                },
                firstName: 'a',
                lastName: 'a',
            },
        })
        expect(mockBookRepository.create).toHaveBeenCalled()
        expect(mockBookRepository.save).toHaveBeenCalled()
        expect(mockGenreRepository.findOne).toHaveBeenCalled()
        expect(mockAuthorRepository.findOne).toHaveBeenCalled()
    })
})
