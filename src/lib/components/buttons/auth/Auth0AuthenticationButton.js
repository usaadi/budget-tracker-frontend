import { useAuth0 } from "@auth0/auth0-react";

const Auth0AuthenticationButton = ({ config }) => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return isAuthenticated ? config.logoutButton : config.loginButton;
};

export default Auth0AuthenticationButton;
