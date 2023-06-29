import React, { Suspense, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import FallbackSpinner from './shared/utils/FallbackSpinner';
import ConfigRoute from './shared/containers/ConfigRoute';
import useModifiedData from './shared/hooks/useModifiedData';
import { useAuth } from './context/auth';
import { useNavigate } from 'react-router-dom';

const App = () => {
  useModifiedData();
  const user = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/create-account');
    }
  }, [user, navigate]);

  return (
    <Box>
      <Suspense fallback={<FallbackSpinner />}>
        <ConfigRoute />
      </Suspense>
    </Box>
  );
};

export default App;
