import { useQuery } from "react-query";
import axios from "axios";
import useApiConfig from "../useApiConfig";

import { defaultQueryStaleTimeMs } from "../../constants/queryParameters";

const baseUrl = process.env.REACT_APP_BASE_API_URL;

const useTransactions = (transactionTypeName, fromDate, toDate) => {
  const { getApiConfig } = useApiConfig();

  return useQuery(
    ["transactions", transactionTypeName, fromDate, toDate],
    async () => {
      const url = `${baseUrl}transactions/${transactionTypeName}`;
      const config = await getApiConfig();
      const data = {
        fromDate,
        toDate,
      };
      return await axios.post(url, data, config);
    },
    {
      keepPreviousData: true,
      staleTime: defaultQueryStaleTimeMs,
    }
  );
};

export default useTransactions;
