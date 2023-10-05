import { useQuery } from 'react-query';
import { apiService } from 'services';
import { MarketplaceTypes } from '.';

export function useGetMarketplaceProducts(
  filters: MarketplaceTypes.Filters,
  currentPage: number,
  isStoreUpdated: boolean,
  options?: {},
) {
  const { sortBy, fromPrice, toPrice, searchValue } = filters;
  const get = () => apiService.get(
    `/products/marketplace?page=${currentPage}&sort=${sortBy}&fromPrice=${fromPrice}&toPrice=${toPrice}&searchValue=${searchValue}`,
  );

  return useQuery<MarketplaceTypes.ProductResponse>(['marketplace'], get, { ...options, enabled: isStoreUpdated });
}
