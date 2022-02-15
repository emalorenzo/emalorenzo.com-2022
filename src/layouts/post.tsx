import Image from 'next/image';
import { motion } from 'framer-motion';
import { Flex, Heading, Text } from '@chakra-ui/react';

import { PreviewAlert } from 'src/components';

const MotionHeading = motion(Flex);

export const PostLayout = ({ post, preview }) => {
  const { content, title, categories } = post;
  return (
    <Flex w="full" direction="column" alignItems="center" mt={20} maxW="100%">
      {preview && <PreviewAlert />}

      <MotionHeading
        as="article"
        w="full"
        direction="column"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {content}
      </MotionHeading>
    </Flex>
  );
};
