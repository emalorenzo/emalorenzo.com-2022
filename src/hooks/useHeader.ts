import React from 'react';

import { HeaderContext } from 'src/context';

export const useHeader = () => {
  return React.useContext(HeaderContext);
};
