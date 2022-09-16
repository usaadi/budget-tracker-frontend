import { useAuth0 } from "@auth0/auth0-react";

const demoToken = process.env.REACT_APP_DEMO_TOKEN;

const useApiConfig = () => {
  const { getAccessTokenSilently } = useAuth0();

  const isDemoAccount = () => {
    const isDemo = localStorage.getItem("isDemoAccount");
    return isDemo === "true";
  };

  const getApiConfig = async () => {
    const access_token = isDemoAccount()
      ? demoToken
      : await getAccessTokenSilently();
    let config = null;
    if (access_token) {
      config = {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      };
    }
    return config;
  };

  return { getApiConfig };
};

export default useApiConfig;
