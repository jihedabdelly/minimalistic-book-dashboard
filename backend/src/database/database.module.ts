import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from '../books/book.model';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'data/books.db',
      entities: [Book],
      synchronize: true, // Set to false in production
    }),
  ],
})
export class DatabaseModule {}
