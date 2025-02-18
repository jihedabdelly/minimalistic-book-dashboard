import { useQuery } from '@apollo/client';
import { Book } from '../types/book';
import { GET_BOOKS } from '../graphql/queries';


export const BooksList = () => {
  const { loading, error, data } = useQuery<{ getBooks: Book[] }>(GET_BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Books List</h2>
      <div className="space-y-4">
        {data?.getBooks.map((book) => (
          <div key={book.id} className="border p-4 rounded-lg">
            <h3 className="text-xl font-semibold">{book.name}</h3>
            <p className="text-gray-600">{book.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}