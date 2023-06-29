import { useLocation } from 'react-router-dom';

const useGetQuerySearchTerm = queryName => {
  const location = useLocation();

  const queryParam = new URLSearchParams(location.search);
  return queryParam.get(queryName);
};

export default useGetQuerySearchTerm;
