import {
    Column,
    CreateDateColumn,
    Entity,
    Generated,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm'
import { ReaderEntity } from './reader.entity'
import { BookEntity } from './book.entity'

@Entity({ name: 'loan' })
export class LoanEntity {
    @PrimaryGeneratedColumn()
    loanId: number

    @Generated('uuid')
    @Index({ unique: true })
    @Column()
    loanUUID: string

    @Column()
    bookId: number

    @Column()
    readerId: number

    @Column()
    sinceDate: number

    @Column({ nullable: true, type: 'int' })
    untilDate: number

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

    @ManyToOne(() => BookEntity, book => book.loans)
    @JoinColumn({ name: 'bookId' })
    book: BookEntity

    @ManyToOne(() => ReaderEntity, reader => reader.loans)
    @JoinColumn({ name: 'readerId' })
    reader: ReaderEntity
}
