import { gql } from '@apollo/client';

export const CREATE_BOOK = gql`
  mutation CreateBook($name: String!, $description: String!) {
    createBook(name: $name, description: $description) {
      id
      name
      description
    }
  }
`;