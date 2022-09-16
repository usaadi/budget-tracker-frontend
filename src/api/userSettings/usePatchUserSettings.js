import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import useApiConfig from "../useApiConfig";

const baseUrl = process.env.REACT_APP_BASE_API_URL;

const usePatchUserSettings = () => {
  const { getApiConfig } = useApiConfig();
  const queryClient = useQueryClient();
  return useMutation(
    async (value) => {
      const url = `${baseUrl}userSettings`;
      const config = await getApiConfig();
      return await axios.patch(url, value, config);
    },
    {
      onSuccess: (data) => {
        queryClient.refetchQueries("user-settings");
      },
    }
  );
};

export default usePatchUserSettings;
