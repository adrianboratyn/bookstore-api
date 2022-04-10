import { IsNotEmpty, Length } from 'class-validator';
import { Book } from 'src/books/book.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Genre {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Book, (book) => book.genre)
  books: Book[];

  @Column()
  @IsNotEmpty()
  @Length(5, 20)
  name: string;

  @Column()
  @IsNotEmpty()
  @Length(5, 300)
  description: string;
}
