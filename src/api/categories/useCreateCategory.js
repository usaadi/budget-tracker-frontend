import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import useApiConfig from "../useApiConfig";
import { getTransactionTypeName } from "../../util/getEnumName";

const baseUrl = process.env.REACT_APP_BASE_API_URL;

const useCreateCategory = () => {
  const { getApiConfig } = useApiConfig();

  const queryClient = useQueryClient();
  return useMutation(
    async (value) => {
      const url = `${baseUrl}categories`;
      const config = await getApiConfig();
      return await axios.post(url, value, config);
    },
    {
      onSuccess: (data) => {
        const transactionTypeName = getTransactionTypeName(
          data.transactionType
        );
        queryClient.refetchQueries("categories", transactionTypeName);
      },
    }
  );
};

export default useCreateCategory;
