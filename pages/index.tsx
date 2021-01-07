import React from 'react';
import { NextPage, GetStaticProps } from 'next';
import Head from 'next/head';
import { Flex, Heading, Text, Box } from '@chakra-ui/react';

import * as PostsApi from 'api/posts';
import { PostCard } from 'components';

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
            return post.slug && <PostCard key={post.slug} post={post} />;
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
