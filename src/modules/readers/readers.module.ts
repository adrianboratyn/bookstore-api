import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ReaderEntity } from 'lib/entities'
import { ReadersController } from './readers.controller'
import { ReadersService } from './readers.service'

@Module({
    imports: [TypeOrmModule.forFeature([ReaderEntity])],
    controllers: [ReadersController],
    providers: [ReadersService],
})
export class ReadersModule {}
