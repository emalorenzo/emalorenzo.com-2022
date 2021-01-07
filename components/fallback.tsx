import { VStack, Heading } from '@chakra-ui/react';

export const Fallback = () => (
  <VStack>
    <Heading>
      Felicidades! Sos la primera persona en visitar esta pagina
    </Heading>
    <Heading as="h3">
      Next.js esta generando estaticamente esta pagina, en proximas visitas a
      esta pagina ya no vas a ver este mensaje..
    </Heading>
  </VStack>
);
