'use client';

import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import {Alert} from 'src/utils/alert'
import { ClickEdit } from 'src/utils/fetch-by-id';

import Modal from 'src/components/modal/modal';

import Form from './form';
import { schema, schemaUpdate } from './validation-schema';
import {apiFetchGet, apiFetchPut, apiFecthPost} from '../../utils/requests'

const fetchUserById = async (id) => {
  if (!id) throw new Error('ID não fornecido');
  const response = await apiFetchGet(`/user/${id}`);
  return response.data.user;
};

const saveUser = async ({ endpoint, data, id }) => {

  if (!endpoint) {
    throw new Error('Endpoint não fornecido');
  }

  try {
    if(id){
      const response = await apiFetchPut(`${endpoint}/${id}`, data);
      if (response.data?.message === true) {
        return { success: true };
      }
      return response.data;
    }

    const response = await apiFecthPost(`/${endpoint}`, data);
    return response.data;
   
  } catch (error) {
    console.error('Erro em saveUser:', error);
    throw error; 
  }
 
};


export default function ModalForm({ open, reload, setOpen, selectedId, openModalCompanies }) {
  let endpoint = 'accounts';
  let endpointEdit = 'user';
  let formValues = {
    name: '',
    userLogin: '',
    email: '',
    password: '',
    active: false,
  };

  const [title, setTitle] = useState('');
  const [form, setForm] = useState(formValues);
  const queryClient = useQueryClient()

  const { data: userData, isLoading, error } = useQuery({
    queryKey: ['user', selectedId],
    queryFn: () => fetchUserById(selectedId),
    enabled: !!selectedId && !openModalCompanies,
  });

  const mutation = useMutation({
    mutationFn: saveUser,
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      reload(1);
      handleClose();
    },
    onError: (error) => {
      console.error('Erro na mutação:', error);

      let message = 'Erro ao salvar';
      if (error.response) {
        if (error.response.data?.message) {
          message = error.response.data.message;
        } else if (typeof error.response.data === 'string') {
          message = error.response.data;
        } else {
          message = `Erro ${error.response.status}: Falha ao salvar`;
        }
      } else if (error.request) {
        message = 'Erro de rede: Não foi possível conectar ao servidor';
      } else {
        message = error.message || 'Erro desconhecido';
      }

      Alert('warning', 'Atenção!', message);
    },
  });

  useEffect(() => {
    if (error) {
      Alert('error', 'Atenção!', 'Selecione um registro válido!');
      setOpen(false);
    }
  }, [error]);

  const handleClose = () => {
    reload(1);
    setTitle('');
    setOpen(false);
    setForm(formValues);
  };

 
  const onChangeForm = (field) => (evt) =>
    setForm({
      ...form,
      [field]: evt.target.value,
    });

  const handleClickEdit = async () =>
    await ClickEdit(selectedId, setOpen, setTitle, endpointEdit, setForm, 'user', true);

  const save = async () => {
    try {
      const validatedData = selectedId
        ? await schemaUpdate.validate(form, { abortEarly: false })
        : await schema.validate(form, { abortEarly: false });

      mutation.mutate({
        endpoint: selectedId ? endpointEdit : endpoint,
        data: validatedData,
        id: selectedId,
      });
    } catch (error) {
      const message = error.errors?.[0] || 'Erro de validação';
      Alert('warning', 'Atenção!', message);
    }
  };

  useEffect(() => {
    if (selectedId && !openModalCompanies) handleClickEdit();
  }, [selectedId]);

  return (
    <Modal {...{ open, handleClose, title, save }}>
      <Form {...{ form, onChangeForm, selectedId }} />
    </Modal>
  );
}

ModalForm.propTypes = {
  open: PropTypes.bool,
  reload: PropTypes.func,
  setOpen: PropTypes.func,
  selectedId: PropTypes.string,
  openModalCompanies: PropTypes.bool,
};
