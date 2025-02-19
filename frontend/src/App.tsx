import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useAuth0 } from '@auth0/auth0-react';
import { Auth0Login} from './components/Auth0Login';
import { BooksList } from './components/BooksList';


const App = () => {
  const { getAccessTokenSilently } = useAuth0();

  const httpLink = createHttpLink({
    uri: 'http://localhost:8080/graphql',
  });

  const authLink = setContext(async (operation, { headers }) => {
    // Only add the auth token for mutations
    if (operation.query.definitions.some(
      def => def.kind === 'OperationDefinition' && def.operation === 'mutation'
    )) {
      try {
        const token = await getAccessTokenSilently();
        return {
          headers: {
            ...headers,
            authorization: `Bearer ${token}`,
          },
        };
      } catch (e) {
        // If getting token fails, proceed without token
        return { headers };
      }
    }
    // For queries, don't add auth header
    return { headers };
  });

  // Initialize Apollo Client
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });


  return (
    <ApolloProvider client={client}>
      <div>
        <Auth0Login />
        <BooksList />
      </div>
    </ApolloProvider>
  )
};

export default App;
