import {
    Column,
    CreateDateColumn,
    Entity,
    Generated,
    Index,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm'
import { BookEntity } from './book.entity'

@Entity({ name: 'genre' })
export class GenreEntity {
    @PrimaryGeneratedColumn()
    genreId: number

    @Generated('uuid')
    @Index({ unique: true })
    @Column()
    genreUUID: string

    @Column()
    name: string

    @Column()
    description: string

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

    @OneToMany(() => BookEntity, book => book.genre)
    books: Array<BookEntity>
}
