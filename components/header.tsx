import React from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Flex, Text, Box, Heading, HStack } from '@chakra-ui/react';
import {
  motion,
  useTransform,
  AnimateSharedLayout,
  AnimatePresence,
} from 'framer-motion';

import { EMOJIS } from 'data/emojis';
import { useInterval, useHeader } from 'hooks';

const MotionBox = motion.custom(Box);
const MotionFlex = motion.custom(Flex);

const HeaderItem = ({ isSelected, children, url }) => {
  const isHome = url === '/';
  console.log('url', url);

  const item = isHome ? (
    <Heading as="h3" fontSize="1.5rem" p={2}>
      {children}
    </Heading>
  ) : (
    <Text
      fontSize="1.2rem"
      fontFamily="Coves"
      color={isSelected ? 'accent' : 'gray.500'}
      transition="all 0.3s ease-in-out"
      p={2}
    >
      {children}
    </Text>
  );

  return (
    <NextLink href={url}>
      <MotionBox position="relative" cursor="pointer" layoutId={url}>
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
        {item}
      </MotionBox>
    </NextLink>
  );
};

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

  const fontSize = useTransform(scroll, [0, 0.1], ['5rem', '1.8rem']);
  const paddingTop = useTransform(scroll, [0, 0.1], ['10rem', '0rem']);
  console.log('section', section);
  return (
    <MotionFlex
      as="header"
      direction="column"
      width="full"
      borderColor="gray.200"
      borderBottomWidth={1}
      layoutId="header"
      overflowY="hidden"
    >
      <Box as="nav" py={4} px={16}>
        <Flex as="ul" justify="flex-start" align="center">
          <AnimateSharedLayout>
            <HeaderItem url="/" isSelected={!section}>
              EL
            </HeaderItem>
            <HStack spacing={4} ml={20} position="absolute">
              {(!section || section === 'blog') && (
                <HeaderItem url="/blog" isSelected={section === 'blog'}>
                  Blog
                </HeaderItem>
              )}
              {(!section || section === 'snippets') && (
                <HeaderItem url="/snippets" isSelected={section === 'snippets'}>
                  Snippets
                </HeaderItem>
              )}
              {(!section || section === 'histories') && (
                <HeaderItem
                  url="/histories"
                  isSelected={section === 'histories'}
                >
                  Historias
                </HeaderItem>
              )}
            </HStack>
          </AnimateSharedLayout>
          {title && (
            <motion.h1
              style={{ fontSize, paddingTop, marginLeft: '7rem' }}
              variants={greeting}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              {title}
            </motion.h1>
          )}
          {/* <AnimatePresence>
            {!title && (
              <motion.p
                style={{ fontSize: '5rem', paddingTop }}
                // initial={{ y: 100, opacity: 0 }}
                // animate={{ y: 0, opacity: 1 }}
                // exit={{ y: -200, opacity: 0 }}
                // transition={{ type: 'tween', delay: 1 }}
                // variants={greeting}
                // initial="hidden"
                // animate="show"
                // exit="exit"
              >
                Hey! Hola, soy Ema
              </motion.p>
            )} */}
          {/* </AnimatePresence> */}
        </Flex>
      </Box>
    </MotionFlex>
  );
};

const greeting = {
  hidden: { y: 100, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { delay: 0.5 } },
  exit: { y: -200, opacity: 0, transition: { delay: 0 } },
};
