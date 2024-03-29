import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import useApiConfig from "../useApiConfig";
import { getTransactionTypeName } from "../../util/getEnumName";

const baseUrl = process.env.REACT_APP_BASE_API_URL;

const useCreateTransaction = () => {
  const { getApiConfig } = useApiConfig();

  const queryClient = useQueryClient();
  return useMutation(
    async (value) => {
      const url = `${baseUrl}transactions`;
      const config = await getApiConfig();
      return await axios.post(url, value, config);
    },
    {
      onSuccess: (data) => {
        const transactionTypeName = getTransactionTypeName(
          data.transactionType
        );
        queryClient.refetchQueries("transactions", transactionTypeName);
        queryClient.refetchQueries(
          "infinite-transactions",
          transactionTypeName
        );
        queryClient.refetchQueries("transactions-summary", transactionTypeName);
        queryClient.refetchQueries(
          "infinite-transactions-summary",
          transactionTypeName
        );
        queryClient.refetchQueries("summary", transactionTypeName);
        queryClient.refetchQueries("categories", transactionTypeName);
        queryClient.refetchQueries("infinite-categories", transactionTypeName);
      },
    }
  );
};

export default useCreateTransaction;
