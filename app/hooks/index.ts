import { useContext, useState, useCallback } from 'react';
//
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import { AlertContext } from "../context/AlertContext";
import { LoadingContext } from "../context/LoadingContext";

export const useAuth = () => useContext(AuthContext);
export const useTheme = () => useContext(ThemeContext);
export const useAlert = () => useContext(AlertContext);
export const useLoading = () => useContext(LoadingContext);



interface UsePaginatedListProps<T> {
  fetchService: (params: any) => Promise<any>;
  extraParams?: object;
}

export const usePaginatedList = <T,>({ fetchService, extraParams = {} }: UsePaginatedListProps<T>) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = useCallback(async (resetPage?: number) => {
    const targetPage = resetPage ?? page;
    setLoading(true);

    try {
      const response = await fetchService({
        page: targetPage,
        per_page: 20,
        ...extraParams,
      });

      if (response?.success) {
        const { items, pagination } = response.data ?? {};
        const { total } = pagination ?? {};

        setData((prev) => (targetPage === 1 ? items : [...prev, ...items]));
        
        // Calculate hasMore based on total count vs what we just fetched
        const currentLength = targetPage === 1 ? items.length : data.length + items.length;
        setHasMore(currentLength < total);
        
        if (!resetPage) setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error(error);
      // showFailedAlert(); // Import your alert utility here
    } finally {
      setLoading(false);
    }
  }, [page, data.length, fetchService, extraParams]);

  const refresh = () => {
    setPage(1);
    fetchData(1);
  };

  return { data, loading, hasMore, fetchData, refresh };
};

