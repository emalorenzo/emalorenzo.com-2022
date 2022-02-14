import React from 'react';
import { Transition, useAnimation, AnimatePresence } from 'framer-motion';
import { Flex, Text, Box } from '@chakra-ui/react';

import { MotionFlex, MotionBox } from 'src/components';
import { Status } from 'src/components/chat';

const DOT_ANIM_DURATION = 0.1;

interface Buble {
  content: React.ReactElement;
  status: Status;
}

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

export const ChatBuble = ({ content, status }: Buble) => {
  const container = {
    hidden: {
      x: 50,
      opacity: 0,
      borderBottomRightRadius: '16rem',
      borderBottomLeftRadius: '16rem',
      borderTopRightRadius: '16rem',
      borderTopLeftRadius: '16rem',
    },
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
      borderBottomRightRadius: '0rem',
      borderBottomLeftRadius: '1rem',
      borderTopRightRadius: '1rem',
      borderTopLeftRadius: '1rem',
      transition: {
        duration: 1,
        type: 'just',
        // layoutX: { duration: 0.3 },
        // layoutY: { delay: 0.2, duration: 0.3 },
      },
    },
  };

  const controls = useAnimation();
  const [readyForContent, setReadyForContent] = React.useState(false);

  React.useEffect(() => {
    const animateStatus = async () => {
      if (status === 'LOADING') {
        controls.start('show');
      }
      if (status === 'MESSAGE') {
        await controls.start('mutate');

        setReadyForContent(true);
      }
      if (status === 'COMPACT') {
        // await controls.start('mutate');
        // setReadyForContent(false);
      }
    };
    animateStatus();
  }, [controls, status]);
  return (
    <Flex
      w="full"
      h="full"
      flex={status === 'LOADING' ? 1 : 0}
      justify="flex-end"
      alignItems={status === 'LOADING' ? 'flex-end' : 'flex-start'}
    >
      <MotionFlex
        p={status === 'LOADING' ? 2 : 4}
        mt={2}
        minH={8}
        alignItems="flex-end"
        bg={status === 'MESSAGE' ? 'gray.700' : 'gray.800'}
        variants={container}
        initial="hidden"
        animate={controls}
        direction={status === 'LOADING' ? 'row' : 'column'}
        // borderWidth={2}
        // borderColor={status === 'MESSAGE' ? '#FF0068' : 'gray.200'}
        overflow="hidden"
        layout // this prop makes the buble resize smootly
      >
        {status === 'LOADING' ? (
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
                exit={{ opacity: 0 }}
              >
                {content}
              </MotionBox>
            )}
          </AnimatePresence>
        )}
      </MotionFlex>
    </Flex>
  );
};
