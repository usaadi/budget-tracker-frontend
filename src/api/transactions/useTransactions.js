import { useQuery } from "react-query";
import axios from "axios";
import useApiConfig from "../useApiConfig";

import { defaultQueryStaleTimeMs } from "../../constants/queryParameters";

const baseUrl = process.env.REACT_APP_BASE_API_URL;

const useTransactions = (categoryTypeName) => {
  const { getApiConfig } = useApiConfig();

  return useQuery(
    ["transactions", categoryTypeName],
    async () => {
      const url = `${baseUrl}transactions/${categoryTypeName}`;
      const config = await getApiConfig();
      return await axios.get(url, config);
    },
    {
      keepPreviousData: true,
      staleTime: defaultQueryStaleTimeMs,
    }
  );
};

export default useTransactions;
