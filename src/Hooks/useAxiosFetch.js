import { useState, useEffect } from "react";
import axios from "axios";

const useAxiosFetch = (dataUrl) => {
  const [data, setData] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const source = axios.CancelToken.source();

    const fetchData = async (url) => {
      setIsLoading(true);
      try {
        const response = await axios.get(url, {
          cancelToken: source.token,
        });

        if (isMounted) {
          setData(response.data);
          setFetchError(null);
        }
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Request was canceled:", err.message);
        } else {
          setData([]);
          setFetchError(err.message);
          console.log("There is an error:", err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData(dataUrl);

    return () => {
      isMounted = false;
      source.cancel("Request canceled due to component unmount");
    };
  }, [dataUrl]);

  return { isLoading, fetchError, data };
};

export default useAxiosFetch;
