import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import useApiConfig from "../useApiConfig";

const baseUrl = process.env.REACT_APP_BASE_API_URL;

const useCreateCategory = (type) => {
  const url = `${baseUrl}categories`;

  const { getApiConfig } = useApiConfig();

  const queryClient = useQueryClient();
  return useMutation(
    async (value) => {
      const config = await getApiConfig();
      return await axios.post(url, value, config);
    },
    {
      onSuccess: () => {
        queryClient.refetchQueries("categories", type);
      },
    }
  );
};

export default useCreateCategory;
