'use client';

import { useState, useEffect } from 'react';
import { fDate } from 'src/utils/format-time';
import { apiFetchGet, logout, apiDeleteUser, apiChangeUserSituation } from 'src/utils/requests';
import DataTable from 'react-data-table-component';
import { Button, Card, Container, IconButton, Switch, Tooltip } from '@mui/material';
import ModalForm from '../modal-form';
import Iconify from 'src/components/iconify';
import Progress from 'src/components/progress';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { Alert } from 'src/utils/alert';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export default function UserListView() {
  const settings = useSettingsContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedId, setSelectedId] = useState();
  const [openModal, setOpenModal] = useState(false);
  const queryClient = useQueryClient();

  const { data: queryData, isLoading, error } = useQuery({
    queryKey: ['users', currentPage],
    queryFn: async () => {
      try {
        const response = await apiFetchGet(`user?page=${currentPage}`);
        return {
          users: response.data.users,
          totalRows: response.data.count,
        };
      } catch (err) {
        if (err.response?.status === 401) {
          logout();
        }
        throw err;
      }
    },
    keepPreviousData: true,
  });

  
  const handlePageChange = (page) => setCurrentPage(page);
  

  
  const situationMutation = useMutation({
    mutationFn: apiChangeUserSituation,
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      Alert('success', 'Sucesso!', 'Situação do usuário atualizada com sucesso.');
    },
    onError: (error) => {
      console.error('Erro na mutação de situação:', error);
      let message = 'Não foi possível atualizar a situação do usuário';
      if (error.response) {
        message = error.response.data?.message || `Erro ${error.response.status}: Falha ao atualizar`;
      } else if (error.request) {
        message = 'Erro de rede: Não foi possível conectar ao servidor';
      } else {
        message = error.message || 'Erro desconhecido';
      }
      Alert('error', 'Erro', message);
    },
  });

 
  const deleteMutation = useMutation({
    mutationFn: apiDeleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      Alert('success', 'Deletado!', 'Usuário deletado com sucesso.');
    },
    onError: (error) => {
      console.error('Erro na mutação de delete:', error);
      let message = 'Não foi possível deletar o usuário';
      if (error.response) {
        message = error.response.data?.message || `Erro ${error.response.status}: Falha ao deletar`;
      } else if (error.request) {
        message = 'Erro de rede: Não foi possível conectar ao servidor';
      } else {
        message = error.message || 'Erro desconhecido';
      }
      Alert('error', 'Erro', message);
    },
  });

  const handleChangeSituation = (id, active) => situationMutation.mutate({ endpoint: 'user', id, active });
  

  const handleDeleteUser = async (id) => {
    const result = await Alert('warning', 'Tem certeza?', 'Essa ação não poderá ser desfeita!', {
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sim, deletar!',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      deleteMutation.mutate({ endpoint: 'user', id });
    }
  };


  useEffect(() => {
    if (error && error.response?.status === 401) {
      logout();
    }
  }, [error]);

  const columns = [
    {
      name: 'id',
      omit: true,
      selector: (row) => row.id,
    },
    {
      name: 'Situação',
      cell: (row) => (
        <Switch
          color="success"
          checked={row.active}
          onChange={() => handleChangeSituation(row.id, !row.active)}
        />
      ),
    },
    {
      name: 'Nome',
      selector: (row) => row.name,
    },
    {
      name: 'Login',
      selector: (row) => row.userLogin,
    },
    {
      name: 'Email',
      cell: (row) => <p>{row.email}</p>,
    },
    {
      name: 'DH Cadastro',
      cell: (row) => fDate(row.dh_cadastro, 'dd/MM/yyyy HH:mm:ss'),
    },
    {
      name: 'DH Atualização',
      cell: (row) =>
        row.dh_update ? fDate(row.dh_update, 'dd/MM/yyyy HH:mm:ss') : 'Sem informação',
    },
    {
      name: 'Ações',
      cell: (row) => (
        <>
          <Tooltip title="Editar" placement="top" arrow>
            <IconButton color="default" onClick={() => setSelectedId(row.id)}>
              <Iconify icon="solar:pen-bold" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Deletar" placement="top" arrow>
            <IconButton color="error" onClick={() => handleDeleteUser(row.id)}>
              <Iconify icon="lucide:archive-x" />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading="Usuários"
        action={
          <Button
            variant="contained"
            onClick={() => {
              setSelectedId(undefined);
              setOpenModal(true);
            }}
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            Novo
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <Card>
        <DataTable
          subHeader
          pagination
          keyField="id"
          paginationServer
          highlightOnHover
          columns={columns}
          progressPending={isLoading}
          theme={settings.themeMode}
          className="noBorderRadius"
          paginationTotalRows={queryData?.totalRows || 0}
          onChangePage={handlePageChange}
          progressComponent={<Progress />}
          data={queryData?.users?.map((item, index) => ({ ...item, index })) || []}
          actions={
            <ModalForm
              open={openModal}
              setOpen={setOpenModal}
              selectedId={selectedId}
              reload={() => queryClient.invalidateQueries(['users'])}
            />
          }
        />
      </Card>
    </Container>
  );
}