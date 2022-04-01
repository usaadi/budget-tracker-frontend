import { withAuthenticationRequired } from "@auth0/auth0-react";

export const ProtectedRoute = ({ component }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => <div>Loading...</div>,
  });

  return <Component />;
};

export default ProtectedRoute;
