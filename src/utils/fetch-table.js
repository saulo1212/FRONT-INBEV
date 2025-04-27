import { logout, apiFetchGet } from './requests';

export const FetchTable = async (
  endpoint,
  currentPage,
  setLoading,
  setData,
  setTotalRows,
  setSelectedId,
  rowsSelector,
) => {
  try {
    setLoading(true);
    const response = await apiFetchGet(`${endpoint}=${currentPage}`);
    setData(response.data[rowsSelector]);
    setTotalRows(response.data.count);

    setLoading(false);
    setSelectedId('');
  } catch (error) {
    setLoading(false);
    if (error.response && error.response.status === 401) logout();
  }
};
