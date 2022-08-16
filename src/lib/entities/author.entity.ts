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
import { BookEntity } from 'lib/entities'

@Entity({ name: 'author' })
export class AuthorEntity {
    @PrimaryGeneratedColumn()
    authorId: number

    @Generated('uuid')
    @Index({ unique: true })
    @Column()
    authorUUID: string

    @Column()
    firstName: string

    @Column()
    lastName: string

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

    @OneToMany(() => BookEntity, book => book.author)
    books: Array<BookEntity>
}
