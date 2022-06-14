import { useInfiniteQuery } from "react-query";
import axios from "axios";
import useApiConfig from "../useApiConfig";

import { defaultQueryStaleTimeMs } from "../../constants/queryParameters";

const baseUrl = process.env.REACT_APP_BASE_API_URL;
const pageSize = 20;

const useInfiniteTransactions = (transactionTypeName, fromDate, toDate) => {
  const { getApiConfig } = useApiConfig();

  return useInfiniteQuery(
    ["infinite-transactions", transactionTypeName, fromDate, toDate],
    async ({ pageParam = 1 }) => {
      const url = `${baseUrl}transactions/${transactionTypeName}`;
      const config = await getApiConfig();
      const data = {
        fromDate,
        toDate,
        pageSize,
        pageNumber: pageParam,
      };
      return await axios.post(url, data, config);
    },
    {
      keepPreviousData: true,
      staleTime: defaultQueryStaleTimeMs,
      getNextPageParam,
    }
  );
};

export default useInfiniteTransactions;
