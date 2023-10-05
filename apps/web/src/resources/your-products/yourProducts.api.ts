import { useMutation, useQuery } from 'react-query';
import { apiService } from 'services';
import queryClient from 'query-client';
import { YourProudctsTypes } from '.';

export function useGetYourProducts(page: number, options?: {}) {
  const get = () => apiService.get(`/products/your-products?page=${page}`);

  return useQuery<YourProudctsTypes.ApiResponse>(['yourProducts'], get, options);
}

export function useUploadNewProduct<T>() {
  const uploadNewProduct = (data: T) => {
    const headers = {
      'Content-Type': 'multipart/form-data',
    };
    return apiService.post('/products/add', data, { headers });
  };

  return useMutation<any, unknown, T>(uploadNewProduct, {
    onSuccess: (data) => {
      queryClient.setQueryData(['yourProducts'], data);
      queryClient.invalidateQueries({ queryKey: ['yourProducts'] });
    },
  });
}

export function useDeleteProduct(id: string) {
  const deleteProduct = () => apiService.delete(`/products/delete/${id}`);

  return useMutation<any>(deleteProduct, {
    onSuccess: (data) => {
      queryClient.setQueryData(['yourProducts'], data);
      queryClient.invalidateQueries({ queryKey: ['yourProducts'] });
    },
  });
}
