import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import useApiConfig from "../useApiConfig";
import { getTransactionTypeName } from "../../util/getEnumName";

const baseUrl = process.env.REACT_APP_BASE_API_URL;

const useEditCategory = () => {
  const { getApiConfig } = useApiConfig();

  const queryClient = useQueryClient();
  return useMutation(
    async (value) => {
      const url = `${baseUrl}categories`;
      const config = await getApiConfig();
      return await axios.patch(url, value, config);
    },
    {
      onSuccess: (data) => {
        const transactionTypeName = getTransactionTypeName(
          data.transactionType
        );
        queryClient.refetchQueries("categories", transactionTypeName);
        queryClient.refetchQueries("transactions", transactionTypeName);
        queryClient.refetchQueries("transactions-summary", transactionTypeName);
      },
    }
  );
};

export default useEditCategory;
