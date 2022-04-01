import { useAuth0 } from "@auth0/auth0-react";

const Auth0AuthenticationButton = ({ config }) => {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated ? config.logoutButton : config.loginButton;
};

export default Auth0AuthenticationButton;
