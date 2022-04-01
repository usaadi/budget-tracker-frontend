import { useQuery } from "react-query";
import axios from "axios";

import { defaultQueryStaleTimeMs } from "../../constants/queryParameters";

const baseUrl = process.env.REACT_APP_BASE_API_URL;

const useCategories = (type) => {
  const url = `${baseUrl}categories/${type}`;
  return useQuery(
    ["categories", type],
    async () => {
      return await axios.get(url);
    },
    {
      keepPreviousData: true,
      staleTime: defaultQueryStaleTimeMs,
    }
  );
};

export default useCategories;
