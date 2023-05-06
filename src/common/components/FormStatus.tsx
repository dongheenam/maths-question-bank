'use client';

import { useReducer } from 'react';

type StatusState = {
  loading: boolean;
  error: string | null;
  message: string;
};
const statusUpdater = (prev: StatusState, next: Partial<StatusState>) => {
  return { ...prev, ...next };
};

export const useFormStatus = (initialMessage: string = 'waiting...') => {
  const [status, updateStatus] = useReducer(statusUpdater, {
    loading: false,
    error: null,
    message: initialMessage,
  });

  return {
    formStatus: status,
    setMessage: (message: string) =>
      updateStatus({ message, loading: false, error: null }),
    setError: (error: string) => updateStatus({ error, loading: false }),
    setLoading: () => updateStatus({ loading: true, error: null }),
  };
};

const FormStatus = ({ status }: { status: StatusState }) => {
  const { loading, error, message } = status;
  return (
    <div>
      <p>
        <span>Status: </span>
        {loading ? (
          <span>loading...</span>
        ) : error ? (
          <span>[Error] {error}</span>
        ) : (
          <span>{message}</span>
        )}
      </p>
    </div>
  );
};
export default FormStatus;
