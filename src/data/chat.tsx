import { Box, Text } from '@chakra-ui/react';

import { Buble } from 'src/components/chat';

export const chatData: Buble[] = [
  {
    id: 1,
    content: (
      <>
        <Text as="h1" fontSize="2rem">
          Hey,
        </Text>
        <Box display="inline">
          <Text fontSize="1rem">
            Soy Ema, un fullstack dev de 🇦🇷. <br />
            Este es mi espacio donde comparto lo que aprendo
          </Text>
        </Box>
      </>
    ),
    duration: 5000,
  },
  {
    id: 2,
    content: (
      <>
        <Box display="inline">
          <Text fontSize="1rem">
            Me especializo en tecnologias mobile y web, pero me defiendo en
            backend, devops y videojuegos
            <br />
          </Text>
        </Box>
      </>
    ),
    duration: 3000,
  },
  {
    id: 3,
    content: (
      <>
        <Box display="inline">
          <Text fontSize="1rem">
            Mi stack favorito es <br /> Next.js + ChakraUI + Framer Motion
          </Text>
        </Box>
      </>
    ),
    duration: 3000,
  },
  {
    id: 4,
    content: (
      <>
        <Box display="inline">
          <Text fontSize="1rem">Aguante Naruto y el ramen</Text>
        </Box>
      </>
    ),
    duration: 1000,
  },
];
