import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Auth0Login} from './components/Auth0Login';
import { BooksList } from './components/BooksList';


// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql',
  cache: new InMemoryCache(),
});

const App = () => {
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
