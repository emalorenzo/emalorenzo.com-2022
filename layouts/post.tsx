import Image from 'next/image';
import { motion } from 'framer-motion';
import { Flex, Heading, Text } from '@chakra-ui/react';
import { PreviewAlert } from 'components';

const MotionHeading = motion.custom(Flex);

export const PostLayout = ({ post, preview }) => {
  const { content, title, categories } = post;
  return (
    <Flex
      w="full"
      direction="column"
      alignItems="center"
      overflow="scroll"
      width="50%"
      marginX="auto"
      mt={20}
    >
      {preview && <PreviewAlert />}

      <MotionHeading
        as="article"
        direction="column"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {content}
        {content}
        {content}
        {content}
        {content}
        {content}
        {content}
        {content}
        {content}
        {content}
      </MotionHeading>
    </Flex>
  );
};
