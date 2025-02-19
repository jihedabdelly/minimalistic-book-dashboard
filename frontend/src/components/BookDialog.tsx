import React, { useState } from 'react';
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
import { CREATE_BOOK } from '../graphql/mutations';



interface BookDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookDialog: React.FC<BookDialogProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [createBook, { loading }] = useMutation(CREATE_BOOK, {
    onCompleted: () => {
      onClose();
      setName('');
      setDescription('');
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) return;

    await createBook({
      variables: {
        name,
        description,
      },
    });
  };

  return (
    <DialogRoot open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent margin="auto" padding={6} width="500px">
        <DialogHeader>
          <Center>
            <DialogTitle>Add New Book</DialogTitle>
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
                required
              />
            </div>
            <Center>
              <Flex gap={4}>
                <Button type="submit" disabled={loading}>
                  Save
                </Button>
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