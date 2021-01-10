import NextLink from 'next/link';
import Image from 'next/image';
import { Flex, Heading, Text, Button, Link, Box } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';

import { imageBuilder } from 'lib/sanity';

const MotionHeading = motion.custom(Heading);
const MotionFlex = motion.custom(Flex);

export const PostCard = ({ post }) => {
  const { title = '', slug = '', coverImage, excerpt } = post;
  const image = imageBuilder.image(coverImage).height(200).width(300).url();
  return (
    <MotionFlex
      direction="row"
      overflow="hidden"
      bg="white"
      borderRadius="0.5rem"
      borderColor="gray.300"
      borderWidth={1}
      m="1rem"
      cursor="pointer"
      height="auto"
      alignItems="stretch"
      p={0}
      flexBasis={['auto', '25%']}
      maxW="60rem"
      layoutId={`${slug}-container`}
    >
      <NextLink href={`blog/${slug}`} scroll>
        <Flex direction="column" flex={1} p={8}>
          <MotionHeading as="h3" fontWeight="500" fontSize="2rem" layout>
            {title}
          </MotionHeading>
          <Text fontWeight="500" fontSize="1rem">
            {excerpt}
          </Text>
        </Flex>
      </NextLink>{' '}
      <MotionFlex
        // transform="rotateX(19deg) rotateY(37deg) rotateZ(366deg) scale(2.5)"
        w={300}
        h={200}
      >
        {image && <Image src={image} height={200} width={300} alt={title} />}
      </MotionFlex>
    </MotionFlex>
  );
};
