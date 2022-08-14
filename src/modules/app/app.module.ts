import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { getConfig, envValidation } from 'lib/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
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
        TypeOrmModule.forRootAsync({
            useFactory: () => getConfig().typeORMConfig
        }),
        ConfigModule.forRoot({
            isGlobal: true,
            validate: envValidation,
            validationOptions: {
                allowUknown: true,
                abortEarly: true
            }
        })
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
