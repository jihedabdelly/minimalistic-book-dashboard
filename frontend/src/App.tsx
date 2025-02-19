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

  const authLink = setContext(async (_, { headers }) => {
    // Get the authentication token from Auth0
    const token = await getAccessTokenSilently();
    
    // Return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
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
