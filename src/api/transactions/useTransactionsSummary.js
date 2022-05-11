import { useQuery } from "react-query";
import axios from "axios";
import useApiConfig from "../useApiConfig";

import { defaultQueryStaleTimeMs } from "../../constants/queryParameters";

const baseUrl = process.env.REACT_APP_BASE_API_URL;

const useTransactionsSummary = (transactionTypeName, fromDate, toDate) => {
  const { getApiConfig } = useApiConfig();

  return useQuery(
    ["transactions-summary", transactionTypeName, fromDate, toDate],
    async () => {
      const url = `${baseUrl}transactionssummary/${transactionTypeName}`;
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

export default useTransactionsSummary;
