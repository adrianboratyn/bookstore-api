import { Length, Min } from 'class-validator'
import { Author } from '../authors/author.entity'
import { Genre } from '../genres/genre.entity'
import { Loan } from '../loans/loan.entity'
import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Genre, genre => genre.books, {
        eager: true,
        onDelete: 'SET NULL',
    })
    genre: Genre

    @ManyToOne(() => Author, author => author.books, {
        eager: true,
        onDelete: 'SET NULL',
    })
    author: Author

    @OneToMany(() => Loan, loan => loan.book)
    loans: Array<Loan>

    @Column()
    @Length(5, 50)
    title: string

    @Column()
    @Min(0)
    pages: number

    @Column()
    year: number

    @Column()
    @Min(0)
    quantity: number

    @Column()
    ISBN: string

    @Column()
    @Min(0)
    cost: number
}
