import React, { useState, useEffect } from 'react';
import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Button,
  Input,
  Textarea,
  Flex,
  Center,
} from '@chakra-ui/react';
import { useMutation } from '@apollo/client';
import { CREATE_BOOK, UPDATE_BOOK } from '../graphql/mutations';



interface BookDialogProps {
  isOpen: boolean;
  onClose: () => void;
  context: "add" | "edit";
  book?: {
    id: number;
    name: string;
    description: string;
  };
}

export const BookDialog: React.FC<BookDialogProps> = ({ isOpen, onClose, context = "add", book}) => {
  /* const [name, setName] = useState(context === "edit" ? book?.name || '' : '');
  const [description, setDescription] = useState(context === "edit" ? book?.description || '' : ''); */
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [createBook, { loading: loadingAdd }] = useMutation(CREATE_BOOK, {
    onCompleted: () => {
      onClose();
      setName('');
      setDescription('');
    },
  });

  const [updateBook, { loading: loadingEdit }] = useMutation(UPDATE_BOOK, {
    onCompleted: () => {
      onClose();
      setName('');
      setDescription('');
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (context === "add") {
      if (!name.trim() || !description.trim()) return;

      await createBook({
        variables: {
          name: name.trim(),
          description: description.trim(),
        },
      });

    } else if (context === "edit") {
      await updateBook({
        variables: {
          id: book?.id,
          name: name.trim(),
          description: description.trim(),
        },
      });
    }
    
  };


  useEffect(() => {
    if (context === "edit" && book) {
      setName(book.name);
      setDescription(book.description);
    } else {
      setName('');
      setDescription('');
    }
  }, [context, isOpen]);



  return (
    <DialogRoot open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent padding={6} >
        <DialogHeader>
          <Center>
            <DialogTitle>{context === "add" ? "Add New Book" : "Update the Book"}</DialogTitle>
          </Center>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap={4}>
            <div>
              <label>Book Name</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter book name"
                required
              />
            </div>
            <div>
              <label>Description</label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter book description"
                autoresize
                required
              />
            </div>
            <Center>
              <Flex gap={4}>
                {context === "edit" && (
                  <Button type="submit" disabled={loadingEdit}>
                    Update
                  </Button>
                )}
                {context === "add" && (
                  <Button type="submit" disabled={loadingAdd}>
                    Add
                  </Button>
                )}
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
              </Flex>
            </Center>
          </Flex>
        </form>
      </DialogContent>
    </DialogRoot>
  );
};