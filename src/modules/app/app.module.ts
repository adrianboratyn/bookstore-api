import { CacheModule, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import * as Entities from 'lib/entities'
import { AuthorsModule } from 'modules/authors'
import { BooksModule } from 'modules/books'
import { GenresModule } from 'modules/genres'
import { LoansModule } from 'modules/loans'
import { ReadersModule } from 'modules/readers'

@Module({
    imports: [
        AuthorsModule,
        BooksModule,
        GenresModule,
        LoansModule,
        ReadersModule,
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'root123@',
            database: 'test2',
            synchronize: true,
            entities: Object.values(Entities),
        }),
        CacheModule.register({
            ttl: 60,
            max: 100,
            isGlobal: true,
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
