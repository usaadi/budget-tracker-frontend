// import { useAuth0 } from "@auth0/auth0-react";

const useIsDemoAccount = () => {
  // const { isAuthenticated } = useAuth0();
  // const isDemo = localStorage.getItem("isDemoAccount");
  //return isDemo === "true" && !isAuthenticated;
  return false;
};

export default useIsDemoAccount;
