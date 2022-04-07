import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import useApiConfig from "../useApiConfig";
import { getCategoryTypeName } from "../../util/getEnumName";

const baseUrl = process.env.REACT_APP_BASE_API_URL;

const useEditCategory = () => {
  const { getApiConfig } = useApiConfig();

  const queryClient = useQueryClient();
  return useMutation(
    async (value) => {
      const url = `${baseUrl}categories/${value.uniqueId}`;
      const config = await getApiConfig();
      return await axios.patch(url, value, config);
    },
    {
      onSuccess: (data) => {
        const categoryTypeName = getCategoryTypeName(data.categoryType);
        queryClient.refetchQueries("categories", categoryTypeName);
        queryClient.refetchQueries(categoryTypeName);
      },
    }
  );
};

export default useEditCategory;
