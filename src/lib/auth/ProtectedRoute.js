import { withAuthenticationRequired } from "@auth0/auth0-react";

export const ProtectedRoute = ({ component, activeDateRange }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => <div>Loading...</div>,
  });

  return <Component activeDateRange={activeDateRange} />;
};

export default ProtectedRoute;
