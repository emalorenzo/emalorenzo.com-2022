import React from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Flex, Text, Box, Heading } from '@chakra-ui/react';
import { motion, useTransform, AnimateSharedLayout } from 'framer-motion';

import { EMOJIS } from 'data/emojis';
import { useInterval, useHeader } from 'hooks';

const MotionBox = motion.custom(Box);

const HeaderItem = ({ isSelected, children, url }) => (
  <NextLink href={url}>
    <Box as="a" position="relative" cursor="pointer" mr={4}>
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
        color={isSelected ? 'accent' : 'gray.500'}
        transition="all 0.3s ease-in-out"
        p={2}
        position="relative"
      >
        {children}
      </Text>
    </Box>
  </NextLink>
);

const Hero = () => {
  const { pathname } = useRouter();
  const [emojiIndex, setEmojiIndex] = React.useState(0);
  const [emojiDelay, setEmojiDelay] = React.useState(1000);

  // Increment emoji index
  useInterval(() => {
    if (emojiIndex < EMOJIS.length - 1) {
      setEmojiIndex(emojiIndex + 1);
    } else {
      setEmojiDelay(null);
    }
  }, emojiDelay);

  // Make it faster every 3 second
  useInterval(() => {
    if (emojiDelay > 10) {
      setEmojiDelay(emojiDelay / 2);
    }
  }, 3000);

  return (
    <Flex py={8} px={16} direction="column" mb={160}>
      <Text as="h1" fontSize="2rem">
        Hey,
      </Text>
      <Box display="inline">
        <Text fontSize="1.5rem">
          Soy {EMOJIS[emojiIndex]} basado en 🇦🇷. <br />
          Este es mi espacio donde comparto lo que aprendo
        </Text>
      </Box>
    </Flex>
  );
};

export const Header = ({ scroll }) => {
  const { section, title } = useHeader();

  const fontSize = useTransform(scroll, [0, 0.1], ['5rem', '2rem']);
  const paddingTop = useTransform(scroll, [0, 0.1], ['10rem', '0rem']);
  return (
    <Flex
      as="header"
      direction="column"
      width="full"
      borderColor="gray.200"
      borderBottomWidth={1}
    >
      <Box as="nav" py={4} px={16}>
        <Flex as="ul" justify="flex-start" align="center">
          <Heading as="h3" fontSize="1.5rem" mr={8}>
            EL
          </Heading>
          <AnimateSharedLayout>
            {/* <HeaderItem url="/" isSelected={!section}>
              Home
            </HeaderItem> */}
            <HeaderItem url="/blog" isSelected={section === 'blog'}>
              Blog
            </HeaderItem>
            {/* <HeaderItem url="/snippets" isSelected={section === 'snippets'}>
              Snippets
            </HeaderItem>
            <HeaderItem url="/histories" isSelected={section === 'histories'}>
              Historias
            </HeaderItem> */}
          </AnimateSharedLayout>
          <motion.p style={{ fontSize, padding: 10, paddingTop }}>
            {title}
          </motion.p>
        </Flex>
      </Box>
    </Flex>
  );
};

// export const Header = React.forwardRef(HeaderComponent);
