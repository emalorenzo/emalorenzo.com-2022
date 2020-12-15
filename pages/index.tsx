import React from 'react';
import { NextPage, GetStaticProps } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';
import Image from 'next/image';
import * as PostsApi from 'api/posts';
import { Flex, Heading, Text, Button, Link, Box } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';

const MotionHeading = motion.custom(Heading);
const MotionFlex = motion.custom(Flex);

const Post = ({ post }) => {
  const { title = '', slug = '', _updatedAt = '' } = post;
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
      flexBasis={['auto', '45%']}
      // layoutId={`${slug}-container`}
    >
      <NextLink href={`blog/${slug}`}>
        <Flex direction="column" flex={1} p={8}>
          <MotionHeading as="h3" fontWeight="500" fontSize="2rem">
            Hello World
          </MotionHeading>
          <Text>({new Date(_updatedAt).toDateString()})</Text>
        </Flex>
      </NextLink>{' '}
      <MotionFlex
      // layoutId={`${slug}-image`}
      // transform="rotateX(19deg) rotateY(37deg) rotateZ(366deg) scale(2.5)"
      // w={20}
      // h={20}
      >
        {/* <Image src="/images/code.png" width="5rem" height="5rem" /> */}
      </MotionFlex>
    </MotionFlex>
  );
};

const Home: NextPage = ({ allPosts, preview }: any) => {
  return (
    <Flex
      as="main"
      direction="column"
      overflowY="scroll"
      align="stretch"
      position="relative"
      top="-1px"
    >
      <Head>
        <title>Ema Lorenzo</title>
      </Head>
      <Flex direction="column" bg="white">
        {/* hero */}
        <Flex py={160} px={16} direction="column">
          <Text as="h1" fontSize="2rem">
            Hey,
          </Text>
          <Box display="inline">
            <Text fontSize="1.5rem">
              Soy basado en 🇦🇷. <br />
              Este es mi espacio donde comparto lo que aprendo
            </Text>
          </Box>
        </Flex>

        {/* border bottom */}
        <Box
          position="sticky"
          height="1px"
          top={0}
          bg="gray.300"
          width="full"
        />

        {/* posts */}
        <Flex direction="column" px={32}>
          <Heading as="h2" mt={20}>
            Ultimas publicaciones
          </Heading>
          {allPosts.map((post) => {
            return post.slug && <Post key={post.slug} post={post} />;
          })}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const allPosts = await PostsApi.getAllPostsForHome(preview);
  return {
    props: { allPosts, preview },
    revalidate: 1, // In seconds
  };
};
