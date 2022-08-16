import {
    Column,
    CreateDateColumn,
    Entity,
    Generated,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm'
import { AuthorEntity } from './author.entity'
import { GenreEntity } from './genre.entity'
import { LoanEntity } from './loan.entity'

@Entity({ name: 'book' })
export class BookEntity {
    @PrimaryGeneratedColumn()
    bookId: number

    @Generated('uuid')
    @Index({ unique: true })
    @Column()
    bookUUID: string

    @Column()
    title: string

    @Column()
    pages: number

    @Column()
    year: number

    @Column()
    quantity: number

    @Column()
    ISBN: string

    @Column()
    cost: number

    @Index()
    @Column({
        type: Boolean,
        default: false
    })
    isDeleted: boolean

    @CreateDateColumn({ select: false })
    createdAt: Date

    @UpdateDateColumn({ select: false })
    updatedAt: Date

    @ManyToOne(() => GenreEntity, genre => genre.books)
    @JoinColumn({ name: 'genreId' })
    genre: GenreEntity

    @ManyToOne(() => AuthorEntity, author => author.books)
    @JoinColumn({ name: 'authorId' })
    author: AuthorEntity

    @OneToMany(() => LoanEntity, loan => loan.book)
    loans: Array<LoanEntity>

}
