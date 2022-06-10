import { withAuthenticationRequired } from "@auth0/auth0-react";

export const ProtectedRoute = ({
  component,
  activeDateRange,
  selectedTxType,
  setSelectedTxType,
}) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => <div>Loading...</div>,
  });

  return (
    <Component
      activeDateRange={activeDateRange}
      selectedTxType={selectedTxType}
      setSelectedTxType={setSelectedTxType}
    />
  );
};

export default ProtectedRoute;
