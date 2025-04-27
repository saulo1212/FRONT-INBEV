import { Alert } from './alert';
import { apiFetchPut } from './requests';

export const handleChangeSit = async (url, active, fetch) => {
  try {
    await apiFetchPut(url, { active });
    fetch(1);
  } catch (error) {
    if (error.response.data.error)
      return Alert('error', 'Atenção!', `${error.response.data.error}`);
  }
};
