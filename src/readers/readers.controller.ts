import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateReaderDto } from './dtos/create-reader.dto';
import { ReadersService } from './readers.service';

@Controller('reader')
export class ReadersController {
  constructor(private readersService: ReadersService) {}

  @Get()
  getReaders() {
    return this.readersService.getAll();
  }

  @Get('/:id')
  getReader(@Param('id') id: string) {
    return this.readersService.getById(+id);
  }

  @Post()
  addReader(@Body() body: CreateReaderDto) {
    return this.readersService.add(body);
  }
}
