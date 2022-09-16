import { useInfiniteQuery } from "react-query";
import axios from "axios";
import useApiConfig from "../useApiConfig";

import { defaultQueryStaleTimeMs } from "../../constants/queryParameters";

const baseUrl = process.env.REACT_APP_BASE_API_URL;

const useInfiniteTransactions = (transactionTypeName, fromDate, toDate, pageSize) => {
  const { getApiConfig } = useApiConfig();

  return useInfiniteQuery(
    ["infinite-transactions", transactionTypeName, fromDate, toDate, pageSize],
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
      getNextPageParam: (page) => (page.data.hasMore ? page.data.nextPageNumber : undefined),
    }
  );
};

export default useInfiniteTransactions;
