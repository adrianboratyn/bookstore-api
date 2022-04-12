import { IsNotEmpty, Length } from 'class-validator';
import { Loan } from '../loans/loan.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Reader {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Loan, (loan) => loan.reader)
  loans: Loan[];

  @Column()
  @IsNotEmpty()
  @Length(5, 20)
  firstName: string;

  @Column()
  @IsNotEmpty()
  @Length(5, 20)
  lastName: string;

  @Column()
  @IsNotEmpty()
  @Length(9, 9)
  telephone: number;
}
