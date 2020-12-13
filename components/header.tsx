import React from 'react';
import { Flex, Text, Box, Heading } from '@chakra-ui/react';
import { motion, AnimateSharedLayout } from 'framer-motion';

const MotionBox = motion.custom(Box);

const HeaderItem = ({ isSelected, onClick, children }) => (
  <Box as="li" position="relative" onClick={onClick} cursor="pointer" mr={4}>
    {isSelected && (
      <MotionBox
        layoutId="underline"
        width="full"
        height="full"
        position="absolute"
        borderRadius={4}
        borderStyle="dashed"
        borderWidth={isSelected ? 1 : 0}
        top={0}
      />
    )}
    <Text
      fontSize="1.2rem"
      fontFamily="Coves"
      color={isSelected && 'accent'}
      transition="all 0.3s ease-in-out"
      p={2}
      position="relative"
    >
      {children}
    </Text>
  </Box>
);

export const Header = () => {
  const [selected, setSelected] = React.useState('home');
  return (
    <Box
      as="header"
      py={4}
      px={16}
      borderColor="gray.300"
      // borderBottomWidth={1}
      bg="white"
      position="fixed"
      width="full"
    >
      <nav>
        <Flex as="ul" justify="flex-end" align="center">
          <Heading as="h3" fontSize="1.5rem" mr="auto">
            EL
          </Heading>
          <AnimateSharedLayout>
            <HeaderItem
              isSelected={selected === 'home'}
              onClick={() => setSelected('home')}
            >
              Home
            </HeaderItem>
            <HeaderItem
              isSelected={selected === 'blog'}
              onClick={() => setSelected('blog')}
            >
              Blog
            </HeaderItem>
            <HeaderItem
              isSelected={selected === 'histories'}
              onClick={() => setSelected('histories')}
            >
              Historias
            </HeaderItem>
          </AnimateSharedLayout>
        </Flex>
      </nav>
    </Box>
  );
};
