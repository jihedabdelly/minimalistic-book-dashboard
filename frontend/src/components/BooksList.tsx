import { useQuery } from '@apollo/client';
import { Button, IconButton, Table, Flex, Heading } from '@chakra-ui/react';
import { FaTrash, FaEdit } from "react-icons/fa";
import { PiEmpty } from "react-icons/pi";
import { useAuth0 } from "@auth0/auth0-react";
import { Book } from '../types/book';
import { GET_BOOKS } from '../graphql/queries';


export const BooksList = () => {
  const { loading, error, data } = useQuery<{ getBooks: Book[] }>(GET_BOOKS);
  const { isAuthenticated } = useAuth0();


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Flex direction="column" p={4}>
      <Flex justify="space-between" align="center" mb={4}>
        <Heading size="lg">Books List</Heading>
        {isAuthenticated && <Button colorScheme="blue">Add Book</Button>}
      </Flex>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader>Description</Table.ColumnHeader>
            <Table.ColumnHeader>Actions</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data?.getBooks.map((book) => (
            <Table.Row key={book.id}>
              <Table.Cell>{book.name}</Table.Cell>
              <Table.Cell>{book.description}</Table.Cell>
              <Table.Cell>
                {isAuthenticated ?
                  <>
                    <IconButton aria-label="Edit book" mr={2} >
                      <FaEdit />
                    </IconButton>
                    <IconButton aria-label="Delete book" colorScheme="red" >
                      <FaTrash />
                    </IconButton>
                  </> : 
                  <IconButton aria-label="No action" variant="subtle" disabled >
                    <PiEmpty />
                  </IconButton>
                }
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Flex>
  );
}