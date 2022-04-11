import { IsString, Length } from 'class-validator';

export class CreateGenreDto {
  @IsString()
  @Length(5, 20)
  name: string;

  @IsString()
  @Length(5, 300)
  description: string;
}
