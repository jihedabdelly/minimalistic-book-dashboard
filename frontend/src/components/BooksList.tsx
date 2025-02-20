import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Button, IconButton, Table, Flex, Heading, Text, Center } from '@chakra-ui/react';
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
  const [dialogContext, setDialogContext] = useState<"add" | "edit">("add");
  const [selectedBook, setSelectedBook] = useState<Book | undefined>(undefined);
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
        context={dialogContext}
        book={selectedBook}
      />
      <Flex justify="space-between" align="center" mb={4}>
        <Heading size="2xl">Books List</Heading>
        {isAuthenticated && 
          <Button colorScheme="blue" onClick={() => {setDialogContext("add"), setIsDialogOpen(true)}} >
            Add Book
          </Button>
        }
      </Flex>
      <Table.Root interactive >
        <Table.Header >
          <Table.Row justifyContent="space-between" >
            <Table.ColumnHeader>
              <Text fontWeight="bold" >
                Name
              </Text>

            </Table.ColumnHeader>
            <Table.ColumnHeader>
              <Text fontWeight="bold" >
                Description
              </Text>
            </Table.ColumnHeader>
            <Table.ColumnHeader textAlign={"end"} >
              <Center>
                <Text fontWeight="bold" >
                  Actions
                </Text>

              </Center>
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data?.getBooks.map((book) => (
            <Table.Row key={book.id} >
              <Table.Cell >
                {book.name}
              </Table.Cell>
              <Table.Cell>
                <Text>
                  {book.description}
                </Text>
              </Table.Cell>
              <Table.Cell textAlign={"end"}>
                {isAuthenticated ?
                  < Center >
                    <IconButton aria-label="Edit book" mr={2} onClick={() => { setDialogContext("edit"), setSelectedBook(book), setIsDialogOpen(true) }} >
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

                  </Center > : 
                  <Center>
                   <IconButton aria-label="No action" variant="subtle" disabled >
                    <PiEmpty />
                  </IconButton> 
                  </Center>
                  
                }
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Flex>
  );
}