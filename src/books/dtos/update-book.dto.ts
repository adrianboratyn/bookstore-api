import { IsNumber, IsString, Min } from 'class-validator';

export class UpdateBookDto {
  @IsNumber()
  @Min(0)
  genreId: number;

  @IsNumber()
  @Min(0)
  authorId: number;

  @IsString()
  title: string;

  @IsNumber()
  @Min(0)
  pages: number;

  @IsNumber()
  @Min(0)
  year: number;

  @IsNumber()
  @Min(0)
  quantity: number;

  @IsString()
  ISBN: string;

  @IsNumber()
  @Min(0)
  cost: number;
}
