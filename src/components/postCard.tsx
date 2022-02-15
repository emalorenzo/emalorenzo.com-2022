import NextLink from 'next/link';
import Image from 'next/image';
import { Flex, Heading, Text, Button, Link, Box, Tag } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { lighten, rgba } from 'polished';

import { COLORS } from '@/theme';

import { imageBuilder } from 'src/lib/sanity';

const MotionHeading = motion(Heading);
const MotionFlex = motion(Flex);

const CARD_HEIGHT = 400;

export const PostCard = ({ post }) => {
  const cardBackground = rgba(COLORS.gray[800], 0.6);
  const {
    title = '',
    slug = '',
    mainImage,
    categories,
    excerpt = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vehicula ipsum id mauris dictum mattis. In sed pellentesque enim.',
  } = post;
  const image = imageBuilder
    .image(mainImage)
    .height(CARD_HEIGHT)
    .width(300)
    .url();
  console.log('post', post);

  const tags =
    categories?.length &&
    categories.map((categorie) => (
      <Tag key={categorie} size="sm" borderRadius={12}>
        {categorie}
      </Tag>
    ));

  return (
    <NextLink href={`blog/${slug}`}>
      <MotionFlex
        height={CARD_HEIGHT}
        position="relative"
        overflow="hidden"
        justify="flex-end"
        bg="gray.900"
        borderRadius="0.5rem"
        cursor="pointer"
        alignItems="stretch"
        w="full"
        maxW="30rem"
        layoutId={`${slug}-container`}
        _hover={{
          backgroundColor: 'gray.800',
          boxShadow: `0 0 0 1pt ${lighten(0.2, cardBackground)}`,
        }}
        boxShadow="base"
        initial={{ y: 0 }}
      >
        <Image
          src={image || '/images/ema.png'}
          alt="post illustration"
          height={CARD_HEIGHT}
          width={300}
        />
        <Flex
          position="absolute"
          bottom={0}
          bg={cardBackground}
          w="full"
          mt="auto"
          direction="column"
          p={8}
          alignItems="flex-start"
          style={{
            backdropFilter: 'saturate(180%) blur(20px)',
          }}
        >
          {tags}
          <Heading as="h3" fontWeight="500" fontSize="1.5rem" py={2}>
            {title}
          </Heading>
          <Text fontWeight="500" fontSize="0.9rem">
            {excerpt}
          </Text>
        </Flex>
      </MotionFlex>
    </NextLink>
  );
};
