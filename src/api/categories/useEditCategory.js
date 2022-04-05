import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import useApiConfig from "../useApiConfig";

const baseUrl = process.env.REACT_APP_BASE_API_URL;

const useEditCategory = (categoryTypeName, categoryId) => {
  const url = `${baseUrl}categories/${categoryId}`;

  const { getApiConfig } = useApiConfig();

  const queryClient = useQueryClient();
  return useMutation(
    async (value) => {
      const config = await getApiConfig();
      return await axios.patch(url, value, config);
    },
    {
      onSuccess: () => {
        queryClient.refetchQueries("categories", categoryTypeName);
        queryClient.refetchQueries(categoryTypeName);
      },
    }
  );
};

export default useEditCategory;
