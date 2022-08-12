import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Reader } from 'lib/entities'
import { ReadersController } from './readers.controller'
import { ReadersService } from './readers.service'

@Module({
    imports: [TypeOrmModule.forFeature([Reader])],
    controllers: [ReadersController],
    providers: [ReadersService],
})
export class ReadersModule {}
