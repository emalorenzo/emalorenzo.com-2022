import React from 'react';
import {
  Transition,
  useAnimation,
  AnimatePresence,
  motion,
} from 'framer-motion';
import { Flex, Text, Box } from '@chakra-ui/react';
import { MotionFlex, MotionBox } from 'components';

const DOT_ANIM_DURATION = 0.1;

const AnimatedDot = () => {
  const transition: Transition = {
    repeat: Infinity,
    repeatDelay: DOT_ANIM_DURATION,
    repeatType: 'reverse',
    type: 'just',
  };

  const item = {
    hidden: { y: 0, opacity: 0.5 },
    show: {
      opacity: 1,
      y: '-0.25rem',
      transition,
    },
  };
  return (
    <MotionBox
      w={2}
      h={2}
      bg="gray.400"
      borderRadius="50%"
      mx="0.1rem"
      variants={item}
    />
  );
};

export const LoadingChat = () => {
  const container = {
    hidden: { x: 50, opacity: 0, borderRadius: '16rem' },
    show: {
      x: 0,
      opacity: 1,
      width: 'auto',
      transition: {
        duration: 1,
        when: 'beforeChildren',
        staggerChildren: DOT_ANIM_DURATION,
      },
    },
    mutate: {
      width: '100%',
      borderRadius: '1rem',
      transition: {
        duration: 1,
        type: 'just',
        //     layoutX: { duration: 0.3 },
        //     layoutY: { delay: 0.2, duration: 0.3 },
      },
    },
  };

  const controls = useAnimation();

  const [loading, setLoading] = React.useState(true);
  const [readyForContent, setReadyForContent] = React.useState(false);

  const changeState = () => {
    const mutateChat = async () => {
      setLoading(!loading);
      await controls.start(loading ? 'mutate' : 'show');

      setReadyForContent(true);
    };
    mutateChat();
  };

  React.useEffect(() => {
    controls.start('show');
  }, [controls]);
  return (
    <Flex
      w="full"
      h="full"
      justify="flex-end"
      alignItems={loading ? 'flex-end' : 'flex-start'}
    >
      <MotionFlex
        p={loading ? 2 : 8}
        minH={8}
        maxW={80}
        alignItems="flex-end"
        borderWidth={1}
        bg="white"
        variants={container}
        initial="hidden"
        animate={controls}
        onClick={changeState}
        direction={loading ? 'row' : 'column'}
        layout
        overflow="hidden"
      >
        {loading ? (
          <>
            <AnimatedDot />
            <AnimatedDot />
            <AnimatedDot />
          </>
        ) : (
          <AnimatePresence>
            {readyForContent && (
              <MotionBox
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                layout
              >
                <Text as="h1" fontSize="2rem">
                  Hey,
                </Text>
                <Box display="inline">
                  <Text fontSize="1rem">
                    Soy Ema, un fullstack dev de 🇦🇷. <br />
                    Este es mi espacio donde comparto lo que aprendo
                  </Text>
                </Box>
              </MotionBox>
            )}
          </AnimatePresence>
        )}
      </MotionFlex>
    </Flex>
  );
};
