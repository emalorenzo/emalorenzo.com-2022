import React from 'react';

import { HeaderContext } from '@/context';

export const useHeader = () => {
  return React.useContext(HeaderContext);
};
