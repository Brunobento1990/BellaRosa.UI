import { useState } from 'react';
import * as S from './styles';
import { CircularProgress } from '@mui/material';

let loaderHandler = (isLoading, message) => { };

function LoaderComponent() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  loaderHandler = (isLoading, message) => {
    if (message) {
      setMessage(message);
    } else {
      setMessage('Aguarde...');
    }
    setLoading(isLoading);
  };

  if (!loading) return null;

  return (
    <S.View>
      <CircularProgress color="secondary" />
      <S.Text>{message}</S.Text>
    </S.View>
  );
}

export function useLoader() {
  return {
    Component: LoaderComponent,
    show: (message) => loaderHandler(true, message),
    hide: () => loaderHandler(false),
  };
}