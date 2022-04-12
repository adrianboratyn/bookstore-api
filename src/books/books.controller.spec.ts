import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

describe('BooksController', () => {
  let booksController: BooksController;

  const mockBookService = {
    add: jest.fn((dto) => {
      return {
        id: 1,
        ...dto,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [BooksService],
    })
      .overrideProvider(BooksService)
      .useValue(mockBookService)
      .compile();

    booksController = module.get<BooksController>(BooksController);
  });

  it('should be defined', () => {
    expect(booksController).toBeDefined();
  });

  it('should create a book', async () => {
    const dto = {
      genreId: 1,
      authorId: 1,
      title: 'James Joyce',
      pages: 912,
      year: 1922,
      quantity: 3,
      ISBN: '978885413934',
      cost: 12,
    };
    expect(await booksController.addBook(dto)).toEqual({
      id: expect.any(Number),
      ...dto,
    });

    expect(mockBookService.add).toHaveBeenCalledWith(dto);
  });
});
