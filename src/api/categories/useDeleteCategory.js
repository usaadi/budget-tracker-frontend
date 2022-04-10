import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import useApiConfig from "../useApiConfig";
import { getTransactionTypeName } from "../../util/getEnumName";

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
        const transactionTypeName = getTransactionTypeName(
          variables.transactionType
        );
        queryClient.refetchQueries("categories", transactionTypeName);
        queryClient.refetchQueries("transactions", transactionTypeName);
        queryClient.refetchQueries("transactions-summary", transactionTypeName);
      },
    }
  );
};

export default useDeleteCategory;
