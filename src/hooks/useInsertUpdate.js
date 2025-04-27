'use client';

import { useMutation, useQueryClient } from 'react-query';
import { Alert } from 'src/utils/alert';
import { apiFetchPut, apiFecthPost } from 'src/utils/requests';

export function useInsertUpdate(endpoint, endpointEdit = '') {
  const queryClient = useQueryClient();

  const insertMutation = useMutation(
    (newData) => {
      console.log('endpoint usado no insert', endpoint);
      return apiFecthPost(endpoint, newData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(endpoint);
      },
      onError: (error) => {
        console.error('Erro na mutation:', error);

        if (error.response?.data?.message) {
          Alert('warning', 'Atenção!', error.response.data.message);
        } else {
          Alert('error', 'Erro!', 'Algo deu errado na requisição.');
        }
      },
    }
  );

  const updateMutation = useMutation(
    ({ id, updatedData }) => apiFetchPut(`${endpointEdit || endpoint}/${id}`, updatedData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(endpoint);
      },
      onError: (error) => {
        if (error.response?.data?.message) {
          Alert('warning', 'Atenção!', error.response.data.message);
        }
      },
    }
  );

  return { insertMutation, updateMutation };
}

