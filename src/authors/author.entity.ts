import { IsNotEmpty, Length } from 'class-validator';
import { Book } from 'src/books/book.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @Length(5, 20)
  firstName: string;

  @Column()
  @IsNotEmpty()
  @Length(5, 20)
  lastName: string;

  @OneToMany(() => Book, (book) => book.author)
  books: Book[];
}
