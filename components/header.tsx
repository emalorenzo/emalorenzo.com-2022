import React from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Flex, Text, Box, Heading, HStack } from '@chakra-ui/react';
import { motion, useTransform, AnimateSharedLayout } from 'framer-motion';

import { EMOJIS } from 'data/emojis';
import { useInterval, useHeader } from 'hooks';

const MotionBox = motion.custom(Box);
const MotionFlex = motion.custom(Flex);

const titleVariants = {
  hidden: { y: 100, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { delay: 0.5 } },
  exit: { y: -200, opacity: 0, transition: { delay: 0 } },
};

const HeaderItem = ({ children, url }) => {
  const { section } = useHeader();
  const isHome = url === '/';
  const isSelected = `/${section}` === url;
  console.log(url);

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
      {/* <AnimatePresence> */}
      {/* {(isHome || !section || isSelected) && ( */}
      <MotionBox
        position="relative"
        cursor="pointer"
        layoutId={url}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
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
      {/* )} */}
      {/* </AnimatePresence> */}
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
  const { title } = useHeader();

  const fontSize = useTransform(scroll, [0, 0.1], ['4rem', '1.8rem']);
  const paddingTop = useTransform(scroll, [0, 0.1], ['10rem', '0rem']);
  const marginLeft = useTransform(scroll, [0, 0.1], ['7rem', '20rem']);
  return (
    <MotionFlex
      as="header"
      direction="column"
      width="full"
      borderColor="gray.200"
      borderBottomWidth={1}
      overflowY="hidden"
    >
      <Box as="nav" py={4} px={16}>
        <Flex as="ul" justify="flex-start" align="center">
          <AnimateSharedLayout>
            {/* header items */}
            <HeaderItem url="/">EL</HeaderItem>

            <HStack spacing={4} ml={20} position="absolute">
              <HeaderItem url="/blog">Blog</HeaderItem>
              <HeaderItem url="/snippets">Snippets</HeaderItem>
              <HeaderItem url="/histories">Historias</HeaderItem>
            </HStack>

            {/* title */}
          </AnimateSharedLayout>
          {title && (
            <motion.h1
              style={{ fontSize, paddingTop, marginLeft }}
              variants={titleVariants}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              {title}
            </motion.h1>
          )}
        </Flex>
      </Box>
    </MotionFlex>
  );
};
