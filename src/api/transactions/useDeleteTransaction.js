import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import useApiConfig from "../useApiConfig";

const baseUrl = process.env.REACT_APP_BASE_API_URL;

const useDeleteTransaction = (transactionTypeName) => {
  const { getApiConfig } = useApiConfig();

  const queryClient = useQueryClient();
  return useMutation(
    async (value) => {
      const url = `${baseUrl}transactions/${value.uniqueId}`;
      const config = await getApiConfig();
      return await axios.delete(url, config);
    },
    {
      onSuccess: (_, variables) => {
        queryClient.refetchQueries("transactions", transactionTypeName);
        queryClient.refetchQueries("transactions-summary", transactionTypeName);
      },
    }
  );
};

export default useDeleteTransaction;
