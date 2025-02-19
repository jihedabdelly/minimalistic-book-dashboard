import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Book } from './book.model';
import { BooksService } from './books.service';
import { RequireAuth } from 'src/auth/auth.decorator';

@Resolver(() => Book)
export class BooksResolver {
  constructor(private booksService: BooksService) {}

  // Public queries - no authentication required
  @Query(() => [Book])
  async getBooks(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  @Query(() => Book)
  async getBook(@Args('id') id: number): Promise<Book> {
    return this.booksService.findOne(id);
  }

  // Protected mutations - require authentication
  @Mutation(() => Book)
  @RequireAuth()
  async createBook(
    @Args('name') name: string,
    @Args('description') description: string,
  ): Promise<Book> {
    return this.booksService.create({ name, description });
  }

  @Mutation(() => Book)
  @RequireAuth()
  async updateBook(
    @Args('id') id: number,
    @Args('name', { nullable: true }) name?: string,
    @Args('description', { nullable: true }) description?: string,
  ): Promise<Book> {
    const updateData: Partial<Book> = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    return this.booksService.update(id, updateData);
  }

  @Mutation(() => Boolean)
  @RequireAuth()
  async deleteBook(@Args('id') id: number): Promise<boolean> {
    return this.booksService.delete(id);
  }
}