import React from 'react';
import { Flex, Text, Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion.custom(Box);

const HeaderItem = ({ isSelected, onClick, children }) => (
  <Box as="li" position="relative" onClick={onClick} cursor="pointer">
    <Text px={4}>{children}</Text>
    {isSelected && (
      <MotionBox
        layoutId="underline"
        width="full"
        height="4px"
        position="absolute"
        bottom="-6px"
        bg="red.500"
      />
    )}
  </Box>
);

export const Header = () => {
  const [selected, setSelected] = React.useState('home');
  return (
    <header>
      <nav>
        <Flex as="ul">
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
            isSelected={selected === 'academy'}
            onClick={() => setSelected('academy')}
          >
            Academy
          </HeaderItem>
        </Flex>
      </nav>
    </header>
  );
};
