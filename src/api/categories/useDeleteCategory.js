import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import useApiConfig from "../useApiConfig";
import { getCategoryTypeName } from "../../util/getEnumName";

const baseUrl = process.env.REACT_APP_BASE_API_URL;

const useDeleteCategory = () => {
  const { getApiConfig } = useApiConfig();

  const queryClient = useQueryClient();
  return useMutation(
    async (value) => {
      const url = `${baseUrl}categories/${value.uniqueId}`;
      const config = await getApiConfig();
      return await axios.delete(url, config);
    },
    {
      onSuccess: (_, variables) => {
        const categoryTypeName = getCategoryTypeName(variables.categoryType);
        queryClient.refetchQueries("categories", categoryTypeName);
        queryClient.refetchQueries(categoryTypeName);
      },
    }
  );
};

export default useDeleteCategory;
