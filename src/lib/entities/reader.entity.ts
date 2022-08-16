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
import { LoanEntity } from './loan.entity'

@Entity({ name: 'reader' })
export class ReaderEntity {
    @PrimaryGeneratedColumn()
    readerId: number

    @Generated('uuid')
    @Index({ unique: true })
    @Column()
    readerUUID: string

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    phoneNumber: number

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

    @OneToMany(() => LoanEntity, loan => loan.reader)
    loans: Array<LoanEntity>
}
