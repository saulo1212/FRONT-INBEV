
import axios from '../config/api';

export const logout = async () => {
  localStorage.clear();

  window.location.href = '/';
};

export const apiFetchGet = async (endpoint, body = null) => {
  const response = await axios.get(`${endpoint}`);
  return response;
};

export const apiFecthPost = async (endpoint, body) => {
 
  const response = await axios.post(`${endpoint}`, body);
  return response;
};

export const apiFetchPut = async (endpoint, body) => {

  const response = await axios.put(`${endpoint}`, body);

   return response;
};

export const apiFetchDelete = async (endpoint, body = null) => {
  const response = await axios.delete(`${endpoint}`, { data: body });

  return response;
};


export const apiFetchUserById = async (id) => {
  if (!id) throw new Error('ID não fornecido');
  const response = await apiFetchGet(`/user/${id}`);
  return response.data.user;
};

export const apiSaveUser = async ({ endpoint, data, id }) => {

  if (!endpoint) {
    throw new Error('Endpoint não fornecido');
  }

  try {
    const response = await apiFetchPut(`${endpoint}/${id}`, data);
    if (response.data?.message === true) {
      return { success: true };
    }
    return response.data;
  } catch (error) {
    console.error('Erro em saveUser:', error);
    throw error; 
  }
 
};

export const apiDeleteUser = async ({ endpoint, id }) => {
  console.log('deleteUser chamado com:', { endpoint, id });

  if (!endpoint || !id) {
    throw new Error('Endpoint ou ID não fornecido');
  }

  try {
    const response = await apiFetchDelete(`/${endpoint}/${id}`);
    if (response.data?.message === true) {
      return { success: true };
    }
    return response.data;
  } catch (error) {
    console.error('Erro em deleteUser:', error);
    throw error;
  }
};

 export const apiChangeUserSituation = async ({ endpoint, id, active }) => {
    if (!endpoint || !id) {
      throw new Error('Endpoint ou ID não fornecido');
    }
    try {
      const response =  await apiFetchPut(`user/${id}/active`, { active }); 
      if (response.data?.message === true) {
        return { success: true };
      }
      return response.data;
    } catch (error) {
      console.error('Erro em changeUserSituation:', error);
      throw error;
    }
  };



