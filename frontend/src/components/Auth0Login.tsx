
import { useAuth0 } from "@auth0/auth0-react";
import { Button, VStack, Text } from "@chakra-ui/react";


export const Auth0Login = () => {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

  

  return (
    <VStack  mt={10}>
      {isAuthenticated ? (
        <>
          <Text>Welcome, {user?.name}</Text>
          <Button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
            Logout
          </Button>
          <Button onClick={() => console.log(user)} >show user</Button>
        </>
      ) : (
        <Button onClick={() => loginWithRedirect()}>Login</Button>
      )}
    </VStack>
  );
}
