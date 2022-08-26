import { withAuthenticationRequired } from "@auth0/auth0-react";
//import useIsDemoAccount from "../../components/shared/hooks/useIsDemoAccount";

export const ProtectedRoute = ({
  component,
  activeDateRange,
  transactionType,
  setSelectedTxType,
}) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => <div>Loading...</div>,
  });

  return (
    <Component
      activeDateRange={activeDateRange}
      transactionType={transactionType}
      setSelectedTxType={setSelectedTxType}
    />
  );
};

export default ProtectedRoute;
