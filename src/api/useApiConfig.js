import { useAuth0 } from "@auth0/auth0-react";

const useApiConfig = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getApiConfig = async () => {
    const access_token = await getAccessTokenSilently();
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
