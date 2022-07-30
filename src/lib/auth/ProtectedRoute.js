import { withAuthenticationRequired } from "@auth0/auth0-react";

export const ProtectedRoute = ({
  component,
  activeDateRange,
  transactionType,
  setSelectedTxType,
}) => {
  const isDemoAccount = () => {
    const isDemo = localStorage.getItem("isDemoAccount");
    return isDemo === "true";
  };

  const Component = isDemoAccount()
    ? component
    : withAuthenticationRequired(component, {
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
