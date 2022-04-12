import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorsModule } from './authors/authors.module';
import { BooksModule } from './books/books.module';
import { GenresModule } from './genres/genres.module';
import { LoansModule } from './loans/loans.module';
import { ReadersModule } from './readers/readers.module';

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
      entities: ['**/*.entity.js'],
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
