import Image from 'next/image';
import { motion } from 'framer-motion';
import { Flex, Heading, Text } from '@chakra-ui/react';
import { PreviewAlert } from 'components';

// const MotionHeading = motion.custom(Heading);

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

      <Flex as="article" direction="column">
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
      </Flex>
    </Flex>
  );
};
