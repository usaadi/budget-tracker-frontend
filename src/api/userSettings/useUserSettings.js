import { useQuery } from "react-query";
import axios from "axios";
import useApiConfig from "../useApiConfig";

import { defaultQueryStaleTimeMs } from "../../constants/queryParameters";

const baseUrl = process.env.REACT_APP_BASE_API_URL;

const useUserSettings = () => {
  const { getApiConfig } = useApiConfig();

  return useQuery(
    ["user-settings"],
    async () => {
      const url = `${baseUrl}userSettings`;
      const config = await getApiConfig();
      return await axios.get(url, config);
    },
    {
      keepPreviousData: true,
      staleTime: defaultQueryStaleTimeMs,
      enabled: true,
    }
  );
};

export default useUserSettings;
