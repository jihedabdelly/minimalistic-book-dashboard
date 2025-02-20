import { gql } from '@apollo/client';


// Mutation for creating a book
export const CREATE_BOOK = gql`
  mutation CreateBook($name: String!, $description: String!) {
    createBook(name: $name, description: $description) {
      id
      name
      description
    }
  }
`;

// Mutation for updating a book
export const UPDATE_BOOK = gql`
  mutation UpdateBook($id: ID!, $name: String, $description: String) {
    updateBook(id: $id, name: $name, description: $description) {
      id
      name
      description
    }
  }
`;

// Mutation for deleting a book
export const DELETE_BOOK = gql`
  mutation DeleteBook($id: ID!) {
    deleteBook(id: $id)
  }
`;