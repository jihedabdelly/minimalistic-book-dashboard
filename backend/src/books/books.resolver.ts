import { Query, Resolver } from '@nestjs/graphql';
import { Book } from './book.model';

@Resolver(() => Book)
export class BooksResolver {
  // Mock data - before adding a database
  private books: Book[] = [
    { id: 1, name: 'The Great Gatsby', description: 'A story of decadence and excess.' },
    { id: 2, name: '1984', description: 'A dystopian social science fiction.' },
  ];

  @Query(() => [Book])
  async getBooks(): Promise<Book[]> {
    return this.books;
  }

  @Query(() => Book, { nullable: true })
  async getBook(id: number): Promise<Book | undefined> {
    return this.books.find(book => book.id === id);
  }
}