import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReaderDto } from './dtos/create-reader.dto';
import { Reader } from './reader.entity';

@Injectable()
export class ReadersService {
  constructor(@InjectRepository(Reader) private repo: Repository<Reader>) {}

  getAll() {
    this.repo.find().then((data) => console.log(data));
    return this.repo.find();
  }

  getById(id: number) {
    return this.repo.findOne({ where: { id: id } });
  }

  add(body: CreateReaderDto) {
    const newReader = this.repo.create({ ...body });

    return this.repo.save(newReader);
  }
}
