import { extendTheme } from '@chakra-ui/react';

const config = {
  useSystemColorMode: false,
  initialColorMode: 'light',
};

const styles = {
  global: (props) => ({
    'html, body': {
      color: props.colorMode === 'dark' ? 'white' : 'gray.600',
      backgroundColor: props.colorMode === 'dark' ? 'background' : 'white',
    },
    a: {
      color: props.colorMode === 'dark' ? 'teal.300' : 'teal.500',
    },
    li: {
      listStyle: 'none',
    },
    main: {
      flex: 1,
    },
  }),
};

const colors = {
  background: '#0E151C',
  brand: {
    100: '#f7fafc',
    // ...
    900: '#1a202c',
  },
};

const fonts = {
  body: `Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
  heading: `'Poppins', sans-serif`,
  // mono: 'Menlo, monospace',
};

export const theme = extendTheme({
  config,
  styles,
  colors,
  fonts,
});
