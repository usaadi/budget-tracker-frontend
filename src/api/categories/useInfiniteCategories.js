import { useInfiniteQuery } from "react-query";
import axios from "axios";
import useApiConfig from "../useApiConfig";

import { defaultQueryStaleTimeMs } from "../../constants/queryParameters";

const baseUrl = process.env.REACT_APP_BASE_API_URL;

const useInfiniteCategories = (transactionTypeName, pageSize) => {
  const { getApiConfig } = useApiConfig();

  return useInfiniteQuery(
    ["infinite-categories", transactionTypeName, pageSize],
    async ({ pageParam = 1 }) => {
      const url = `${baseUrl}categories/${transactionTypeName}/${pageSize}/${pageParam}`;
      const config = await getApiConfig();
      return await axios.get(url, config);
    },
    {
      keepPreviousData: true,
      staleTime: defaultQueryStaleTimeMs,
      getNextPageParam: (page) => (page.data.hasMore ? page.data.nextPageNumber : undefined),
    }
  );
};

export default useInfiniteCategories;
