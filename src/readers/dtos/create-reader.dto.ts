import { IsNumber, IsString, Length } from 'class-validator';

export class CreateReaderDto {
  @IsString()
  @Length(3, 20)
  firstName: string;

  @IsString()
  @Length(3, 20)
  lastName: string;

  @IsNumber()
  telephone: number;
}
