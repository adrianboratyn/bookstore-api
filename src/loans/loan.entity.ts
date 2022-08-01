import { Book } from '../books/book.entity'
import { Reader } from '../readers/reader.entity'
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
export class Loan {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Book, book => book.loans, {
        eager: true,
        cascade: ['update'],
        onDelete: 'SET NULL',
    })
    book: Book

    @ManyToOne(() => Reader, reader => reader.loans, {
        eager: true,
        onDelete: 'SET NULL',
    })
    reader: Reader

    @Column({ default: new Date() })
    @CreateDateColumn()
    since: Date

    @Column({ nullable: true })
    until: Date
}
