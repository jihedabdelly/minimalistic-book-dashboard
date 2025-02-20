import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Button, IconButton, Table, Flex, Heading } from '@chakra-ui/react';
import { FaTrash, FaEdit } from "react-icons/fa";
import { PiEmpty } from "react-icons/pi";
import { useAuth0 } from "@auth0/auth0-react";
import { Book } from '../types/book';
import { GET_BOOKS } from '../graphql/queries';
import { DELETE_BOOK } from '../graphql/mutations';
import { BookDialog } from './BookDialog';
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "./ui/menu"


export const BooksList = () => {
  const { loading, error, data, refetch } = useQuery<{ getBooks: Book[] }>(GET_BOOKS);
  const { isAuthenticated } = useAuth0();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [deleteBook] = useMutation(DELETE_BOOK, {
    onCompleted: () => {
      refetch()
    },
  });
  const handleDelete = async (id: number) => {
    await deleteBook({
      variables: {
        id
      },
    });
  };


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Flex direction="column" p={4}>
      <BookDialog 
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          refetch(); // Refresh the books list after adding
        }}
      />
      <Flex justify="space-between" align="center" mb={4}>
        <Heading size="lg">Books List</Heading>
        {isAuthenticated && <Button colorScheme="blue" onClick={() => setIsDialogOpen(true)} >Add Book</Button>}
      </Flex>
      <Table.Root interactive>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader>Description</Table.ColumnHeader>
            <Table.ColumnHeader>Actions</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data?.getBooks.map((book) => (
            <Table.Row key={book.id} >
              <Table.Cell>{book.name}</Table.Cell>
              <Table.Cell>{book.description}</Table.Cell>
              <Table.Cell>
                {isAuthenticated ?
                  <Flex>
                    <IconButton aria-label="Edit book" mr={2} >
                      <FaEdit />
                    </IconButton>

                    <MenuRoot>
                      <MenuTrigger asChild>
                        <IconButton aria-label="Delete book" colorScheme="red" >
                          <FaTrash />
                        </IconButton>
                      </MenuTrigger>
                      <MenuContent onClick={() => handleDelete(book.id)}>
                        <MenuItem
                          value="delete"
                          color="fg.error"
                          _hover={{ bg: "bg.error", color: "fg.error", cursor: "pointer" }}
                        >
                          Delete this book
                        </MenuItem>
                      </MenuContent>
                    </MenuRoot>
                  
                  </Flex> : 
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