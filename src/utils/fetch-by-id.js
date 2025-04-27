import { Alert } from './alert';
import { apiFetchGet } from './requests';

export const ClickEdit = async (
  selectedId,
  setOpen,
  setTitle,
  endpointEdit,
  setForm,
  rowSelector,
) => {
  if (!selectedId) return Alert('error', 'Atenção!', 'seleciona um registro!');

  setOpen(true);
  setTitle('Editar registro');

  const response = await apiFetchGet(`${endpointEdit}/${selectedId}`);
  
  setForm(response.data[rowSelector]);
};
