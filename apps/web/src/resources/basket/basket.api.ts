import { useMutation, useQuery } from 'react-query';

import queryClient from 'query-client';
import { apiService } from 'services';

import { BasketTypes } from 'resources/basket';

export function useGetBasket(page: number, options?: {}) {
  const getBasket = () => apiService.get(`/basket/list?page=${page}`);

  return useQuery<BasketTypes.ResponseTypes>(['basketList'], getBasket, options);
}

export function useChangeProductBasketQuantity<T>() {
  const changeQuantity = (data: T) => apiService.post('/basket/changeQuantity', data);

  return useMutation<any, unknown, T>(changeQuantity, {
    onSuccess: (data) => {
      queryClient.setQueryData(['basket'], data);
      queryClient.invalidateQueries({ queryKey: ['basketList'] });
    },
  });
}

export function useToggleProductInBasket<T>() {
  const toggleProduct = (data: T) => apiService.post('/basket/toggle', { productID: data });

  return useMutation<any, unknown, T>(toggleProduct, {
    onSuccess: (data) => {
      queryClient.setQueryData(['basket'], data);
      queryClient.invalidateQueries({ queryKey: ['marketplace'] });
      queryClient.invalidateQueries({ queryKey: ['basketList'] });
    },
  });
}

export function useDeleteProductInBasket() {
  const deleteProduct = (id: string) => apiService.delete(`/basket/delete/${id}`);

  return useMutation(deleteProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries(['basketList']);
    },
  });
}
