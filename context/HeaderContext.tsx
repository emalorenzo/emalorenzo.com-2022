import React from 'react';
import { useRouter } from 'next/router';

export const HeaderContext = React.createContext(null);

export const HeaderProvider = ({ children }) => {
  const { asPath } = useRouter();
  const [title, setTitle] = React.useState('');

  const decodeURL = (path: string) => {
    const removedSlashPath = path.startsWith('/') ? path.substring(1) : path;
    return removedSlashPath.split('/');
  };

  const [section] = decodeURL(asPath);

  return (
    <HeaderContext.Provider value={{ section, title, setTitle }}>
      {children}
    </HeaderContext.Provider>
  );
};
