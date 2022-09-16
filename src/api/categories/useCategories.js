import { useQuery } from "react-query";
import axios from "axios";
import useApiConfig from "../useApiConfig";

import { defaultQueryStaleTimeMs } from "../../constants/queryParameters";

const baseUrl = process.env.REACT_APP_BASE_API_URL;

const useCategories = (transactionTypeName, pageSize, pageNumber, noPagination, sortBy, isDesc) => {
  const { getApiConfig } = useApiConfig();

  const noPaginationStr = noPagination ? "true" : "false";
  const isDescStr = isDesc ? "true" : "false";

  return useQuery(
    ["categories", transactionTypeName, pageSize, pageNumber, sortBy, isDescStr, noPaginationStr],
    async () => {
      const url = `${baseUrl}categories/${transactionTypeName}/${pageSize}/${pageNumber}/${sortBy}/${isDescStr}/${noPaginationStr}`;
      const config = await getApiConfig();
      return await axios.get(url, config);
    },
    {
      keepPreviousData: true,
      staleTime: defaultQueryStaleTimeMs,
    }
  );
};

export default useCategories;
