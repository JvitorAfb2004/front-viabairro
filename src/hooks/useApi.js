import { useState, useCallback } from 'react';

// Hook personalizado para gerenciar estados de requisições da API
export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (apiCall) => {
    setLoading(true);
    setError(null);

    try {
      const result = await apiCall();
      return result;
    } catch (err) {
      setError(err.message || 'Erro na requisição');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setError(null);
  }, []);

  return {
    loading,
    error,
    execute,
    reset
  };
};

export default useApi;
