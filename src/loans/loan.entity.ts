import { Book } from 'src/books/book.entity';
import { Reader } from 'src/readers/reader.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Loan {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Book, (book) => book.loans, { eager: true })
  book: Book;

  @ManyToOne(() => Reader, (reader) => reader.loans, { eager: true })
  reader: Reader;

  @Column({ default: Date.now() })
  @CreateDateColumn()
  since: Date;

  @Column({ nullable: true })
  @UpdateDateColumn()
  until: Date;
}
